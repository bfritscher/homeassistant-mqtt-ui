<template>
  <q-page padding>
    <mqtt-config v-if="!mqttStore.isConnected" />
    <div v-else>
      <div class="text-h5">Tasmota ZigBee Bridge</div>
      <div>
        <span>Bridge:</span>
        <span v-for="device in tasmotaStore.zbBridges" :key="device.id">
          <q-radio
            v-model="tasmotaStore.selectedZBDevice"
            :val="device"
            :label="`${device.dn} [${device.t}]`"
            @click="tasmotaStore.getZbInfo(device)"
          />
          <q-btn
            :href="`http://${device.ip}`"
            target="_blank"
            flat
            round
            icon="launch"
            @click.stop
          />
        </span>
      </div>
      <div v-if="tasmotaStore.selectedZBDevice">
        <div>
          <a href="https://tasmota.github.io/docs/Commands/" target="_blank">
            Tasmota Commands Documentation
          </a>
        </div>
        <div>
          <q-toggle
            :model-value="tasmotaStore.config.SetOption89"
            label="SetOption89"
            @update:model-value="tasmotaStore.publishCmd('SetOption89', $event)"
          />
          Configure MQTT topic for Zigbee devices, unique device topic based on Zigbee device
          ShortAddr
          <q-banner v-if="!tasmotaStore.config.SetOption89" class="text-white bg-negative">
            SetOption89 must be enabled for this to work!
          </q-banner>
        </div>
        <div>
          <q-toggle
            :model-value="tasmotaStore.config.SetOption112"
            label="SetOption112"
            @update:model-value="tasmotaStore.publishCmd('SetOption112', $event)"
          />
          Use friendly name in Zigbee topic
        </div>
        <div>
          <q-toggle
            :model-value="tasmotaStore.config.SetOption83"
            label="SetOption83"
            @update:model-value="tasmotaStore.publishCmd('SetOption83', $event)"
          />
          Uses Zigbee device friendly name instead of 16 bits short addresses as JSON key when
          reporting values and commands
        </div>
        <div>
          <q-toggle
            :model-value="tasmotaStore.config.SensorRetain"
            label="SensorRetain"
            @update:model-value="tasmotaStore.publishCmd('SensorRetain', $event)"
          />
          Enable MQTT retain flag on TELE message
        </div>
        <q-btn
          label="Refresh ZbInfo"
          color="primary"
          flat
          @click.stop="tasmotaStore.getZbInfo(tasmotaStore.selectedZBDevice)"
        />
        <q-table
          class="q-mt-md"
          title="ZigBee Devices"
          :rows="tasmotaStore.ZbInfos"
          row-key="Device"
          :pagination="initialPagination"
          flat
          bordered
        >
          <template #header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th
                v-for="col in props.cols.filter(
                  (col) => !['Endpoints', 'Config'].includes(col.name),
                )"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template #body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="primary"
                  round
                  dense
                  :icon="props.expand ? 'remove' : 'add'"
                  @click="props.expand = !props.expand"
                />
              </q-td>
              <q-td
                v-for="col in props.cols.filter(
                  (col) => !['Endpoints', 'Config'].includes(col.name),
                )"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
                <q-popup-edit
                  v-if="col.name === 'Name'"
                  v-slot="scope"
                  :model-value="col.value"
                  title="Set Name"
                  buttons
                  @update:model-value="
                    tasmotaStore.publishCmd('ZbName', `${props.row.Device},${$event}`)
                  "
                >
                  <q-input v-model="scope.value" type="text" dense autofocus />
                </q-popup-edit>
                <q-icon v-if="col.name === 'Name'" name="edit" />
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">
                  Home Assistant Discovery topics found for this device
                  <ul>
                    <li
                      v-for="(topic, index) in mqttStore.searchTopics(
                        props.row.IEEEAddr?.toLowerCase(),
                      )"
                      :key="index"
                    >
                      {{ topic }}
                    </li>
                  </ul>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>

        <q-btn
          class="q-mt-md"
          color="primary"
          label="generate discovery config for all SNZB-02 sensors (TH01, SNZB-02P, SNZB-02D)"
          @click="tasmotaStore.generateHomeAssistantDiscoveryForAllSNZB02()"
        />
      </div>
      <q-banner v-if="tasmotaStore.zbBridges.length === 0" class="bg-warning text-white">
        <div class="text-h5">No Sonoff ZbBridge with Tasmota found!</div>
        <div class="text-body1">Did you configure MQTT on the device?</div>
        <div class="text-body1">Wait a moment until all messages have been received.</div>
      </q-banner>
    </div>
  </q-page>
</template>

<script setup>
import { useMQTTStore } from 'src/stores/mqtt';
import { useTasmotaStore } from 'src/stores/tasmota';
import MqttConfig from 'src/components/MqttConfig.vue';

const mqttStore = useMQTTStore();
const tasmotaStore = useTasmotaStore();
const initialPagination = {
  page: 1,
  rowsPerPage: 0,
};
</script>
