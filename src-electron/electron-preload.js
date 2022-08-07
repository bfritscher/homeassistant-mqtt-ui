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
import { contextBridge } from "electron";
import mqtt from "mqtt";

let mqttClient;

contextBridge.exposeInMainWorld("mqtt", {
  connect: (payload, callback) => {
    mqttClient = mqtt.connect(payload.url, {
      username: payload.username,
      password: payload.password,
      rejectUnauthorized: false,
    });
    mqttClient.on("message", (topic, message) => {
      callback(topic, message.toString());
    });
    mqttClient.on("connect", () => {
      callback(null, { connected: true });
      mqttClient.subscribe("#");
    });
    mqttClient.on("error", (error) => {
      callback(null, { error });
    });
    mqttClient.on("close", () => {
      callback(null, { connected: false });
    });
    mqttClient.on("end", () => {
      callback(null, { connected: false });
    });
  },
  disconnect: () => {
    if (mqttClient) {
      mqttClient.end();
    }
  },
  publish: (topic, message, options) => {
    if (mqttClient) {
      mqttClient.publish(topic, message, options);
    }
  },
});
