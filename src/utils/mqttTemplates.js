// MQTT numeric sensors and climate temperatures ignore empty template results.
// Read each level safely: Zigbee reports often contain only one changed field.
function readJsonPath(path) {
  return [
    '{% set data = value_json %}',
    ...path.map(
      (key) => `{% set data = data.get(${JSON.stringify(key)}) if data is mapping else none %}`,
    ),
  ].join('\n');
}

export function numericValueTemplate(path) {
  return `${readJsonPath(path)}\n{{ data if is_number(data) else '' }}`;
}

export function powerModeTemplate(path) {
  // HA 2026.9 ignores empty temperatures, but rejects empty HVAC modes.
  // `this` references the actual entity, including user-renamed entity IDs.
  // Preserve a known mode; 'None' represents unknown before the first report.
  return `${readJsonPath(path)}\n{% set previous = this.state | default(none) if this is defined and this is not none else none %}\n{{ 'heat' if data in [1, '1'] else 'off' if data in [0, '0'] else previous if previous in ['heat', 'off'] else 'None' }}`;
}
