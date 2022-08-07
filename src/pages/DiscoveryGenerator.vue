<template>
  <q-page>
    <q-toolbar class="bg-grey-3">
      <q-btn
        label="publish all"
        flat
        color="secondary"
        @click="homeAssistantStore.publishAllDevices()"
      />
      <q-space />
      <q-btn
        label="remove all"
        flat
        color="negative"
        @click="homeAssistantStore.removeAll()"
      />
    </q-toolbar>
    <home-assistant-mqtt-device
      :device="device"
      v-for="device in homeAssistantStore.devices"
      :key="device.id"
      class="q-ma-md"
    />
    <q-toolbar>
      <q-btn
        label="add device"
        color="primary"
        @click="homeAssistantStore.addDevice()"
      />
    </q-toolbar>
  </q-page>
</template>

<script setup>
import { useHomeAssistantStore } from "src/stores/homeassistant";

import HomeAssistantMqttDevice from "src/components/HomeAssistantMqttDevice.vue";

const homeAssistantStore = useHomeAssistantStore();
</script>
