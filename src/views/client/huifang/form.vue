<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    code: "",
    remark: "",
    account_id: "",
    phone_number: "",
    start_time: "",
    end_time: "",
    state: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="账户" prop="account_id">
      <el-input
        v-model="newFormInline.account_id"
        clearable
        placeholder="请输入账户"
      />
    </el-form-item>

    <el-form-item label="手机号" prop="phone_number">
      <el-input
        v-model="newFormInline.phone_number"
        clearable
        placeholder="请输入手机号"
      />
    </el-form-item>

    <el-form-item label="开始时间" prop="start_time">
      <el-date-picker
        v-model="newFormInline.start_time"
        type="datetime"
        placeholder="选择开始时间"
      />
    </el-form-item>

    <el-form-item label="截止时间" prop="end_time">
      <el-date-picker
        v-model="newFormInline.end_time"
        type="datetime"
        placeholder="选择截止时间"
      />
    </el-form-item>

    <el-form-item label="状态" prop="state">
      <el-select v-model="newFormInline.state" placeholder="请选择状态">
        <el-option label="待处理" value="1" />
        <el-option label="已过期" value="2" />
        <el-option label="已达标" value="3" />
        <el-option label="不达标" value="4" />
      </el-select>
    </el-form-item>

    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        type="textarea"
        placeholder="请输入备注信息"
      />
    </el-form-item>
  </el-form>
</template>
