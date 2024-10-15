export default {
  path: "/manage",
  redirect: "/manage/products",
  meta: {
    icon: "ri:information-line",
    title: "项目管理",
    rank: 1
  },
  children: [
    {
      path: "/manage/products",
      name: "检验项目",
      component: () => import("@/views/manage/products/index.vue"),
      meta: {
        title: "检验项目"
      }
    },
    {
      path: "/manage/jyxbd",
      name: "金域百度",
      component: () => import("@/views/manage/jyxbd/index.vue"),
      meta: {
        title: "金域百度"
      }
    },
    {
      path: "/manage/patientProfiles",
      name: "患者档案",
      component: () => import("@/views/manage/patientProfiles/index.vue"),
      meta: {
        title: "患者档案"
      }
    }
  ]
} satisfies RouteConfigsTable;
