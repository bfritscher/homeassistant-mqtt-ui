const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AboutPage.vue") },
      { path: "mqtt", component: () => import("pages/MQTTExplorer.vue") },
      {
        path: "tasmota-zb-bridge",
        component: () => import("pages/TasmotaZBBridge.vue"),
      },
      {
        path: "discovery-generator",
        component: () => import("pages/DiscoveryGenerator.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
