<template>
  <q-card flat bordered square>
    <q-card-section>
      <div class="text-h5 q-mb-xs">MQTT Server Config</div>
      <q-input
        v-model="mqttStore.config.url"
        label="Server URL"
        hint="Example: mqtt://localhost:1883 or ws://10.0.0.1:8883"
      />
    </q-card-section>
    <q-card-section class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input v-model="mqttStore.config.username" label="Username" />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="mqttStore.config.password"
          label="Password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template #append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
    </q-card-section>
    <q-banner v-if="mqttStore.error" inline-actions class="text-white bg-red">
      {{ mqttStore.error }}
    </q-banner>
    <q-card-actions align="right">
      <q-btn
        label="connect"
        unelevated
        color="primary"
        icon="bolt"
        :loading="connecting"
        @click="handleConnect"
      />
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { ref } from 'vue';
import { useMQTTStore } from 'src/stores/mqtt';

const mqttStore = useMQTTStore();
const isPwd = ref(true);
const connecting = ref(false);

async function handleConnect() {
  connecting.value = true;
  try {
    await mqttStore.connect();
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    connecting.value = false;
  }
}
</script>
