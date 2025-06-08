import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

export const useUIStore = defineStore('ui', () => {
  const mqttExplorer = reactive({
    splitterModel: 50,
    topic: '',
    content: '',
    retain: false,
    qos: 0,
    selected: null,
    filter: {
      query: '',
      zigbee2mqtt: false,
    },
    expanded: ['__ROOT__', 'homeassistant', 'tasmota', 'tasmota/discovery'],
  });

  return {
    mqttExplorer,
  };
});

// Enable HMR for this store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
}
