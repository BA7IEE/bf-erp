<script setup lang="ts">
import { useRole } from "./utils/hook";
import { ref, onMounted } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { deviceDetection } from "@pureadmin/utils";
import type { FormInstance } from "element-plus";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";

defineOptions({
  name: "SystemRole"
});

const formRef = ref<FormInstance>();
const tableRef = ref();
const contentRef = ref();

const {
  form,
  isShow,
  loading,
  columns,
  rowStyle,
  dataList,
  pagination,
  onSearch,
  resetForm,
  openDialog,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  handleSortChange
} = useRole();

onMounted(() => {});
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] pb-[12px] overflow-auto"
    >
      <el-form-item label="项目搜索" prop="project">
        <el-input
          v-model="form.project"
          placeholder="请输入项目名称或临床应用"
          clearable
          class="!w-[280px]"
        />
      </el-form-item>
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

    <div
      ref="contentRef"
      :class="['flex', deviceDetection() ? 'flex-wrap' : '']"
    >
      <PureTableBar
        :class="[isShow && !deviceDetection() ? '!w-[60vw]' : 'w-full']"
        style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
        title="检验项目"
        :columns="columns"
        @refresh="onSearch"
      >
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            ref="tableRef"
            border
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
            @sort-change="handleSortChange"
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon('basil:eye-solid')"
                @click="openDialog(row)"
              >
                详情
              </el-button>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  display: flex;
  align-items: center;

  :deep(.el-form-item) {
    margin-right: 16px;
    margin-bottom: 0;
  }

  :deep(.el-form-item__content) {
    display: flex;
    align-items: center;
  }
}

.button-group {
  display: flex;
  gap: 10px; /* 添加间距 */
  margin-top: 12px; /* 添加顶部间距 */
}
</style>
