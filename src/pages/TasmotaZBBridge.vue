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
            @click.stop
            flat
            round
            icon="launch"
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
            @update:model-value="tasmotaStore.publishCmd('SetOption89', $event)"
            label="SetOption89"
          />
          Configure MQTT topic for Zigbee devices, unique device topic based on
          Zigbee device ShortAddr
          <q-banner
            v-if="!tasmotaStore.config.SetOption89"
            class="text-white bg-negative"
          >
            SetOption89 must be enabled for this to work!
          </q-banner>
        </div>
        <div>
          <q-toggle
            :model-value="tasmotaStore.config.SetOption112"
            @update:model-value="
              tasmotaStore.publishCmd('SetOption112', $event)
            "
            label="SetOption112"
          />
          Use friendly name in Zigbee topic
        </div>
        <div>
          <q-toggle
            :model-value="tasmotaStore.config.SetOption83"
            @update:model-value="tasmotaStore.publishCmd('SetOption83', $event)"
            label="SetOption83"
          />
          Uses Zigbee device friendly name instead of 16 bits short addresses as
          JSON key when reporting values and commands
        </div>
        <div>
          <q-toggle
            :model-value="tasmotaStore.config.SensorRetain"
            @update:model-value="
              tasmotaStore.publishCmd('SensorRetain', $event)
            "
            label="SensorRetain"
          />
          Enable MQTT retain flag on TELE message
        </div>
        <q-btn
          @click.stop="tasmotaStore.getZbInfo(tasmotaStore.selectedZBDevice)"
          label="Refresh ZbInfo"
          color="primary"
          flat
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
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th
                v-for="col in props.cols.filter(
                  (col) => !['Endpoints', 'Config'].includes(col.name)
                )"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="primary"
                  round
                  dense
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                />
              </q-td>
              <q-td
                v-for="col in props.cols.filter(
                  (col) => !['Endpoints', 'Config'].includes(col.name)
                )"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
                <q-popup-edit
                  v-if="col.name === 'Name'"
                  :model-value="col.value"
                  @update:model-value="
                    tasmotaStore.publishCmd(
                      'ZbName',
                      `${props.row.Device},${$event}`
                    )
                  "
                  title="Set Name"
                  buttons
                  v-slot="scope"
                >
                  <q-input type="text" v-model="scope.value" dense autofocus />
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
                        props.row.IEEEAddr?.toLowerCase()
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
          label="generate discovery config for all SNZB-02 sensors (TH01)"
          @click="tasmotaStore.generateHomeAssistantDiscoveryForAllTH01()"
        />
      </div>
      <q-banner
        v-if="tasmotaStore.zbBridges.length === 0"
        class="bg-warning text-white"
      >
        <div class="text-h5">No Sonoff ZbBridge with Tasmota found!</div>
        <div class="text-body1">Did you configure MQTT on the device?</div>
        <div class="text-body1">
          Wait a moment until all messages have been received.
        </div>
      </q-banner>
    </div>
  </q-page>
</template>

<script setup>
import { useMQTTStore } from "src/stores/mqtt";
import { useTasmotaStore } from "src/stores/tasmota";
import MqttConfig from "src/components/MqttConfig.vue";

const mqttStore = useMQTTStore();
const tasmotaStore = useTasmotaStore();
const initialPagination = {
  page: 1,
  rowsPerPage: 0,
};
</script>
