<template>
  <q-card flat bordered>
    <q-card-section>
      <q-toolbar>
        <q-input v-model="props.entity.type" label="Entity Type" dense />
        <q-input v-model="props.entity.id" label="Entity Object Id" dense />
        <q-space />
        <q-btn
          label="remove"
          color="negative"
          flat
          @click="homeAssistantStore.removeDeviceEntity(props.device, props.entity)"
        />
      </q-toolbar>
      <div class="text-caption text-weight-light">/homeassistant/[type]/[DeviceId]/[ObjectId]</div>
    </q-card-section>
    <q-card-section>
      <monaco-editor v-model="deviceJson" :filetype="props.entity.type" style="min-height: 200px" />
      <q-banner v-if="jsonError" inline-actions class="text-white bg-red">
        Invalid Format: {{ jsonError }}
      </q-banner>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useHomeAssistantStore } from 'src/stores/homeassistant';
import MonacoEditor from 'src/components/MonacoEditor.vue';

const homeAssistantStore = useHomeAssistantStore();

const props = defineProps({
  entity: {
    type: Object,
    required: true,
  },
  device: {
    type: Object,
    required: true,
  },
});

const jsonError = ref(null);

const deviceJson = computed({
  get() {
    return JSON.stringify(props.entity.config, null, 2);
  },
  set(json) {
    try {
      const result = JSON.parse(json);
      props.entity.config = result;
      jsonError.value = null;
    } catch (e) {
      jsonError.value = e.message;
    }
  },
});
</script>
