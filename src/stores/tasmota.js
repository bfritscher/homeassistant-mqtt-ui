import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, computed } from 'vue';
import { useMQTTStore } from 'src/stores/mqtt';
import { useHomeAssistantStore } from 'src/stores/homeassistant';

const homeAssistantStore = useHomeAssistantStore();

const TASMOTA_DISCOVERY_CONFIG = new RegExp('tasmota/discovery/.*/config');

export const TASMOTA_PREFIX = {
  CMND: 0,
  STAT: 1,
  TELE: 2,
};
export const useTasmotaStore = defineStore('tasmota', () => {
  const mqttStore = useMQTTStore();
  const devices = ref({});
  const ZbInfos = ref([]);
  const selectedZBDevice = ref(null);
  const config = ref({
    SetOption83: null,
    SetOption89: null,
    SetOption112: null,
    SensorRetain: null,
  });

  mqttStore.subscribe(TASMOTA_DISCOVERY_CONFIG, (topic, message) => {
    const device = JSON.parse(message);
    devices.value[device.mac] = device;
    if (isZBBridge(device)) {
      getZbInfo(device);
    }
  });

  let sub;
  let countZbStatus3 = 0;
  function handleZbResults(device, topic, message) {
    const result = JSON.parse(message);
    if (result.ZbStatus1) {
      ZbInfos.value = result.ZbStatus1;
      countZbStatus3 = 0;
      ZbInfos.value.forEach((d) =>
        mqttStore.publish(resolveFullTopic(device, TASMOTA_PREFIX.CMND) + 'ZbStatus3', d.Device),
      );
    } else if (result.ZbStatus3) {
      const index = ZbInfos.value.findIndex((d) => d.Device === result.ZbStatus3[0].Device);
      const zbDevice = result.ZbStatus3[0];

      // Ensure Name is the second property with empty string if it doesn't exist
      if (!zbDevice.Name) {
        const { Device, ...rest } = zbDevice;
        const reorderedDevice = { Device, Name: '', ...rest };
        ZbInfos.value[index] = reorderedDevice;
      } else {
        ZbInfos.value[index] = zbDevice;
      }

      countZbStatus3++;
      if (countZbStatus3 === ZbInfos.value.length && sub) {
        mqttStore.unsubscribe(sub);
      }
    } else {
      const key = Object.keys(result).pop();
      if (['SetOption83', 'SetOption89', 'SetOption112', 'SensorRetain'].includes(key)) {
        config.value[key] = result[key] === 'ON';
      } else {
        console.log('Unknown message', result);
      }
    }
  }

  function getZbInfo(device) {
    ZbInfos.value = [];
    selectedZBDevice.value = device;
    sub = mqttStore.subscribe(
      resolveFullTopic(device, TASMOTA_PREFIX.STAT) + 'RESULT',
      (topic, message) => handleZbResults(device, topic, message),
    );
    ['ZbStatus1', 'SetOption83', 'SetOption89', 'SetOption112', 'SensorRetain'].forEach((cmd) => {
      mqttStore.publish(resolveFullTopic(device, TASMOTA_PREFIX.CMND) + cmd, '');
    });
  }

  function publishCmd(command, arg) {
    const device = selectedZBDevice.value;
    if (device) {
      if (typeof arg === 'boolean') {
        arg = Number(arg);
      }
      mqttStore.publish(resolveFullTopic(device, TASMOTA_PREFIX.CMND) + command, `${arg}`);
      getZbInfo(device);
    }
  }

  function isZBBridge(device) {
    return device.md === 'Sonoff ZbBridge' || device.md === 'Sonoff Zigbee Pro';
  }

  function resolveFullTopic(device, prefix = TASMOTA_PREFIX.TELE) {
    return device.ft.replace('%topic%', device.t).replace('%prefix%', device.tp[prefix]);
  }

  const zbBridges = computed(() => {
    return Object.values(devices.value).filter((device) => isZBBridge(device));
  });

  function generateHomeAssistantDiscoveryForSNZB02(d) {
    const id = d.IEEEAddr.toLowerCase();
    const model = d.ModelId === 'TH01' ? 'SNZB-02' : d.ModelId || 'Unknown';
    const haDevice = {
      id,
      config: {
        identifiers: [`zigbee2tasmota_${id}`],
        manufacturer: 'SONOFF',
        model: `Temperature And Humidity Sensor (${model})`,
        name: d.Name,
      },
      entities: ['temperature', 'humidity', 'battery', 'voltage', 'linkquality'].map((type) =>
        buildHaSensor(d, type),
      ),
    };
    return haDevice;
  }

  function buildHaSensor(d, type) {
    const id = d.IEEEAddr.toLowerCase();
    const haSensor = {
      type: 'sensor',
      id: type,
    };
    const sensor = {
      availability_mode: 'all',
      availability_topic: `${resolveFullTopic(selectedZBDevice.value, TASMOTA_PREFIX.TELE)}LWT`,
      payload_available: 'Online',
      payload_not_available: 'Offline',
      name: `${d.Name} `,
      state_topic: `${resolveFullTopic(
        selectedZBDevice.value,
        TASMOTA_PREFIX.TELE,
      )}${config.value.SetOption83 ? d.Name : d.Device}/SENSOR`,
      unique_id: `${id}_${type}_zigbee2tasmota`,
      state_class: 'measurement',
    };

    let key;
    if (type === 'temperature') {
      key = 'Temperature';
      sensor.device_class = 'temperature';
      sensor.enabled_by_default = true;
      sensor.unit_of_measurement = '°C';
      sensor.name += type;
    }
    if (type === 'humidity') {
      key = 'Humidity';
      sensor.device_class = 'humidity';
      sensor.enabled_by_default = true;
      sensor.unit_of_measurement = '%';
      sensor.name += type;
    }
    if (type === 'battery') {
      key = 'BatteryPercentage';
      sensor.device_class = 'battery';
      sensor.enabled_by_default = true;
      sensor.unit_of_measurement = '%';
      sensor.entity_category = 'diagnostic';
      sensor.name += type;
    }
    if (type === 'voltage') {
      key = 'BatteryVoltage';
      sensor.device_class = 'voltage';
      sensor.enabled_by_default = false;
      sensor.unit_of_measurement = 'V';
      sensor.entity_category = 'diagnostic';
      sensor.name += type;
    }

    if (type === 'linkquality') {
      key = 'LinkQuality';
      sensor.device_class = 'linkquality';
      sensor.enabled_by_default = false;
      sensor.unit_of_measurement = 'lqi';
      sensor.icon = 'mdi:signal';
      sensor.entity_category = 'diagnostic';
      sensor.name += type;
    }
    sensor.value_template = `{% if value_json.ZbReceived.${
      config.value.SetOption112 ? d.Name : d.Device
    }.${key} is defined %}\n  {{ value_json.ZbReceived.${
      config.value.SetOption112 ? d.Name : d.Device
    }.${key} }}\n{% else %}\n  {{ states(entity_id) }}\n{% endif %}\n`;
    haSensor.config = sensor;
    return haSensor;
  }

  function generateHomeAssistantDiscoveryForAllSNZB02() {
    ZbInfos.value
      .filter((o) => ['TH01', 'SNZB-02P', 'SNZB-02D'].includes(o.ModelId))
      .forEach((d) => {
        homeAssistantStore.addDevice(generateHomeAssistantDiscoveryForSNZB02(d));
      });
    this.router.push('/discovery-generator');
  }

  function generateHomeAssistantDiscoveryForTRVZB(d) {
    const id = d.IEEEAddr.toLowerCase();
    const model = d.ModelId || 'TRVZB';
    const deviceIdentifier = config.value.SetOption112 ? d.Name : d.Device;
    const topicDeviceName = config.value.SetOption83 ? d.Name : d.Device;

    const haDevice = {
      id,
      config: {
        identifiers: [`zigbee2tasmota_${id}`],
        manufacturer: 'SONOFF',
        model: `Zigbee Thermostatic Radiator Valve (${model})`,
        name: d.Name,
      },
      entities: [
        buildTRVZBClimate(d, deviceIdentifier, topicDeviceName),
        buildHaSensorForTRVZB(d, 'local_temperature', deviceIdentifier, topicDeviceName),
        buildHaSensorForTRVZB(d, 'heating', deviceIdentifier, topicDeviceName),
        buildHaSensorForTRVZB(d, 'linkquality', deviceIdentifier, topicDeviceName),
      ],
    };
    return haDevice;
  }

  function buildTRVZBClimate(d, deviceIdentifier, topicDeviceName) {
    const id = d.IEEEAddr.toLowerCase();
    const stateTopic = `${resolveFullTopic(selectedZBDevice.value, TASMOTA_PREFIX.TELE)}${topicDeviceName}/SENSOR`;

    const climate = {
      type: 'climate',
      id: 'climate',
      config: {
        availability_mode: 'all',
        availability_topic: `${resolveFullTopic(selectedZBDevice.value, TASMOTA_PREFIX.TELE)}LWT`,
        payload_available: 'Online',
        payload_not_available: 'Offline',
        name: d.Name,
        unique_id: `${id}_climate_zigbee2tasmota`,
        modes: ['off', 'heat'],
        current_temperature_topic: stateTopic,
        current_temperature_template: `{% if value_json.ZbReceived.${deviceIdentifier}.LocalTemperature is defined %}\n  {{ value_json.ZbReceived.${deviceIdentifier}.LocalTemperature }}\n{% else %}\n  {{ states.climate.${d.Name.replace(/[^a-zA-Z0-9_]/g, '_')}.attributes.current_temperature | default(0) }}\n{% endif %}`,
        temperature_state_topic: stateTopic,
        temperature_state_template: `{% if value_json.ZbReceived.${deviceIdentifier}.OccupiedHeatingSetpoint is defined %}\n  {{ value_json.ZbReceived.${deviceIdentifier}.OccupiedHeatingSetpoint }}\n{% else %}\n  {{ states.climate.${d.Name.replace(/[^a-zA-Z0-9_]/g, '_')}.attributes.temperature | default(20) }}\n{% endif %}`,
        temperature_command_topic: `${resolveFullTopic(selectedZBDevice.value, TASMOTA_PREFIX.CMND)}ZbSend`,
        temperature_command_template: `{"Device":"${d.Device}","Write":{"OccupiedHeatingSetpoint":{{ value }}}}`,
        mode_state_topic: stateTopic,
        mode_state_template: `{% if value_json.ZbReceived.${deviceIdentifier}.Power is defined %}\n  {{ 'heat' if value_json.ZbReceived.${deviceIdentifier}.Power == 1 else 'off' }}\n{% else %}\n  {{ states('climate.${d.Name.replace(/[^a-zA-Z0-9_]/g, '_')}') | default('off') }}\n{% endif %}`,
        mode_command_topic: `${resolveFullTopic(selectedZBDevice.value, TASMOTA_PREFIX.CMND)}ZbSend`,
        mode_command_template: `{"Device":"${d.Device}","Write":{"Power":{{ '1' if value == 'heat' else '0' }}}}`,
        min_temp: 4,
        max_temp: 35,
        temp_step: 0.5,
        temperature_unit: 'C',
      },
    };
    return climate;
  }

  function buildHaSensorForTRVZB(d, type, deviceIdentifier, topicDeviceName) {
    const id = d.IEEEAddr.toLowerCase();
    const haSensor = {
      type: 'sensor',
      id: type,
    };
    const sensor = {
      availability_mode: 'all',
      availability_topic: `${resolveFullTopic(selectedZBDevice.value, TASMOTA_PREFIX.TELE)}LWT`,
      payload_available: 'Online',
      payload_not_available: 'Offline',
      name: `${d.Name} `,
      state_topic: `${resolveFullTopic(selectedZBDevice.value, TASMOTA_PREFIX.TELE)}${topicDeviceName}/SENSOR`,
      unique_id: `${id}_${type}_zigbee2tasmota`,
      state_class: 'measurement',
    };

    let key;
    if (type === 'local_temperature') {
      key = 'LocalTemperature';
      sensor.device_class = 'temperature';
      sensor.enabled_by_default = false;
      sensor.unit_of_measurement = '°C';
      sensor.name += 'temperature';
    }
    if (type === 'heating') {
      key = 'Power';
      sensor.enabled_by_default = false;
      sensor.icon = 'mdi:radiator';
      sensor.name += 'heating';
      delete sensor.state_class;
    }
    if (type === 'linkquality') {
      key = 'LinkQuality';
      sensor.enabled_by_default = false;
      sensor.unit_of_measurement = 'lqi';
      sensor.icon = 'mdi:signal';
      sensor.entity_category = 'diagnostic';
      sensor.name += 'linkquality';
    }

    sensor.value_template = `{% if value_json.ZbReceived.${deviceIdentifier}.${key} is defined %}\n  {{ value_json.ZbReceived.${deviceIdentifier}.${key} }}\n{% else %}\n  {{ states(entity_id) }}\n{% endif %}\n`;
    haSensor.config = sensor;
    return haSensor;
  }

  function generateHomeAssistantDiscoveryForAllTRVZB() {
    ZbInfos.value
      .filter((o) => o.ModelId === 'TRVZB')
      .forEach((d) => {
        homeAssistantStore.addDevice(generateHomeAssistantDiscoveryForTRVZB(d));
      });
    this.router.push('/discovery-generator');
  }

  return {
    config,
    ZbInfos,
    devices,
    devicesCount: computed(() => Object.keys(devices.value).length),
    zbBridges,
    selectedZBDevice,
    getZbInfo,
    publishCmd,
    isZBBridge,
    resolveFullTopic,
    generateHomeAssistantDiscoveryForAllSNZB02,
    generateHomeAssistantDiscoveryForAllTRVZB,
  };
});

// Enable HMR for this store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasmotaStore, import.meta.hot));
}
