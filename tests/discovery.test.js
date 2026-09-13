import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { SourceTextModule, SyntheticModule } from 'node:vm';

// Load the actual stores, replacing only the UI and MQTT side effects.
const router = { push() {} };
const mqtt = {
  topics: {},
  isConnected: true,
  subscribe() {},
  publish: async () => ({ success: true }),
};
const mocks = {
  pinia: {
    defineStore: (_id, setup) => {
      let instance;
      return () => (instance ??= setup());
    },
    acceptHMRUpdate() {},
  },
  vue: {
    ref: (value) => ({ value }),
    computed: (get) => ({
      get value() {
        return get();
      },
    }),
  },
  quasar: { Dialog: {} },
  'src/router': { default: router },
  'src/stores/mqtt': { useMQTTStore: () => mqtt },
};
const modules = new Map();
async function loadModule(name, referencingModule) {
  if (name.startsWith('.')) {
    name = new URL(name, `file:///${referencingModule.identifier}.js`).pathname
      .slice(1)
      .replace(/\.js$/, '');
  }
  if (modules.has(name)) return modules.get(name);
  const mock = mocks[name];
  const module = mock
    ? new SyntheticModule(Object.keys(mock), function () {
        for (const [key, value] of Object.entries(mock)) this.setExport(key, value);
      })
    : new SourceTextModule(await readFile(new URL(`../${name}.js`, import.meta.url), 'utf8'), {
        identifier: name,
      });
  modules.set(name, module);
  await module.link(loadModule);
  return module;
}
const module = await loadModule('src/stores/tasmota');
await module.evaluate();
const tasmota = module.namespace.useTasmotaStore();
const homeAssistant = modules.get('src/stores/homeassistant').namespace.useHomeAssistantStore();

function generate(model, name = 'chalet_ext', options = {}) {
  homeAssistant.devices.value = [];
  tasmota.selectedZBDevice.value = {
    ft: '%prefix%/%topic%/',
    t: 'tasmota_94D1B8',
    tp: ['cmnd', 'stat', 'tele'],
  };
  tasmota.config.value = { SetOption83: true, SetOption112: true, ...options };
  tasmota.ZbInfos.value = [
    {
      IEEEAddr: '0xB43522FFFECF4085',
      Device: '0x4448',
      Name: name,
      ModelId: model,
    },
  ];
  const generateAll =
    model === 'TRVZB'
      ? tasmota.generateHomeAssistantDiscoveryForAllTRVZB
      : tasmota.generateHomeAssistantDiscoveryForAllSNZB02;
  generateAll.call({ router });
  return homeAssistant.devices.value[0];
}

function render(cases) {
  const result = spawnSync(
    process.env.PYTHON || 'python',
    [fileURLToPath(new URL('./render_templates.py', import.meta.url))],
    { input: JSON.stringify(cases), encoding: 'utf8' },
  );
  assert.equal(result.status, 0, result.error?.message || result.stderr);
  return JSON.parse(result.stdout);
}

function payload(device, fields) {
  return { ZbReceived: { [device]: fields } };
}

test('SNZB models and TRV keep discovery identities and valid LQI metadata', () => {
  for (const model of ['TH01', 'SNZB-02P', 'SNZB-02D', 'TRVZB']) {
    const device = generate(model);
    const entries = homeAssistant.toDiscoveryEntries(device);
    const lqi = entries.find((entry) => entry.topic.endsWith('/linkquality/config'));
    assert.equal(lqi.topic, 'homeassistant/sensor/0xb43522fffecf4085/linkquality/config');
    const config = JSON.parse(lqi.message);
    assert.equal(config.unique_id, '0xb43522fffecf4085_linkquality_zigbee2tasmota');
    assert.equal(config.device_class, undefined);
    assert.equal(config.unit_of_measurement, 'lqi');
    assert.equal(config.state_class, 'measurement');
    assert.equal(config.entity_category, 'diagnostic');
    assert.equal(config.state_topic, 'tele/tasmota_94D1B8/chalet_ext/SENSOR');
  }
});

