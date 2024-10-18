<script setup lang="ts">
// 导入所需的Vue组件和工具函数
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import dayjs from "dayjs";

// 定义组件的属性，并设置默认值
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    name: "",
    code: "",
    remark: "",
    account_id: "",
    phone_number: "",
    start_time: "",
    end_time: "",
    state: ""
  }),
  accountOptions: () => [],
  stateOptions: () => []
});

// 创建一个响应式引用，用于表单验证
const ruleFormRef = ref();
// 创建一个响应式引用，用于存储表单数据
const newFormInline = ref(props.formInline);

// 定义一个函数，用于获取表单引用
function getRef() {
  return ruleFormRef.value;
}

// 将 getRef 函数暴露给父组件
defineExpose({ getRef });

function handleTimeInput(field: "start_time" | "end_time") {
  const input = newFormInline.value[field];
  const regex = /【(\d{2}-\d{2} \d{2}:\d{2}:\d{2})】/;
  const match = input.match(regex);

  if (match) {
    const dateTime = match[1];
    const currentYear = dayjs().year();
    const fullDateTime = `${currentYear}-${dateTime}`;
    newFormInline.value[field] = dayjs(fullDateTime).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  }
}
</script>

<template>
  <!-- 创建一个表单，绑定验证规则和数据模型 -->
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <!-- 账户输入框 -->
    <el-form-item label="账户" prop="account_id">
      <el-select v-model="newFormInline.account_id" placeholder="请选择账户">
        <el-option
          v-for="option in accountOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </el-form-item>

    <!-- 手机号输入框 -->
    <el-form-item label="手机号" prop="phone_number">
      <el-input
        v-model="newFormInline.phone_number"
        clearable
        placeholder="请输入手机号"
      />
    </el-form-item>

    <!-- 开始时间选择器 -->
    <el-form-item label="开始时间" prop="start_time">
      <el-input
        v-model="newFormInline.start_time"
        placeholder="请输入开始时间,例如:【10-19 02:53:41】"
        @input="handleTimeInput('start_time')"
      />
    </el-form-item>

    <!-- 截止时间选择器 -->
    <el-form-item label="截止时间" prop="end_time">
      <el-input
        v-model="newFormInline.end_time"
        placeholder="请输入截止时间,例如:【10-19 02:53:41】"
        @input="handleTimeInput('end_time')"
      />
    </el-form-item>

    <!-- 状态选择下拉框 -->
    <el-form-item label="状态" prop="state">
      <el-select v-model="newFormInline.state" placeholder="请选择状态">
        <el-option
          v-for="option in stateOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
