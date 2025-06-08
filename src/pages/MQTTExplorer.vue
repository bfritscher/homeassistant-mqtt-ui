<template>
  <q-page>
    <mqtt-config v-if="!mqttStore.isConnected" class="q-ma-md" />
    <q-splitter v-else v-model="ui.mqttExplorer.splitterModel" style="height: calc(100vh - 106px)">
      <template #before>
        <q-input
          ref="filterRef"
          v-model="ui.mqttExplorer.filter.query"
          filled
          :debounce="300"
          label="Filter"
          dense
        >
          <template #append>
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
          v-model:selected="ui.mqttExplorer.selected"
          v-model:expanded="ui.mqttExplorer.expanded"
          :nodes="mqttStore.topicsTree"
          node-key="id"
          :filter="filterString"
          :filter-method="filterMethod"
        >
          <template #default-header="prop">
            <div class="row full-width items-center">
              <div class="col-grow">{{ prop.node.label }}</div>
              <q-btn
                v-if="prop.node.selectable"
                size="sm"
                label="X"
                color="negative"
                flat
                round
                @click.stop="removeTopic(prop.node.id)"
              />
            </div>
          </template>
          <template #header-tasmota-discovery="prop">
            <div
              :class="
                mqttStore.topics[
                  tasmotaStore.resolveFullTopic(prop.node.device) + 'LWT'
                ].toLowerCase()
              "
            >
              {{ prop.node.device.dn }} - {{ prop.node.device.md }} [{{ prop.node.labelPart }}]
              <q-btn
                :href="`http://${prop.node.device.ip}`"
                target="_blank"
                flat
                round
                size="sm"
                icon="launch"
                @click.stop
              />
              <q-btn
                v-if="tasmotaStore.isZBBridge(prop.node.device)"
                label="Get ZbInfo"
                color="primary"
                flat
                @click.stop="tasmotaStore.getZbInfo(prop.node.device)"
              />
            </div>
          </template>
          <template #body-tasmota-discovery="prop">
            <div
              @click="
                ui.mqttExplorer.selected = `${tasmotaStore.resolveFullTopic(prop.node.device)}STATE`
              "
            >
              {{ tasmotaStore.resolveFullTopic(prop.node.device) }}
            </div>
          </template>
          <template #header-homeassistant-discovery="prop">
            <img v-if="prop.node.avatar" class="q-tree__avatar q-mr-sm" :src="prop.node.avatar" />
            {{ prop.node.label }}
            <q-btn
              label="Edit"
              color="primary"
              flat
              @click.stop="homeAssistantStore.reverseEntity(prop.node.labelPart)"
            />
          </template>
        </q-tree>
      </template>
      <template #after>
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
              <q-btn label="publish" unelevated color="primary" class="q-mx-sm" @click="publish" />
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
              <q-checkbox v-model="ui.mqttExplorer.retain" label="retain" dense />
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
import { computed, ref, watchEffect, watch } from 'vue';
import { useMQTTStore } from 'src/stores/mqtt';
import { useTasmotaStore } from 'src/stores/tasmota';
import { useHomeAssistantStore } from 'src/stores/homeassistant';
import { useUIStore } from 'src/stores/ui';
import MonacoEditor from 'src/components/MonacoEditor.vue';
import MqttConfig from 'src/components/MqttConfig.vue';

const mqttStore = useMQTTStore();
const tasmotaStore = useTasmotaStore();
const homeAssistantStore = useHomeAssistantStore();
const ui = useUIStore();

const filterRef = ref(null);
const treeRef = ref(null);

watchEffect(() => {
  let newContent = '';
  if (ui.mqttExplorer.selected) {
    newContent = mqttStore.topics[ui.mqttExplorer.selected];
    try {
      newContent = JSON.stringify(JSON.parse(newContent), null, 2);
    } catch (e) {
      console.warn('Failed to parse JSON for topic:', ui.mqttExplorer.selected, e);
    }
    ui.mqttExplorer.content = newContent;
  }
  ui.mqttExplorer.topic = ui.mqttExplorer.selected;
});

// Handle tree expansion when filtering
watch(
  () => ui.mqttExplorer.filter.query,
  (newQuery) => {
    if (newQuery) {
      const search = newQuery.toLowerCase();
      const nodesToExpand = new Set(['__ROOT__']); // Always include root

      // Recursively find all nodes that need to be expanded
      const findMatchingNodes = (nodes, parentPath = []) => {
        nodes.forEach((node) => {
          const currentPath = [...parentPath, node.id];
          const nodeMatches = node.id.includes(search) || node.label.includes(search);

          if (nodeMatches) {
            // Add all parent nodes in the path to expansion set
            currentPath.forEach((nodeId) => nodesToExpand.add(nodeId));
          }

          if (node.children) {
            findMatchingNodes(node.children, currentPath);
          }
        });
      };

      // Find all nodes that need expansion
      if (mqttStore.topicsTree) {
        findMatchingNodes(mqttStore.topicsTree);
      }

      // Update the expanded array directly
      ui.mqttExplorer.expanded = Array.from(nodesToExpand);
    } else {
      // Reset to default expanded state when filter is cleared
      ui.mqttExplorer.expanded = ['__ROOT__', 'homeassistant', 'tasmota', 'tasmota/discovery'];
    }
  },
);

const filterString = computed(() => {
  return JSON.stringify(ui.mqttExplorer.filter);
});

function filterMethod(node, filter) {
  const json = JSON.parse(filter);

  if (node.type === 'zigbee2mqtt' && !json.zigbee2mqtt) {
    return false;
  }
  if (!json.query) {
    return true;
  }
  const search = json.query.toLowerCase();

  // Check if this node matches
  const nodeMatches =
    node.id === '__ROOT__' || node.id.includes(search) || node.label.includes(search);

  if (nodeMatches) {
    return true;
  }

  // Check if any child nodes match (recursive)
  if (node.children) {
    return node.children.some((child) => filterMethod(child, filter));
  }

  return false;
}
function resetFilter() {
  ui.mqttExplorer.filter.query = '';
  // Restore default expanded state
  ui.mqttExplorer.expanded = ['__ROOT__', 'homeassistant', 'tasmota', 'tasmota/discovery'];
  filterRef.value.focus();
}

function publish() {
  mqttStore.publish(ui.mqttExplorer.topic, ui.mqttExplorer.content, {
    qos: ui.mqttExplorer.qos,
    retain: ui.mqttExplorer.retain,
  });
}
function removeTopic(topic) {
  mqttStore.publish(topic, '', { retain: true });
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
