<script setup lang="ts">
import { useRole } from "./utils/hook";
import { ref, onMounted } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { deviceDetection } from "@pureadmin/utils";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";

defineOptions({
  name: "SystemRole"
});

const formRef = ref();
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
  handleSortChange,
  libsList,
  productsCategoryList
} = useRole();

onMounted(() => {});
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="项目搜索" prop="project">
        <el-input
          v-model="form.project"
          placeholder="请输入项目名称或临床应用"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="实验室：" prop="libs">
        <el-select
          v-model="form.libs"
          placeholder="请选择实验室"
          clearable
          class="!w-[180px]"
        >
          <el-option
            v-for="item in libsList"
            :key="item.id"
            :label="item.lab_name"
            :value="item.id"
          />
          <el-option label="已停用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目类别：" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择项目类别"
          clearable
          class="!w-[180px]"
        >
          <el-option
            v-for="item in productsCategoryList"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          />
        </el-select>
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
        <!-- <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog()"
          >
            新增角色
          </el-button>
        </template> -->
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
              <!-- <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog(false, row)"
              >
                修改
              </el-button> -->
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon('basil:eye-solid')"
                @click="openDialog(true, row)"
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
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
