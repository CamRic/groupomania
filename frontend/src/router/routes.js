const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/topic/:id", component: () => import("pages/TopicPage.vue") },
      { path: "/login", component: () => import("pages/LoginPage.vue") },
      { path: "/user", component: () => import("pages/UserPage.vue") },
      {
        path: "/newtopic",
        component: () => import("pages/CreateTopicPage.vue"),
      },
      {
        path: "/modifyTopic/:id",
        component: () => import("pages/ModifyTopicPage.vue"),
      },
      { path: "/admin", component: () => import("pages/AdminPage.vue") },
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
