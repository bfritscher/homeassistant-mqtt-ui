<template>
  <q-card flat bordered square>
    <q-card-section>
      <div class="text-h5 q-mb-xs">MQTT Server Config</div>
      <q-input
        label="Server URL"
        hint="Example: mqtt://localhost:1883 or ws://10.0.0.1:8883"
        v-model="mqttStore.config.url"
      />
    </q-card-section>
    <q-card-section class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input label="Username" v-model="mqttStore.config.username" />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="mqttStore.config.password"
          label="Password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
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
        @click="mqttStore.connect()"
      />
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { ref } from "vue";
import { useMQTTStore } from "src/stores/mqtt";

const mqttStore = useMQTTStore();
const isPwd = ref(true);
</script>
