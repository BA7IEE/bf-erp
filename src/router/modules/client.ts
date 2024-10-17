export default {
  path: "/manage",
  redirect: "/client/huifang",
  meta: {
    icon: "ri:information-line",
    title: "项目管理",
    rank: 1
  },
  children: [
    {
      path: "/client/huifang",
      name: "回访管理",
      component: () => import("@/views/client/huifang/index.vue"),
      meta: {
        title: "回访管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
