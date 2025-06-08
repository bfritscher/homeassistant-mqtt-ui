<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">About</div>
    <div class="text-body1">
      Home Assistant MQTT UI is a small app to help configure custom MQTT devices for Home
      Assistant. Instead of creating a template you can use this app to publish a retained message
      to Home Assistant's MQTT Discovery topic. This allows to define sensors and other entities to
      a device, which is not supported via template. The app has three main features:
      <ul>
        <li class="q-my-md">
          <b>MQTT Explorer*</b> - allows to explore MQTT topics specific to home assistant.
          Currently it knows about Home Assistant Discovery, Tasmota and Zigbee2MQTT. It can be used
          to explore and edit existing entries.
        </li>
        <li class="q-my-md">
          <b>Home Assistant Discovery Generator</b> - Helps in the creation of the Discovery message
          payload. Currently it has validation for <em>Sensor entities</em>.
        </li>
        <li class="q-my-md">
          <b>Tasmota ZB Bridge*</b> - Special feature to automatically detect Sonoff Zigbee Bridge
          (ZB Bridge) flashed with Tasmota. It can then help configure the device and automatically
          create the discovery message for Sonoff's SNZB-02 sensors (TH01).
          <ol>
            <li>Detect and configure Bridge</li>
            <li>Generate Discovery Config</li>
            <li>Publish All</li>
          </ol>
        </li>
      </ul>
      <small>* requires Desktop Version to connect to MQTT </small>
      <p>
        <a href="https://github.com/bfritscher/homeassistant-mqtt-ui/releases" target="_blank"
          >Latest version available on GitHub</a
        >
      </p>
    </div>
    <div class="text-h5 q-mt-md">Other resources</div>
    <ul>
      <li>
        <a href="https://github.com/bfritscher/homeassistant-mqtt-ui/" target="_blank"
          >Source Code on GitHub</a
        >
      </li>
      <li>
        <a href="https://www.home-assistant.io/docs/mqtt/discovery/" target="_blank"
          >Home Assistant - MQTT Discovery</a
        >
      </li>
      <li>
        <a href="https://test.mosquitto.org/" target="_blank">MQTT Test server</a>
      </li>
      <li>
        <a href="https://zigbee.blakadder.com/Sonoff_ZBBridge.html" target="_blank"
          >Sonoff Zigbee Bridge (ZB Bridge) flash instructions</a
        >
      </li>
      <li>
        <a href="https://tasmota.github.io/docs/Commands/#zigbee" target="_blank"
          >Tasmota ZigBee Commands</a
        >
      </li>
    </ul>
  </q-page>
</template>

<script setup></script>
