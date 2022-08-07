<template>
  <q-page>
    <mqtt-config v-if="!mqttStore.isConnected" class="q-ma-md" />
    <q-splitter
      v-else
      v-model="ui.mqttExplorer.splitterModel"
      style="height: calc(100vh - 106px)"
    >
      <template v-slot:before>
        <q-input
          ref="filterRef"
          filled
          v-model="ui.mqttExplorer.filter.query"
          :debounce="300"
          label="Filter"
          dense
        >
          <template v-slot:append>
            <q-icon
              v-if="ui.mqttExplorer.filter.query !== ''"
              name="clear"
              class="cursor-pointer"
              @click="resetFilter"
            />
          </template>
        </q-input>
        <q-toolbar>
          <q-checkbox
            v-model="ui.mqttExplorer.filter.zigbee2mqtt"
            label="Zigbee2MQTT"
            checked-icon="img:logos/zigbee2mqtt.png"
            unchecked-icon="img:logos/zigbee2mqtt-grey.png"
          />
        </q-toolbar>
        <q-separator />
        <q-tree
          ref="treeRef"
          :nodes="mqttStore.topicsTree"
          node-key="id"
          :filter="ui.mqttExplorer.filter"
          :filter-method="filterMethod"
          v-model:selected="ui.mqttExplorer.selected"
          v-model:expanded="ui.mqttExplorer.expanded"
        >
          <template v-slot:default-header="prop">
            <div class="row full-width items-center">
              <div class="col-grow">{{ prop.node.label }}</div>
              <q-btn
                v-if="prop.node.selectable"
                @click.stop="removeTopic(prop.node.id)"
                size="sm"
                label="X"
                color="negative"
                flat
                round
              />
            </div>
          </template>
          <template v-slot:header-tasmota-discovery="prop">
            <div
              :class="
                mqttStore.topics[
                  tasmotaStore.resolveFullTopic(prop.node.device) + 'LWT'
                ].toLowerCase()
              "
            >
              {{ prop.node.device.dn }} - {{ prop.node.device.md }} [{{
                prop.node.labelPart
              }}]
              <q-btn
                :href="`http://${prop.node.device.ip}`"
                target="_blank"
                @click.stop
                flat
                round
                size="sm"
                icon="launch"
              />
              <q-btn
                v-if="tasmotaStore.isZBBridge(prop.node.device)"
                @click.stop="tasmotaStore.getZbInfo(prop.node.device)"
                label="Get ZbInfo"
                color="primary"
                flat
              />
            </div>
          </template>
          <template v-slot:body-tasmota-discovery="prop">
            <div
              @click="
                ui.mqttExplorer.selected = `${tasmotaStore.resolveFullTopic(
                  prop.node.device
                )}STATE`
              "
            >
              {{ tasmotaStore.resolveFullTopic(prop.node.device) }}
            </div>
          </template>
          <template v-slot:header-homeassistant-discovery="prop">
            <img
              v-if="prop.node.avatar"
              class="q-tree__avatar q-mr-sm"
              :src="prop.node.avatar"
            />
            {{ prop.node.label }}
            <q-btn
              @click.stop="
                homeAssistantStore.reverseEntity(prop.node.labelPart)
              "
              label="Edit"
              color="primary"
              flat
            />
          </template>
        </q-tree>
      </template>
      <template v-slot:after>
        <div class="column full-height overflow-hidden">
          <div class="col-shrink">
            <div class="row items-center">
              <q-input
                v-model="ui.mqttExplorer.topic"
                dense
                filled
                label="Topic"
                class="col-grow"
              />
              <q-btn
                label="publish"
                unelevated
                color="primary"
                class="q-mx-sm"
                @click="publish"
              />
            </div>
            <q-toolbar>
              <q-space />
              <q-select
                v-model="ui.mqttExplorer.qos"
                label="QoS"
                :options="[
                  { label: '0 - At most once ', value: 0 },
                  { label: '1 - At least once', value: 1 },
                  { label: '2 - Exactly once', value: 2 },
                ]"
                emit-value
                map-options
                dense
              />
              <q-checkbox
                v-model="ui.mqttExplorer.retain"
                label="retain"
                dense
              />
            </q-toolbar>
          </div>
          <q-separator />
          <monaco-editor v-model="ui.mqttExplorer.content" class="col" />
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useMQTTStore } from "src/stores/mqtt";
import { useTasmotaStore } from "src/stores/tasmota";
import { useHomeAssistantStore } from "src/stores/homeassistant";
import { useUIStore } from "src/stores/ui";
import MonacoEditor from "src/components/MonacoEditor.vue";
import MqttConfig from "src/components/MqttConfig.vue";

const mqttStore = useMQTTStore();
const tasmotaStore = useTasmotaStore();
const homeAssistantStore = useHomeAssistantStore();
const ui = useUIStore();

const filterRef = ref(null);
const treeRef = ref(null);

watchEffect(() => {
  let newContent = "";
  if (ui.mqttExplorer.selected) {
    newContent = mqttStore.topics[ui.mqttExplorer.selected];
    try {
      newContent = JSON.stringify(JSON.parse(newContent), null, 2);
    } catch (e) {}
    ui.mqttExplorer.content = newContent;
  }
  ui.mqttExplorer.topic = ui.mqttExplorer.selected;
});

function filterMethod(node, filter) {
  const json = filter;

  if (node.type === "zigbee2mqtt" && !json.zigbee2mqtt) {
    return false;
  }
  if (!json.query) {
    return true;
  }
  const search = ui.mqttExplorer.filter.query.toLowerCase();
  if (
    node.id === "__ROOT__" ||
    node.id.includes(search) ||
    node.label.includes(search)
  ) {
    treeRef.value.setExpanded(node.id, true);
    return true;
  } else {
    return false;
  }
}
function resetFilter() {
  ui.mqttExplorer.filter.value.query = "";
  filterRef.value.focus();
}

function publish() {
  mqttStore.publish(ui.mqttExplorer.topic, ui.mqttExplorer.content, {
    qos: ui.mqttExplorer.qos,
    retain: ui.mqttExplorer.retain,
  });
}
function removeTopic(topic) {
  mqttStore.publish(topic, "", { retain: true });
  mqttStore.removeTopic(topic);
}
</script>
<style>
.online {
  color: green;
}
.offline {
  color: red;
}
</style>
