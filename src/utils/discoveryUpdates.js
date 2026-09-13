import { numericValueTemplate, powerModeTemplate } from './mqttTemplates.js';

// Match the old generator's entire template. A custom expression or fallback
// must not be silently replaced just because it reads the same Zigbee field.
function legacyNumericPath(template, keyPattern, fallback) {
  if (typeof template !== 'string') return null;
  const match = template.match(
    new RegExp(
      String.raw`^\s*{%\s*if value_json\.ZbReceived\.(.+)\.(${keyPattern}) is defined\s*%}\s*` +
        String.raw`{{\s*value_json\.ZbReceived\.\1\.\2\s*}}\s*{%\s*else\s*%}\s*` +
        String.raw`{{\s*${fallback}\s*}}\s*{%\s*endif\s*%}\s*$`,
    ),
  );
  return match ? ['ZbReceived', match[1], match[2]] : null;
}

function legacyModePath(template) {
  if (typeof template !== 'string') return null;
  const match = template.match(
    /^\s*{%\s*if value_json\.ZbReceived\.(.+)\.Power is defined\s*%}\s*{{\s*'heat' if value_json\.ZbReceived\.\1\.Power == 1 else 'off'\s*}}\s*{%\s*else\s*%}\s*{{\s*states\('climate\.[a-zA-Z0-9_]+'\)\s*\|\s*default\('off'\)\s*}}\s*{%\s*endif\s*%}\s*$/,
  );
  return match ? ['ZbReceived', match[1], 'Power'] : null;
}

function emptyModePath(template) {
  if (typeof template !== 'string') return null;
  const lines = template.split('\n');
  if (
    lines.length !== 5 ||
    lines[0] !== '{% set data = value_json %}' ||
    lines[4] !== "{{ 'heat' if data in [1, '1'] else 'off' if data in [0, '0'] else '' }}"
  )
    return null;
  const path = [];
  for (const line of lines.slice(1, 4)) {
    const match = line.match(
      /^{% set data = data\.get\(("(?:\\.|[^"\\])*")\) if data is mapping else none %}$/,
    );
    if (!match) return null;
    try {
      path.push(JSON.parse(match[1]));
    } catch {
      return null;
    }
  }
  return path[0] === 'ZbReceived' && path[2] === 'Power' ? path : null;
}

export function getDiscoveryUpdates(topics, deviceId) {
  const updates = [];
  for (const [topic, originalMessage] of Object.entries(topics)) {
    const parts = topic.match(/^homeassistant\/(sensor|climate)\/([^/]+)\/([^/]+)\/config$/);
    if (!parts || (deviceId !== undefined && parts[2] !== deviceId)) continue;
    let config;
    try {
      config = JSON.parse(originalMessage);
    } catch {
      continue;
    }
    if (
      !config ||
      typeof config.unique_id !== 'string' ||
      !config.unique_id.endsWith('_zigbee2tasmota')
    )
      continue;

    const changes = [];
    function replace(field, value) {
      changes.push({ field, before: config[field], after: value });
      if (value === undefined) delete config[field];
      else config[field] = value;
    }
    if (parts[1] === 'sensor') {
      if (config.device_class === 'linkquality') replace('device_class', undefined);
      const path = legacyNumericPath(
        config.value_template,
        'Temperature|Humidity|BatteryPercentage|BatteryVoltage|LinkQuality|LocalTemperature|Power',
        String.raw`states\(entity_id\)`,
      );
      if (path) replace('value_template', numericValueTemplate(path));
    } else {
      for (const [field, key, attribute, defaultValue] of [
        ['current_temperature_template', 'LocalTemperature', 'current_temperature', 0],
        ['temperature_state_template', 'OccupiedHeatingSetpoint', 'temperature', 20],
      ]) {
        const path = legacyNumericPath(
          config[field],
          key,
          String.raw`states\.climate\.[a-zA-Z0-9_]+\.attributes\.${attribute}\s*\|\s*default\(${defaultValue}\)`,
        );
        if (path) replace(field, numericValueTemplate(path));
      }
      const path =
        legacyModePath(config.mode_state_template) || emptyModePath(config.mode_state_template);
      if (path) replace('mode_state_template', powerModeTemplate(path));
    }
    if (changes.length) {
      updates.push({
        topic,
        originalMessage,
        message: JSON.stringify(config, null, 2),
        changes,
        name: config.name || config.device?.name || parts[3],
      });
    }
  }
  return updates;
}
