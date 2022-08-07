import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useUIStore = defineStore("ui", () => {
  const mqttExplorer = reactive({
    splitterModel: 50,
    topic: "",
    content: "",
    retain: false,
    qos: 0,
    selected: null,
    filter: {
      query: "",
      zigbee2mqtt: false,
    },
    expanded: ["__ROOT__", "homeassistant", "tasmota", "tasmota/discovery"],
  });

  return {
    mqttExplorer,
  };
});
