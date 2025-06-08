/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 **/
import { contextBridge, ipcRenderer } from 'electron';

let messageCallback = null;

// Listen for MQTT messages from main process
ipcRenderer.on('mqtt-message', (event, topic, message) => {
  if (messageCallback) {
    messageCallback(topic, message);
  }
});

// Listen for MQTT status changes from main process
ipcRenderer.on('mqtt-status', (event, status) => {
  if (messageCallback) {
    messageCallback(null, status);
  }
});

contextBridge.exposeInMainWorld('mqtt', {
  connect: async (payload, callback) => {
    messageCallback = callback;
    try {
      const result = await ipcRenderer.invoke('mqtt-connect', payload);
      return result;
    } catch (error) {
      console.error('Preload: connect error:', error);
      throw error;
    }
  },
  disconnect: async () => {
    messageCallback = null;
    try {
      const result = await ipcRenderer.invoke('mqtt-disconnect');
      return result;
    } catch (error) {
      console.error('Preload: disconnect error:', error);
      throw error;
    }
  },
  publish: async (topic, message, options) => {
    try {
      const result = await ipcRenderer.invoke('mqtt-publish', topic, message, options);
      return result;
    } catch (error) {
      console.error('Preload: publish error:', error);
      throw error;
    }
  },
});
