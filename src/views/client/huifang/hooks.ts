// 抽离可公用的工具函数等用于系统管理页面逻辑
import { computed } from "vue"; // 从 Vue 导入 computed 函数，用于创建计算属性
import { useDark } from "@pureadmin/utils"; // 从 @pureadmin/utils 导入 useDark 函数，用于获取当前主题模式（暗黑模式或亮色模式）

// 定义一个名为 usePublicHooks 的函数，供其他组件使用
export function usePublicHooks() {
  // 使用 useDark 函数获取当前是否为暗黑模式的状态
  const { isDark } = useDark();

  // 创建一个计算属性 switchStyle，用于定义 el-switch 组件的样式
  const switchStyle = computed(() => {
    return {
      "--el-switch-on-color": "#6abe39", // 开启状态的颜色
      "--el-switch-off-color": "#e84749" // 关闭状态的颜色
    };
  });

  // 创建一个计算属性 tagStyle，用于根据状态返回 el-tag 组件的样式
  const tagStyle = computed(() => {
    return (status: number) => {
      // 接收一个状态参数
      return status === 1 // 如果状态为 1
        ? {
            "--el-tag-text-color": isDark.value ? "#6abe39" : "#389e0d",
            "--el-tag-bg-color": isDark.value ? "#172412" : "#f6ffed",
            "--el-tag-border-color": isDark.value ? "#274a17" : "#b7eb8f"
          }
        : {
            "--el-tag-text-color": isDark.value ? "#e84749" : "#cf1322",
            "--el-tag-bg-color": isDark.value ? "#2b1316" : "#fff1f0",
            "--el-tag-border-color": isDark.value ? "#58191c" : "#ffa39e"
          };
    };
  });

  // 返回一个对象，包含当前网页是否为暗黑模式的状态和两个计算属性
  return {
    /** 当前网页是否为`dark`模式 */
    isDark,
    /** 表现更鲜明的`el-switch`组件  */
    switchStyle,
    /** 表现更鲜明的`el-tag`组件  */
    tagStyle
  };
}