test('humidity-only log payload leaves other numeric sensors untouched, including at startup', () => {
  const device = generate('SNZB-02D');
  const message = payload('chalet_ext', {
    Device: '0x4448',
    Name: 'chalet_ext',
    Humidity: 52.5,
    Endpoint: 1,
    LinkQuality: 65,
  });
  assert.deepEqual(
    render(
      device.entities.map(({ config }) => ({
        template: config.value_template,
        payload: message,
      })),
    ),
    ['', '52.5', '', '', '65'],
  );
  const values = {
    Temperature: 0,
    Humidity: 0,
    BatteryPercentage: 0,
    BatteryVoltage: 2.9,
    LinkQuality: 0,
  };
  assert.deepEqual(
    render(
      device.entities.map(({ config }) => ({
        template: config.value_template,
        payload: payload('chalet_ext', values),
      })),
    ),
    ['0', '0', '0', '2.9', '0'],
  );
});

test('TRV partial reports update only the reported temperature, setpoint or mode', () => {
  const climate = generate('TRVZB', 'cheiry_couloir_temp').entities[0].config;
  const templates = [
    climate.current_temperature_template,
    climate.temperature_state_template,
    climate.mode_state_template,
  ];
  for (const [fields, expected] of [
    [{ OccupiedHeatingSetpoint: 7, LinkQuality: 45 }, ['', '7', 'None']],
    [{ LocalTemperature: 24.5, LinkQuality: 39 }, ['24.5', '', 'None']],
    [{ Power: 0 }, ['', '', 'off']],
    [{ Power: 1 }, ['', '', 'heat']],
    [{ Power: '1' }, ['', '', 'heat']],
    [{ Power: 'unknown' }, ['', '', 'None']],
  ]) {
    assert.deepEqual(
      render(
        templates.map((template) => ({
          template,
          payload: payload('cheiry_couloir_temp', fields),
        })),
      ),
      expected,
    );
  }
});

test('JSON device keys work with addresses, spaces, punctuation, quotes and dictionary method names', () => {
  for (const name of ['0x4448', 'Living room-temp', 'Room "A"', "L'entrée", 'items']) {
    for (const useName of [true, false]) {
      const device = generate('SNZB-02P', name, { SetOption112: useName, SetOption83: !useName });
      const sensor = device.entities[0].config;
      assert.equal(sensor.state_topic, `tele/tasmota_94D1B8/${useName ? '0x4448' : name}/SENSOR`);
      assert.deepEqual(
        render([
          {
            template: sensor.value_template,
            payload: payload(useName ? name : '0x4448', { Temperature: -4.5 }),
          },
        ]),
        ['-4.5'],
      );
    }
  }
});

test('missing or malformed reports never yield non-numeric sensor values', () => {
  homeAssistant.devices.value = [];
  homeAssistant.addDevice();
  homeAssistant.addEntityToDevice(null, homeAssistant.devices.value[0]);
  const defaultTemplate = homeAssistant.devices.value[0].entities[0].config.value_template;
  const sensorTemplate = generate('SNZB-02P').entities[0].config.value_template;
  const climate = generate('TRVZB').entities[0].config;
  const cases = [];
  for (const template of [
    defaultTemplate,
    sensorTemplate,
    climate.current_temperature_template,
    climate.temperature_state_template,
    climate.mode_state_template,
  ]) {
    cases.push({ template }); // Non-JSON payload: value_json is undefined.
    for (const message of [
      null,
      {},
      'Online',
      { ZbReceived: null },
      { ZbReceived: [] },
      payload('another_device', { Temperature: 20 }),
      payload('chalet_ext', null),
      payload('chalet_ext', { Temperature: 'unknown', Power: 2 }),
      payload('chalet_ext', { Temperature: 'NaN' }),
      payload('chalet_ext', { Temperature: 'inf' }),
    ]) {
      cases.push({ template, payload: message });
    }
  }
  assert.deepEqual(
    render(cases),
    cases.map(({ template }) => (template === climate.mode_state_template ? 'None' : '')),
  );
  assert.deepEqual(render([{ template: defaultTemplate, payload: { temperature: 0 } }]), ['0']);
});

function legacyValue(name, key, fallback = 'states(entity_id)') {
  return `{% if value_json.ZbReceived.${name}.${key} is defined %}\n  {{ value_json.ZbReceived.${name}.${key} }}\n{% else %}\n  {{ ${fallback} }}\n{% endif %}\n`;
}

