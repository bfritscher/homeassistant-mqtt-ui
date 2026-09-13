<template>
  <q-dialog ref="dialogRef" :persistent="publishing" @hide="onDialogHide">
    <q-card style="width: 1000px; max-width: 95vw" class="column no-wrap">
      <q-card-section>
        <div class="text-h6">Update published devices</div>
        <div class="text-body2">
          Review fixes for older generated templates. Device IDs, names, topics and custom settings
          are preserved. Only recognized older templates are updated.
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="scroll" style="max-height: 65vh">
        <q-banner v-if="!entries.length" class="bg-grey-2">
          No recognized updates found in the received discovery messages.
        </q-banner>
        <template v-else>
          <div class="row items-center q-mb-sm">
            <q-checkbox
              v-model="selectAll"
              label="Select all"
              :disable="publishing || !pending.length"
            />
            <q-space />
            <span>{{ entries.length }} entities with updates</span>
          </div>
          <q-card v-for="entry in entries" :key="entry.topic" flat bordered class="q-mb-md">
            <q-card-section class="q-py-sm">
              <div class="row items-center">
                <q-checkbox
                  v-model="entry.selected"
                  :label="entry.name"
                  :disable="publishing || entry.published"
                />
                <q-space />
                <q-chip v-if="entry.published" color="positive" text-color="white" icon="check"
                  >Published</q-chip
                >
              </div>
              <div class="text-caption update-topic">{{ entry.topic }}</div>
              <q-banner v-if="entry.error" class="bg-red-1 text-negative q-mt-sm">{{
                entry.error
              }}</q-banner>
            </q-card-section>
            <q-expansion-item :label="`Review ${entry.changes.length} changes`">
              <q-card-section v-for="change in entry.changes" :key="change.field" class="q-pt-none">
                <div class="text-subtitle2 q-mb-xs">{{ change.field }}</div>
                <div class="row q-col-gutter-sm">
                  <div class="col-12 col-md-6">
                    <div class="text-caption">Before</div>
                    <pre class="bg-red-1 q-pa-sm">{{ change.before }}</pre>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="text-caption">After</div>
                    <pre class="bg-green-1 q-pa-sm">{{
                      change.after === undefined ? '(removed)' : change.after
                    }}</pre>
                  </div>
                </div>
              </q-card-section>
            </q-expansion-item>
          </q-card>
        </template>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Close" :disable="publishing" @click="onDialogOK" />
        <q-btn
          color="primary"
          :label="`Publish selected (${selected.length})`"
          :loading="publishing"
          :disable="!selected.length || !mqttStore.isConnected"
          @click="publish"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { useHomeAssistantStore } from 'src/stores/homeassistant';
import { useMQTTStore } from 'src/stores/mqtt';

const props = defineProps({ deviceId: { type: String, default: undefined } });
defineEmits([...useDialogPluginComponent.emits]);
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const homeAssistantStore = useHomeAssistantStore();
const mqttStore = useMQTTStore();
const entries = ref(
  homeAssistantStore.getPublishedUpdates(props.deviceId).map((update) => ({
    ...update,
    selected: true,
    published: false,
    error: '',
  })),
);
const publishing = ref(false);
const pending = computed(() => entries.value.filter((entry) => !entry.published));
const selected = computed(() => pending.value.filter((entry) => entry.selected));
const selectAll = computed({
  get: () => pending.value.length > 0 && pending.value.every((entry) => entry.selected),
  set: (value) =>
    pending.value.forEach((entry) => {
      entry.selected = value;
    }),
});

async function publish() {
  publishing.value = true;
  try {
    for (const entry of [...selected.value]) {
      entry.error = '';
      try {
        const result = await homeAssistantStore.publishDiscoveryUpdate(entry);
        entry.published = result?.success === true;
        if (!entry.published) entry.error = result?.error || 'Publish failed. Please try again.';
      } catch (error) {
        entry.error = error.message || 'Publish failed. Please try again.';
      }
    }
  } finally {
    publishing.value = false;
  }
}
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 0;
}
.update-topic {
  overflow-wrap: anywhere;
}
</style>
