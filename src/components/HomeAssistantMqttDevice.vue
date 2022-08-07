<template>
  <q-card>
    <q-card-section>
      <q-toolbar>
        <q-input v-model="props.device.id" label="Device Id Topic" />
        <q-btn
          label="view messages"
          flat
          color="primary"
          @click="showDiscovery"
        />
        <q-btn
          flat
          label="publish"
          color="secondary"
          @click="homeAssistantStore.publishDevice(props.device)"
        />
        <q-space />
        <q-btn
          label="remove"
          color="negative"
          flat
          @click="homeAssistantStore.removeDevice(props.device)"
        />
      </q-toolbar>
      <div class="text-caption text-weight-light">
        /homeassistant/[type]/[DeviceId]/[ObjectId]
      </div>
    </q-card-section>
    <q-card-section>
      <monaco-editor
        v-model="deviceJson"
        filetype="device"
        style="min-height: 200px"
      />
      <q-banner inline-actions class="text-white bg-red" v-if="jsonError">
        Invalid Format: {{ jsonError }}
      </q-banner>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Entities</div>
    </q-card-section>
    <q-card-section
      v-for="(entity, index) in props.device.entities"
      :key="index"
    >
      <home-assistant-mqtt-entity :entity="entity" :device="props.device" />
    </q-card-section>
    <q-card-actions>
      <q-btn
        label="Add Sensor"
        color="primary"
        flat
        @click="homeAssistantStore.addEntityToDevice(null, props.device)"
      />
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import MonacoEditor from "src/components/MonacoEditor.vue";
import { useHomeAssistantStore } from "src/stores/homeassistant";
import HomeAssistantMqttEntity from "src/components/HomeAssistantMqttEntity.vue";
import DialogDeviceDiscovery from "src/components/DialogDeviceDiscovery.vue";

const homeAssistantStore = useHomeAssistantStore();
const $q = useQuasar();

const props = defineProps({
  device: {
    type: Object,
    required: true,
  },
});

const jsonError = ref(null);

const deviceJson = computed({
  get() {
    return JSON.stringify(props.device.config, null, 2);
  },
  set(json) {
    try {
      const result = JSON.parse(json);
      props.device.config = result;
      jsonError.value = null;
    } catch (e) {
      jsonError.value = e.message;
    }
  },
});
function showDiscovery() {
  $q.dialog({
    component: DialogDeviceDiscovery,
    componentProps: {
      device: props.device,
    },
  });
}
</script>
