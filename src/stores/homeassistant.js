import { defineStore, acceptHMRUpdate } from 'pinia';
import router from 'src/router';
import { useMQTTStore } from 'src/stores/mqtt';
import { ref } from 'vue';
import { Dialog } from 'quasar';
import { numericValueTemplate } from 'src/utils/mqttTemplates';
import { getDiscoveryUpdates } from 'src/utils/discoveryUpdates';

export const useHomeAssistantStore = defineStore('homeassistant', () => {
  const mqttStore = useMQTTStore();

  const devices = ref([]);

  function toDiscoveryEntries(haDevice) {
    const device = JSON.parse(JSON.stringify(haDevice.config));
    return haDevice.entities.map((haEntity) => {
      const entity = JSON.parse(JSON.stringify(haEntity.config));
      entity.device = device;
      // <discovery_prefix>/<component>/[<node_id>/]<object_id>/config
      // https://www.home-assistant.io/docs/mqtt/discovery/
      const topic = `homeassistant/${haEntity.type}/${haDevice.id}/${haEntity.id}/config`;
      return {
        topic,
        message: JSON.stringify(entity, null, 2),
      };
    });
  }

  function publishDevice(haDevice) {
    toDiscoveryEntries(haDevice).forEach(({ topic, message }) => {
      mqttStore.publish(topic, message, { retain: true });
    });
  }

  function publishAllDevices() {
    devices.value.forEach(publishDevice);
  }

  function getPublishedUpdates(deviceId) {
    return getDiscoveryUpdates(mqttStore.topics, deviceId);
  }

  async function publishDiscoveryUpdate(update) {
    if (!mqttStore.isConnected) {
      return { success: false, error: 'Connect to MQTT before publishing updates.' };
    }
    if (mqttStore.topics[update.topic] !== update.originalMessage) {
      return {
        success: false,
        error: 'This configuration changed. Close and reopen the update preview.',
      };
    }
    return mqttStore.publish(update.topic, update.message, { retain: true, qos: 1 });
  }

  function addDevice(device) {
    const id = `0x${Math.random().toString(36).substring(2, 15)}`;
    const defaultDevice = {
      id,
      config: {
        identifiers: [`mqtt_${id}`],
        manufacturer: '',
        model: '',
        name: '',
      },
      entities: [],
    };
    devices.value.push(device || defaultDevice);
  }

  function addEntityToDevice(entity, device) {
    const defaultEntity = {
      type: 'sensor',
      id: 'temperature',
      config: {
        name: '',
        state_topic: '',
        state_class: 'measurement',
        device_class: 'temperature',
        unit_of_measurement: '°C',
        value_template: numericValueTemplate(['temperature']),
      },
    };
    if (!device.entities) {
      device.entities = [];
    }
    device.entities.push(entity || defaultEntity);
  }

  function reverseEntity(id) {
    devices.value = [];
    const device = {
      id,
      entities: [],
    };
    devices.value.push(device);
    mqttStore.searchTopics(new RegExp(`homeassistant/.*/${id}/.*/config`)).forEach((topic) => {
      const rawSensor = JSON.parse(mqttStore.topics[topic]);
      // TODO could check if different between entities
      device.config = rawSensor.device;
      delete rawSensor.device;
      const topicParts = topic.split('/');
      device.entities.push({
        type: topicParts[1],
        id: topicParts[3],
        config: rawSensor,
      });
    });
    router.push('/discovery-generator');
  }

  function removeAll() {
    Dialog.create({
      title: 'Confirm',
      message: 'Remove all devices and entities?',
      cancel: true,
      persistent: true,
    }).onOk(() => {
      devices.value = [];
    });
  }

  function removeDevice(device) {
    Dialog.create({
      title: 'Confirm',
      message: 'Remove device and entities?',
      cancel: true,
      persistent: true,
    }).onOk(() => {
      devices.value.splice(devices.value.indexOf(device), 1);
    });
  }

  function removeDeviceEntity(device, entity) {
    Dialog.create({
      title: 'Confirm',
      message: 'Remove entity?',
      cancel: true,
      persistent: true,
    }).onOk(() => {
      device.entities.splice(device.entities.indexOf(entity), 1);
    });
  }

  return {
    devices,
    addDevice,
    addEntityToDevice,
    reverseEntity,
    removeAll,
    removeDevice,
    removeDeviceEntity,
    toDiscoveryEntries,
    publishDevice,
    publishAllDevices,
    getPublishedUpdates,
    publishDiscoveryUpdate,
  };
});

// Enable HMR for this store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHomeAssistantStore, import.meta.hot));
}
