<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Entries</div>
      </q-card-section>
      <q-separator />
      <div style="max-height: 50vh" class="scroll q-ma-md">
        <div
          v-for="(m, index) in homeAssistantStore.toDiscoveryEntries(
            props.device
          )"
          :key="index"
        >
          <div class="text-subtitle1">
            Published to <em>{{ m.topic }}</em>
          </div>
          <pre>{{ m.message }}</pre>
          <q-separator />
        </div>
      </div>

      <q-card-actions align="right">
        <q-btn
          color="secondary"
          flat
          label="publish"
          @click="
            homeAssistantStore.publishDevice(props.device);
            onOKClick();
          "
        />
        <q-btn color="primary" flat label="close" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { useHomeAssistantStore } from "src/stores/homeassistant";
import MonacoEditor from "src/components/MonacoEditor.vue";

const homeAssistantStore = useHomeAssistantStore();

const props = defineProps({
  device: {
    type: Object,
    required: true,
  },
});

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK();
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