function publishedSensor() {
  return {
    unique_id: '0x123_linkquality_zigbee2tasmota',
    name: 'My custom name',
    device_class: 'linkquality',
    unit_of_measurement: 'lqi',
    state_topic: 'custom/bridge/chalet_ext/SENSOR',
    availability_topic: 'custom/bridge/LWT',
    enabled_by_default: true,
    icon: 'mdi:wifi',
    expire_after: 3600,
    device: { identifiers: ['zigbee2tasmota_0x123'], name: 'My device', suggested_area: 'Kitchen' },
    value_template: legacyValue('chalet_ext', 'LinkQuality'),
  };
}

test('published updates preserve custom settings and original payloads, and are idempotent', () => {
  const topic = 'homeassistant/sensor/0x123/linkquality/config';
  const config = publishedSensor();
  const original = JSON.stringify(config);
  mqtt.topics = { [topic]: original };
  const [update] = homeAssistant.getPublishedUpdates();
  assert.equal(update.topic, topic);
  assert.equal(update.originalMessage, original);
  assert.equal(mqtt.topics[topic], original);
  const repaired = JSON.parse(update.message);
  const unchanged = { ...config };
  delete unchanged.device_class;
  delete unchanged.value_template;
  assert.deepEqual(
    { ...repaired, value_template: undefined },
    { ...unchanged, value_template: undefined },
  );
  assert.deepEqual(
    update.changes.map((change) => change.field),
    ['device_class', 'value_template'],
  );
  assert.deepEqual(
    render([
      { template: repaired.value_template, payload: payload('chalet_ext', { LinkQuality: 65 }) },
    ]),
    ['65'],
  );
  mqtt.topics[topic] = update.message;
  assert.deepEqual(homeAssistant.getPublishedUpdates(), []);
});

test('published climate fixes render partial reports while retaining command settings', () => {
  const name = 'cheiry_couloir_temp';
  const topic = 'homeassistant/climate/0x123/climate/config';
  const config = {
    unique_id: '0x123_climate_zigbee2tasmota',
    temperature_command_topic: 'my/custom/command',
    max_temp: 30,
    current_temperature_template: legacyValue(
      name,
      'LocalTemperature',
      `states.climate.${name}.attributes.current_temperature | default(0)`,
    ),
    temperature_state_template: legacyValue(
      name,
      'OccupiedHeatingSetpoint',
      `states.climate.${name}.attributes.temperature | default(20)`,
    ),
    mode_state_template: `{% if value_json.ZbReceived.${name}.Power is defined %}\n  {{ 'heat' if value_json.ZbReceived.${name}.Power == 1 else 'off' }}\n{% else %}\n  {{ states('climate.${name}') | default('off') }}\n{% endif %}`,
  };
  mqtt.topics = { [topic]: JSON.stringify(config) };
  const [update] = homeAssistant.getPublishedUpdates();
  assert.equal(update.changes.length, 3);
  const repaired = JSON.parse(update.message);
  assert.equal(repaired.temperature_command_topic, config.temperature_command_topic);
  assert.equal(repaired.max_temp, 30);
  assert.deepEqual(
    render(
      update.changes.map((change) => ({
        template: change.after,
        payload: payload(name, { OccupiedHeatingSetpoint: 7 }),
      })),
    ),
    ['', '7', 'None'],
  );
});

test('updates leave custom formulas intact and ignore unrelated or malformed discovery', () => {
  const config = publishedSensor();
  const custom = legacyValue('chalet_ext', 'LinkQuality').replace('states(entity_id)', '42');
  mqtt.topics = {
    'homeassistant/sensor/0x123/linkquality/config': JSON.stringify({
      ...config,
      value_template: custom,
    }),
    'homeassistant/sensor/other/linkquality/config': JSON.stringify({
      ...config,
      unique_id: 'third_party',
    }),
    'homeassistant/sensor/broken/linkquality/config': '{bad json',
    'homeassistant/sensor/empty/linkquality/config': '',
    'homeassistant/sensor/null/linkquality/config': 'null',
    'other/sensor/0x123/linkquality/config': JSON.stringify(config),
  };
  const updates = homeAssistant.getPublishedUpdates();
  assert.equal(updates.length, 1);
  assert.deepEqual(
    updates[0].changes.map((change) => change.field),
    ['device_class'],
  );
  assert.equal(JSON.parse(updates[0].message).value_template, custom);
});

test('single-device updates match the exact ID across sensor and climate topics', () => {
  const message = JSON.stringify(publishedSensor());
  mqtt.topics = {
    'homeassistant/sensor/a.b/linkquality/config': message,
    'homeassistant/sensor/axb/linkquality/config': message,
    'homeassistant/sensor/a.b.extra/linkquality/config': message,
  };
  assert.deepEqual(
    homeAssistant.getPublishedUpdates('a.b').map((entry) => entry.topic),
    ['homeassistant/sensor/a.b/linkquality/config'],
  );
  assert.equal(homeAssistant.getPublishedUpdates().length, 3);
});

