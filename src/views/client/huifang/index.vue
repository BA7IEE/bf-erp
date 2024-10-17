<script setup lang="ts">
// 导入所需的组件和函数
import { useRole } from "./utils/hook";
import { ref, computed, nextTick, onMounted } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import {
  delay,
  subBefore,
  deviceDetection,
  useResizeObserver
} from "@pureadmin/utils";

// 导入图标组件
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";
import Menu from "@iconify-icons/ep/menu";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Close from "@iconify-icons/ep/close";
import Check from "@iconify-icons/ep/check";

// 定义组件选项
defineOptions({
  name: "SystemRole"
});

// 计算属性：定义图标的样式类
const iconClass = computed(() => {
  return [
    "w-[22px]",
    "h-[22px]",
    "flex",
    "justify-center",
    "items-center",
    "outline-none",
    "rounded-[4px]",
    "cursor-pointer",
    "transition-colors",
    "hover:bg-[#0000000f]",
    "dark:hover:bg-[#ffffff1f]",
    "dark:hover:text-[#ffffffd9]"
  ];
});

// 创建响应式引用
const treeRef = ref();
const formRef = ref();
const tableRef = ref();
const contentRef = ref();
const treeHeight = ref();

// 使用 useRole hook 获取所需的数据和方法
const {
  form,
  isShow,
  curRow,
  loading,
  columns,
  rowStyle,
  dataList,
  isLinkage,
  pagination,
  isExpandAll,
  isSelectAll,
  treeSearchValue,
  accountOptions,
  onSearch,
  resetForm,
  openDialog,
  handleSave,
  handleDelete,
  onQueryChanged,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange
} = useRole(treeRef);

// 组件挂载后执行的操作
onMounted(() => {
  // 执行搜索操作
  onSearch();
  // 监听内容区域大小变化，调整树形控件高度
  useResizeObserver(contentRef, async () => {
    await nextTick();
    delay(60).then(() => {
      treeHeight.value = parseFloat(
        subBefore(tableRef.value.getTableDoms().tableWrapper.style.height, "px")
      );
    });
  });
});
</script>

<template>
  <div class="main">
    <!-- 搜索表单 -->
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <!-- 账户选择 -->
      <el-form-item label="账户：" prop="account_id">
        <el-select
          v-model="form.account_id"
          placeholder="请选择账户"
          clearable
          class="!w-[180px]"
        >
          <el-option
            v-for="option in accountOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
      <!-- 手机号输入 -->
      <el-form-item label="手机号：" prop="phone_number">
        <el-input
          v-model="form.phone_number"
          placeholder="请输入手机号"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <!-- 状态选择 -->
      <el-form-item label="状态：" prop="state">
        <el-select
          v-model="form.state"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="待处理" value="1" />
          <el-option label="已过期" value="2" />
          <el-option label="已达标" value="3" />
          <el-option label="不达标" value="4" />
        </el-select>
      </el-form-item>
      <!-- 搜索和重置按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 内容区域 -->
    <div
      ref="contentRef"
      :class="['flex', deviceDetection() ? 'flex-wrap' : '']"
    >
      <!-- 表格区域 -->
      <PureTableBar
        :class="[isShow && !deviceDetection() ? '!w-[60vw]' : 'w-full']"
        style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
        title="客户回访管理"
        :columns="columns"
        @refresh="onSearch"
      >
        <!-- 新增按钮 -->
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog()"
          >
            新增
          </el-button>
        </template>
        <!-- 表格主体 -->
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            ref="tableRef"
            align-whole="center"
            showOverflowTooltip
            table-layout="auto"
            :loading="loading"
            :size="size"
            adaptive
            :row-style="rowStyle"
            :adaptiveConfig="{ offsetBottom: 108 }"
            :data="dataList"
            :columns="dynamicColumns"
            :pagination="{ ...pagination, size }"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @selection-change="handleSelectionChange"
            @page-size-change="handleSizeChange"
            @page-current-change="handleCurrentChange"
          >
            <!-- 操作列 -->
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog('修改', row)"
              >
                修改
              </el-button>
              <el-popconfirm
                :title="`是否确认删除${row.phone_number}这条数据`"
                @confirm="handleDelete(row)"
              >
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 下拉菜单样式 */
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

/* 主内容区域样式 */
.main-content {
  margin: 24px 24px 0 !important;
}

/* 搜索表单样式 */
.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
