<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title> Home Assistant MQTT UI </q-toolbar-title>
        <header-status />
      </q-toolbar>
      <q-tabs no-caps>
        <q-route-tab label="About" to="/" exact />
        <q-route-tab
          label="MQTT Explorer"
          to="/mqtt"
          exact
          :disable="!$q.platform.is.electron"
        />
        <q-route-tab
          label="Home Assistant Discovery Generator"
          to="/discovery-generator"
          exact
        />
        <q-route-tab
          label="Tasmota ZB Bridge"
          to="/tasmota-zb-bridge"
          exact
          :disable="!$q.platform.is.electron"
        >
          <q-badge
            :color="
              tasmotaStore.zbBridges.length === 0 ? 'negative' : 'positive'
            "
            floating
            rounded
          />
        </q-route-tab>
      </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useTasmotaStore } from "src/stores/tasmota";
import HeaderStatus from "src/components/HeaderStatus.vue";
const tasmotaStore = useTasmotaStore();
</script>