test('publishing an update uses its retained original topic and surfaces failures and conflicts', async () => {
  const topic = 'homeassistant/sensor/0x123/linkquality/config';
  mqtt.topics = { [topic]: JSON.stringify(publishedSensor()) };
  mqtt.isConnected = true;
  const [update] = homeAssistant.getPublishedUpdates();
  const calls = [];
  mqtt.publish = async (...args) => {
    calls.push(args);
    return { success: false, error: 'Denied' };
  };
  assert.deepEqual(await homeAssistant.publishDiscoveryUpdate(update), {
    success: false,
    error: 'Denied',
  });
  assert.deepEqual(calls, [[topic, update.message, { retain: true, qos: 1 }]]);
  mqtt.publish = async () => ({ success: true });
  assert.deepEqual(await homeAssistant.publishDiscoveryUpdate(update), { success: true });
  mqtt.publish = () => assert.fail('Must not publish stale or disconnected updates');
  mqtt.isConnected = false;
  assert.equal((await homeAssistant.publishDiscoveryUpdate(update)).success, false);
  mqtt.isConnected = true;
  mqtt.topics[topic] = '{}';
  assert.match((await homeAssistant.publishDiscoveryUpdate(update)).error, /changed/);
  delete mqtt.topics[topic];
  assert.equal((await homeAssistant.publishDiscoveryUpdate(update)).success, false);
});

test('HVAC modes preserve actual entity state and never return the empty payload rejected by HA', () => {
  const template = generate('TRVZB', 'cheiry_salon_temp').entities[0].config.mode_state_template;
  const cases = [];
  const expected = [];
  for (const state of ['heat', 'off', 'unknown', 'unavailable', null]) {
    for (const fields of [
      { OccupiedHeatingSetpoint: 7 },
      { LocalTemperature: 21.8 },
      { Power: 0 },
      { Power: 1 },
      { Power: '0' },
      { Power: 2 },
      { Power: null },
    ]) {
      cases.push({
        template,
        payload: payload('cheiry_salon_temp', fields),
        this: { entity_id: 'climate.user_renamed_radiator', state },
      });
      expected.push(
        fields.Power === 1
          ? 'heat'
          : [0, '0'].includes(fields.Power)
            ? 'off'
            : ['heat', 'off'].includes(state)
              ? state
              : 'None',
      );
    }
  }
  cases.push({ template, payload: {}, this: null }, { template, payload: {}, this: {} });
  expected.push('None', 'None');
  const rendered = render(cases);
  assert.deepEqual(rendered, expected);
  // HA 2026.9.2 _handle_mode_received accepts configured modes or PAYLOAD_NONE.
  // Unlike its temperature handler, it warns for an empty string.
  assert.ok(rendered.every((value) => ['heat', 'off', 'None'].includes(value)));
});

test('updater repairs the first fix already published and skips custom or current mode templates', () => {
  for (const name of ['cheiry_salon_temp', '0xEA9B', 'Room "A"', "L'entrée", 'Room\\one']) {
    const config = generate('TRVZB', name).entities[0].config;
    const currentTemplate = config.mode_state_template;
    const firstFix =
      currentTemplate.split('\n').slice(0, 4).join('\n') +
      "\n{{ 'heat' if data in [1, '1'] else 'off' if data in [0, '0'] else '' }}";
    const topic = 'homeassistant/climate/0x123/climate/config';
    mqtt.topics = { [topic]: JSON.stringify({ ...config, mode_state_template: firstFix }) };
    const [update] = homeAssistant.getPublishedUpdates();
    assert.deepEqual(
      update.changes.map((change) => change.field),
      ['mode_state_template'],
    );
    assert.equal(JSON.parse(update.message).mode_state_template, currentTemplate);
    mqtt.topics[topic] = update.message;
    assert.deepEqual(homeAssistant.getPublishedUpdates(), []);
    mqtt.topics[topic] = JSON.stringify({
      ...config,
      mode_state_template: firstFix.replace("else ''", "else 'off'"),
    });
    assert.deepEqual(homeAssistant.getPublishedUpdates(), []);
  }
});
