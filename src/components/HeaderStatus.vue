<template>
  <div v-if="!mqttStore.isConnected" class="flex q-my-sm">mqtt: not connected</div>
  <div v-else class="flex q-my-sm">
    <q-btn
      v-if="mqttStore.homeassistantCount > 0"
      icon="img:logos/homeassistant.svg"
      round
      flat
      size="md"
    >
      <q-badge color="orange" floating :label="mqttStore.homeassistantCount" />
      <q-tooltip> Home Assistant Discovery Detected </q-tooltip>
    </q-btn>
    <q-btn v-else icon="img:logos/homeassistant.svg" round flat size="md" disable></q-btn>
    <q-btn v-if="tasmotaStore.devicesCount > 0" icon="img:logos/tasmota.svg" round flat size="md">
      <q-badge color="orange" floating :label="tasmotaStore.devicesCount" />
      <q-tooltip> Tasmota Detected </q-tooltip>
    </q-btn>
    <q-btn v-else icon="img:logos/tasmota.svg" round flat size="md"> </q-btn>
    <q-btn
      v-if="mqttStore.zigbee2mqttCount > 0"
      icon="img:logos/zigbee2mqtt.png"
      round
      flat
      size="md"
    >
      <q-badge color="orange" floating :label="mqttStore.zigbee2mqttCount" />
      <q-tooltip> ZigBee2Mqtt Detected </q-tooltip>
    </q-btn>
    <q-btn v-else icon="img:logos/zigbee2mqtt.png" round flat size="md"> </q-btn>
    <q-btn flat label="disconnect" icon="cloud_off" @click="mqttStore.disconnect()" />
  </div>
</template>
<script setup>
import { useMQTTStore } from 'src/stores/mqtt';
import { useTasmotaStore } from 'src/stores/tasmota';
const mqttStore = useMQTTStore();
const tasmotaStore = useTasmotaStore();
</script>
