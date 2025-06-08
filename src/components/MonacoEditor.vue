<template>
  <div ref="editorWrapper" class="col relative-position editorWrapper">
    <q-resize-observer @resize="onResize" />
    <div ref="editorElement" class="absolute-top-left"></div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
/*
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
*/

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    /*
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    */
    return new editorWorker();
  },
};

import { defineComponent, onMounted, onUnmounted, watch, ref } from 'vue';

export default defineComponent({
  name: 'MonacoEditor',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
    filetype: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editorElement = ref(null);
    const editorWrapper = ref(null);
    let editor;
    onMounted(() => {
      const modelUri = monaco.Uri.parse(
        `inmemory://${Math.random().toString(36).substring(2, 15)}.${props.filetype}.json`,
      );
      const model = monaco.editor.createModel(props.modelValue, 'json', modelUri);
      editor = monaco.editor.create(
        editorElement.value,
        Object.assign(
          {
            model,
            theme: 'vs',
            minimap: {
              enabled: false,
            },
          },
          props.options,
        ),
      );

      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: 'http://home-assistant/mqtt-device-schema.json', // id of the first schema
            fileMatch: ['*.device.json'], // associate with our model
            schema: {
              additionalProperties: false,
              type: 'object',
              properties: {
                configuration_url: {
                  description:
                    'A link to the webpage that can manage the configuration of this device. Can be either an HTTP or HTTPS link.',
                  type: 'string',
                },
                connections: {
                  description:
                    'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.',
                  type: 'array',
                  items: [
                    {
                      type: 'array',
                      items: [
                        {
                          type: 'string',
                        },
                        {
                          type: 'string',
                        },
                      ],
                    },
                  ],
                },
                identifiers: {
                  description:
                    'A list of IDs that uniquely identify the device. For example a serial number.',
                  type: 'array',
                  items: [
                    {
                      type: 'string',
                    },
                  ],
                },
                manufacturer: {
                  description: 'The manufacturer of the device.',
                  type: 'string',
                },
                model: {
                  description: 'The model of the device.',
                  type: 'string',
                },
                name: {
                  description: 'The name of the device.',
                  type: 'string',
                },
                suggested_area: {
                  description: 'Suggest an area if the device isn’t in one yet.',
                  type: 'string',
                },
                sw_version: {
                  description: 'The firmware version of the device.',
                  type: 'string',
                },
                via_device: {
                  description:
                    'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.',
                  type: 'string',
                },
              },
            },
          },
          {
            uri: 'http://home-assistant/mqtt-sensor-schema.json', // id of the first schema
            fileMatch: ['*.sensor.json'], // associate with our model
            schema: {
              type: 'object',
              properties: {
                availability: {
                  description:
                    'A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`.',
                  type: 'array',
                  items: [
                    {
                      type: 'object',
                      additionalProperties: false,
                      required: ['topic'],
                      properties: {
                        payload_available: {
                          description:
                            'The payload that represents the available state. Default: online',
                          type: 'string',
                        },
                        payload_not_available: {
                          description:
                            'The payload that represents the unavailable state. Default: offline',
                          type: 'string',
                        },
                        topic: {
                          description:
                            'An MQTT topic subscribed to receive availability (online/offline) updates.',
                          type: 'string',
                        },
                        value_template: {
                          description:
                            "Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#processing-incoming-data) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`.",
                          type: 'string',
                        },
                      },
                    },
                  ],
                },
                availability_mode: {
                  description:
                    'When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability. Default: latest',
                  enum: ['latest', 'all', 'any'],
                },
                availability_template: {
                  description:
                    "Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#processing-incoming-data) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`.",
                  type: 'string',
                },
                availability_topic: {
                  description:
                    'The MQTT topic subscribed to receive availability (online/offline) updates.',
                  type: 'string',
                },
                device_class: {
                  description:
                    'The [type/class](https://www.home-assistant.io/integrations/sensor/#device-class) of the sensor to set the icon in the frontend. Default None',
                  enum: [
                    'None',
                    'apparent_power',
                    'aqi',
                    'battery',
                    'carbon_dioxide',
                    'carbon_monoxide',
                    'current',
                    'date',
                    'duration',
                    'energy',
                    'frequency',
                    'gas',
                    'humidity',
                    'illuminance',
                    'monetary',
                    'nitrogen_dioxide',
                    'nitrogen_monoxide',
                    'nitrous_oxide',
                    'ozone',
                    'pm1',
                    'pm10',
                    'pm25',
                    'power_factor',
                    'power',
                    'pressure',
                    'reactive_power',
                    'signal_strength',
                    'sulphur_dioxide',
                    'temperature',
                    'timestamp',
                    'volatile_organic_compounds',
                    'voltage',
                  ],
                },
                enabled_by_default: {
                  description:
                    'Flag which defines if the entity should be enabled when first added. Default: true.',
                  type: 'boolean',
                },
                encoding: {
                  description:
                    'The encoding of the payloads received. Set to `""` to disable decoding of incoming payload. Default: utf-8.',
                  type: 'string',
                },
                entity_category: {
                  description:
                    'The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity. Default None',
                  type: 'string',
                },
                expire_after: {
                  description:
                    "Defines the number of seconds after the sensor's state expires, if it's not updated. After expiry, the sensor's state becomes `unavailable`. Default 0.",
                  type: 'integer',
                },
                force_update: {
                  description:
                    "Sends update events even if the value hasn't changed. Useful if you want to have meaningful value graphs in history.",
                  type: 'boolean',
                  default: false,
                },
                icon: {
                  description:
                    '[Icon](https://www.home-assistant.io/docs/configuration/customizing-devices/#icon) for the entity.',
                  type: 'string',
                },
                json_attributes_template: {
                  description:
                    'Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`.',
                  type: 'string',
                },
                json_attributes_topic: {
                  description:
                    'The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Implies `force_update` of the current sensor state when a message is received on this topic.',
                  type: 'string',
                },
                last_reset_value_template: {
                  description:
                    "Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#processing-incoming-data) to extract the last_reset. Available variables: `entity_id`. The `entity_id` can be used to reference the entity's attributes.",
                  type: 'string',
                },
                name: {
                  description: 'The name of the MQTT sensor. Default MQTT Sensor.',
                  type: 'string',
                },
                object_id: {
                  description: 'Used instead of `name` for automatic generation of `entity_id`',
                  type: 'string',
                },
                payload_available: {
                  description: 'The payload that represents the available state. Default online',
                  type: 'string',
                },
                payload_not_available: {
                  description: 'The payload that represents the unavailable state. Default offline',
                  type: 'string',
                },
                qos: {
                  description: 'The maximum QoS level of the state topic. Default 0.',
                  type: 'integer',
                },
                state_class: {
                  description:
                    'The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor. Default None.',
                  enum: ['measurement', 'total', 'total_increasing'],
                },
                state_topic: {
                  description: 'The MQTT topic subscribed to receive sensor values.',
                  type: 'string',
                },
                unique_id: {
                  description:
                    'An ID that uniquely identifies this sensor. If two sensors have the same unique ID, Home Assistant will raise an exception.',
                  type: 'string',
                },
                unit_of_measurement: {
                  description: 'Defines the units of measurement of the sensor, if any.',
                  type: 'string',
                },
                value_template: {
                  description:
                    "Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#processing-incoming-data) to extract the value. Available variables: `entity_id`. The `entity_id` can be used to reference the entity's attributes. If the template throws an error, the current state will be used instead.",
                  type: 'string',
                },
              },
              required: ['state_topic'],
            },
          },
        ],
      });

      editor.onDidChangeModelContent(() => {
        emit('update:modelValue', editor?.getValue());
      });
    });
    onUnmounted(() => {
      editor?.dispose();
    });

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue !== editor?.getValue()) {
          editor?.getModel()?.setValue(props.modelValue);
          editor?.setScrollPosition({ scrollTop: 0 });
        }
      },
    );
    return {
      editorElement,
      editorWrapper,
      onResize() {
        editor?.layout({ height: 0, width: 0 });
        window.setTimeout(() => {
          editor?.layout({
            height: editorWrapper.value.offsetHeight,
            width: editorWrapper.value.offsetWidth,
          });
        });
      },
    };
  },
});
</script>

<style scoped>
.editorWrapper {
  background-color: white;
}
</style>
