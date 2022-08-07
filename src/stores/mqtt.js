import { defineStore } from "pinia";
import { ref, watchEffect, computed } from "vue";

const subscribers = [];

export const useMQTTStore = defineStore("mqtt", () => {
  const config = ref({
    url: "", // protocol://host:port
    username: "",
    password: "",
  });

  const topics = ref({});
  const topicsTree = ref([
    {
      label: "",
      children: [],
      selectable: false,
      id: "__ROOT__",
    },
  ]);

  watchEffect(() => {
    topicsTree.value[0].label = config.value.url;
  });

  function addToTree(topic, message) {
    const topicParts = topic.split("/");
    let currentNode = topicsTree.value[0];
    let id = [];
    topicParts.forEach((part, index) => {
      const isLeaf = index === topicParts.length - 1;
      id.push(part);
      if (isLeaf && part === "config" && topicParts[0] === "homeassistant") {
        const data = JSON.parse(topics.value[topic]);
        if (data.device.identifiers[0].startsWith("zigbee2mqtt")) {
          currentNode.parent.avatar = "logos/zigbee2mqtt.png";
          currentNode.parent.type = "zigbee2mqtt";
          currentNode.type = "zigbee2mqtt";
        }
        currentNode.parent.header = "homeassistant-discovery";
        currentNode.parent.label = `${data.device.name} - ${data.device.manufacturer} ${data.device.model} [${currentNode.parent.labelPart}]`;
      }
      if (isLeaf && part === "config" && topicParts[0] === "tasmota") {
        const data = JSON.parse(topics.value[topic]);
        currentNode.header = "tasmota-discovery";
        currentNode.body = "tasmota-discovery";
        currentNode.device = data;
      }
      const found = currentNode.children.find(
        (child) => child.labelPart === part
      );
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
          id: id.join("/"),
          parent: currentNode,
          type: currentNode.type,
        };
        if (newNode.id === "zigbee2mqtt") {
          newNode.avatar = "logos/zigbee2mqtt.png";
          newNode.type = "zigbee2mqtt";
        }
        if (newNode.id === "homeassistant") {
          newNode.avatar = "logos/homeassistant.svg";
        }
        if (["tasmota", "tele", "cmnd", "stat"].includes(newNode.id)) {
          newNode.avatar = "logos/tasmota.svg";
        }
        currentNode.children.push(newNode);
        currentNode.children.sort((a, b) => a.label.localeCompare(b.label));
        currentNode = newNode;
      }
    });
  }

  function removeFromTree(topic) {
    const topicParts = topic.split("/");
    let currentNode = topicsTree.value[0];
    topicParts.forEach((part, index) => {
      const isLeaf = index === topicParts.length - 1;
      if (isLeaf) {
        currentNode.children = currentNode.children.filter(
          (child) => child.id !== topic
        );
        while (currentNode.parent) {
          if (currentNode.children.length === 0) {
            currentNode.parent.children = currentNode.parent.children.filter(
              (child) => child.id !== currentNode.id
            );
          }
          currentNode = currentNode.parent;
        }
      } else {
        const found = currentNode.children.find(
          (child) => child.labelPart === part
        );
        if (found) {
          currentNode = found;
        }
      }
    });
  }

  const isConnected = ref(false);
  const error = ref(null);

  function connect() {
    window.mqtt.connect(
      {
        url: config.value.url,
        username: config.value.username,
        password: config.value.password,
      },
      (topic, message) => {
        if (topic === null) {
          if (Object.prototype.hasOwnProperty.call(message, "connected")) {
            isConnected.value = message.connected;
          }
          if (Object.prototype.hasOwnProperty.call(message, "error")) {
            error.value = message.error;
          }
          return;
        }
        if (message) {
          topics.value[topic] = message;
          addToTree(topic, message);
        } else {
          removeFromTree(topic);
          delete topics.value[topic];
        }
        subscribers.forEach((subscriber) => {
          if (topic.match(subscriber.topic)) {
            subscriber.callback(topic, message);
          }
        });
      }
    );
  }

  function searchTopics(query) {
    return Object.keys(topics.value).filter((topic) => topic.match(query));
  }

  function disconnect() {
    window.mqtt.disconnect();
  }

  function publish(topic, message, options = {}) {
    window.mqtt.publish(topic, message, options);
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
    return searchTopics("zigbee2mqtt/").reduce((acc, topic) => {
      const device = topic.split("/").slice(0, 2).join("/");
      if (!acc.includes(device)) {
        acc.push(device);
      }
      return acc;
    }, []).length;
  });

  const homeassistantCount = computed(() => {
    return searchTopics("homeassistant/").reduce((acc, topic) => {
      const device = topic.split("/")[2];
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
    connect,
    disconnect,
    publish,
    subscribe,
    unsubscribe,
    searchTopics,
  };
});
