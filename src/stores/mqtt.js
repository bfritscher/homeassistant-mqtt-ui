import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, watchEffect, computed } from 'vue';

const subscribers = [];
const KEY_MQTT_CONFIG = 'KEY_MQTT_CONFIG';

export const useMQTTStore = defineStore('mqtt', () => {
  const saved = localStorage.getItem(KEY_MQTT_CONFIG);
  let savedConfig = {
    url: '', // protocol://host:port
    username: '',
    password: '',
  };
  if (saved) {
    try {
      savedConfig = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved MQTT config:', e);
    }
  }
  const config = ref(savedConfig);

  const topics = ref({});
  const topicsTree = ref([
    {
      label: '',
      children: [],
      selectable: false,
      id: '__ROOT__',
    },
  ]);

  watchEffect(() => {
    topicsTree.value[0].label = config.value.url;
  });

  function addToTree(topic) {
    const topicParts = topic.split('/');
    let currentNode = topicsTree.value[0];
    let id = [];
    topicParts.forEach((part, index) => {
      const isLeaf = index === topicParts.length - 1;
      id.push(part);
      if (isLeaf && part === 'config' && topicParts[0] === 'homeassistant') {
        const data = JSON.parse(topics.value[topic]);
        if (data.device.identifiers[0].startsWith('zigbee2mqtt')) {
          currentNode.parent.avatar = 'logos/zigbee2mqtt.png';
          currentNode.parent.type = 'zigbee2mqtt';
          currentNode.type = 'zigbee2mqtt';
        }
        currentNode.parent.header = 'homeassistant-discovery';
        currentNode.parent.label = `${data.device.name} - ${data.device.manufacturer} ${data.device.model} [${currentNode.parent.labelPart}]`;
      }
      if (isLeaf && part === 'config' && topicParts[0] === 'tasmota') {
        const data = JSON.parse(topics.value[topic]);
        currentNode.header = 'tasmota-discovery';
        currentNode.body = 'tasmota-discovery';
        currentNode.device = data;
      }
      const found = currentNode.children.find((child) => child.labelPart === part);
      if (found) {
        currentNode = found;
        if (isLeaf) {
          currentNode.selectable = isLeaf;
        }
      } else {
        const newNode = {
          label: part,
          labelPart: part,
          children: [],
          selectable: isLeaf,
          id: id.join('/'),
          parent: currentNode,
          type: currentNode.type,
        };
        if (newNode.id === 'zigbee2mqtt') {
          newNode.avatar = 'logos/zigbee2mqtt.png';
          newNode.type = 'zigbee2mqtt';
        }
        if (newNode.id === 'homeassistant') {
          newNode.avatar = 'logos/homeassistant.svg';
        }
        if (['tasmota', 'tele', 'cmnd', 'stat'].includes(newNode.id)) {
          newNode.avatar = 'logos/tasmota.svg';
        }
        currentNode.children.push(newNode);
        currentNode.children.sort((a, b) => a.label.localeCompare(b.label));
        currentNode = newNode;
      }
    });
  }

  function removeFromTree(topic) {
    const topicParts = topic.split('/');
    let currentNode = topicsTree.value[0];
    topicParts.forEach((part, index) => {
      const isLeaf = index === topicParts.length - 1;
      if (isLeaf) {
        currentNode.children = currentNode.children.filter((child) => child.id !== topic);
        while (currentNode.parent) {
          if (currentNode.children.length === 0) {
            currentNode.parent.children = currentNode.parent.children.filter(
              (child) => child.id !== currentNode.id,
            );
          }
          currentNode = currentNode.parent;
        }
      } else {
        const found = currentNode.children.find((child) => child.labelPart === part);
        if (found) {
          currentNode = found;
        }
      }
    });
  }

  const isConnected = ref(false);
  const error = ref(null);

  async function connect() {
    localStorage.setItem(KEY_MQTT_CONFIG, JSON.stringify(config.value));

    // Clear previous error
    error.value = null;

    try {
      const result = await window.mqtt.connect(
        {
          url: config.value.url,
          username: config.value.username,
          password: config.value.password,
        },
        (topic, message) => {
          // Handle status updates (when topic is null)
          if (topic === null) {
            if (Object.prototype.hasOwnProperty.call(message, 'connected')) {
              isConnected.value = message.connected;
              if (isConnected.value) {
                error.value = null;
              }
            }
            if (Object.prototype.hasOwnProperty.call(message, 'error')) {
              error.value = message.error;
              isConnected.value = false;
            }
            return;
          }

          // Handle MQTT messages
          if (message) {
            topics.value[topic] = message;
            addToTree(topic, message);
          } else {
            removeFromTree(topic);
            delete topics.value[topic];
          }

          // Notify subscribers
          subscribers.forEach((subscriber) => {
            if (topic.match(subscriber.topic)) {
              subscriber.callback(topic, message);
            }
          });
        },
      );

      if (!result.success) {
        error.value = result.error || 'Connection failed';
        isConnected.value = false;
      }
    } catch (err) {
      error.value = err.message || 'Connection failed';
      isConnected.value = false;
    }
  }

  function searchTopics(query) {
    return Object.keys(topics.value).filter((topic) => topic.match(query));
  }

  async function disconnect() {
    try {
      await window.mqtt.disconnect();
      isConnected.value = false;
    } catch (err) {
      console.error('Disconnect error:', err);
    }
  }

  async function publish(topic, message, options = {}) {
    try {
      const result = await window.mqtt.publish(topic, message, options);
      if (!result.success) {
        console.error('Publish failed:', result.error);
      }
    } catch (err) {
      console.error('Publish error:', err);
    }
  }

  function subscribe(topic, callback) {
    const l = {
      topic,
      callback,
    };
    subscribers.push(l);
    return l;
  }

  function unsubscribe(subscriber) {
    subscribers.splice(subscribers.indexOf(subscriber), 1);
  }

  const zigbee2mqttCount = computed(() => {
    return searchTopics('zigbee2mqtt/').reduce((acc, topic) => {
      const device = topic.split('/').slice(0, 2).join('/');
      if (!acc.includes(device)) {
        acc.push(device);
      }
      return acc;
    }, []).length;
  });

  const homeassistantCount = computed(() => {
    return searchTopics('homeassistant/').reduce((acc, topic) => {
      const device = topic.split('/')[2];
      if (!acc.includes(device)) {
        acc.push(device);
      }
      return acc;
    }, []).length;
  });

  return {
    config,
    isConnected,
    topics,
    topicsTree,
    zigbee2mqttCount,
    homeassistantCount,
    error,
    connect,
    disconnect,
    publish,
    subscribe,
    unsubscribe,
    searchTopics,
  };
});

// Enable HMR for this store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMQTTStore, import.meta.hot));
}
