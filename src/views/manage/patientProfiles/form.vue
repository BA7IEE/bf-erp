<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    patient_name: "",
    patient_gender: null, // 添加患者性别字段
    patient_ethnicity: "",
    mother_name: "",
    mother_age: null, // 更新为 null
    patient_age: null,
    mother_ethnicity: "",
    father_name: "",
    father_age: null, // 更新为 null
    father_ethnicity: "",
    relative1_title: "",
    relative1_name: "",
    relative1_gender: null,
    relative1_age: null, // 更新为 null
    relative1_ethnicity: "",
    relative2_title: "",
    relative2_name: "",
    relative2_gender: null,
    relative2_age: null, // 更新为 null
    relative2_ethnicity: "",
    referral_reason: "",
    clinical_presentation: "",
    patient_phone: "",
    patient_id_card: "",
    report_email: "",
    report_receiver: "",
    report_phone: null, // 更新为 null
    report_address: "",
    clinical_stage: "",
    tumor_type: "",
    clinical_diagnosis: "",
    first_diagnosis_date: null,
    primary_site: "",
    metastasis_site: "",
    lab: ""
  }),
  libsList: () => [],
  disabled: false
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
    label-width="100px"
    :disabled="props.disabled"
    class="patient-profile-form"
  >
    <h2 class="section-title">患者基本信息</h2>
    <el-row :gutter="16">
      <!-- 行间距从 20 调整为 16 -->
      <el-col :span="8">
        <el-form-item label="姓名" prop="patient_name">
          <el-input v-model="newFormInline.patient_name" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="性别" prop="patient_gender">
          <el-select v-model="newFormInline.patient_gender" class="w-full">
            <el-option label="未知" :value="0" />
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年龄" prop="patient_age">
          <el-input v-model="newFormInline.patient_age" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="8">
        <el-form-item label="民族" prop="patient_ethnicity">
          <el-input v-model="newFormInline.patient_ethnicity" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="电话" prop="patient_phone">
          <el-input v-model="newFormInline.patient_phone" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="身份证号" prop="patient_id_card">
          <el-input v-model="newFormInline.patient_id_card" />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 父母信息 -->
    <el-row :gutter="16">
      <el-col :span="8">
        <el-form-item label="母亲姓名" prop="mother_name">
          <el-input v-model="newFormInline.mother_name" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="母亲年龄" prop="mother_age">
          <el-input v-model="newFormInline.mother_age" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="母亲民族" prop="mother_ethnicity">
          <el-input v-model="newFormInline.mother_ethnicity" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="8">
        <el-form-item label="父亲姓名" prop="father_name">
          <el-input v-model="newFormInline.father_name" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="父亲年龄" prop="father_age">
          <el-input v-model="newFormInline.father_age" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="父亲民族" prop="father_ethnicity">
          <el-input v-model="newFormInline.father_ethnicity" clearable />
        </el-form-item>
      </el-col>
    </el-row>

    <h2 class="section-title">亲属信息</h2>
    <!-- 亲属1信息 -->
    <div class="relative-info">
      <h3>亲属1</h3>
      <el-row :gutter="8">
        <el-col :span="5">
          <el-form-item label="称谓" prop="relative1_title">
            <el-input v-model="newFormInline.relative1_title" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="姓名" prop="relative1_name">
            <el-input v-model="newFormInline.relative1_name" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="性别" prop="relative1_gender">
            <el-select v-model="newFormInline.relative1_gender" class="w-full">
              <el-option label="未知" :value="0" />
              <el-option label="男" :value="1" />
              <el-option label="女" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="年龄" prop="relative1_age">
            <el-input v-model="newFormInline.relative1_age" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="民族" prop="relative1_ethnicity">
            <el-input v-model="newFormInline.relative1_ethnicity" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <!-- 亲属2信息 -->
    <div class="relative-info">
      <h3>亲属2</h3>
      <el-row :gutter="8">
        <el-col :span="5">
          <el-form-item label="称谓" prop="relative2_title">
            <el-input v-model="newFormInline.relative2_title" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="姓名" prop="relative2_name">
            <el-input v-model="newFormInline.relative2_name" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="性别" prop="relative2_gender">
            <el-select v-model="newFormInline.relative2_gender" class="w-full">
              <el-option label="未知" :value="0" />
              <el-option label="男" :value="1" />
              <el-option label="女" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="年龄" prop="relative2_age">
            <el-input v-model="newFormInline.relative2_age" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="民族" prop="relative2_ethnicity">
            <el-input v-model="newFormInline.relative2_ethnicity" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <h2 class="section-title">临床信息</h2>
    <el-form-item label="送检原因" prop="referral_reason">
      <el-input
        v-model="newFormInline.referral_reason"
        type="textarea"
        :rows="3"
      />
    </el-form-item>
    <el-form-item label="临床表现" prop="clinical_presentation">
      <el-input
        v-model="newFormInline.clinical_presentation"
        type="textarea"
        :rows="3"
      />
    </el-form-item>
    <el-row :gutter="16">
      <el-col :span="6">
        <el-form-item label="类型" prop="tumor_type">
          <el-input v-model="newFormInline.tumor_type" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="分期" prop="clinical_stage">
          <el-input v-model="newFormInline.clinical_stage" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="初次确诊" prop="first_diagnosis_date">
          <el-date-picker
            v-model="newFormInline.first_diagnosis_date"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="原发部位" prop="primary_site">
          <el-input v-model="newFormInline.primary_site" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="转移部位" prop="metastasis_site">
          <el-input v-model="newFormInline.metastasis_site" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="病理诊断" prop="clinical_diagnosis">
      <el-input
        v-model="newFormInline.clinical_diagnosis"
        type="textarea"
        :rows="3"
        placeholder="请输入病理诊断"
      />
    </el-form-item>

    <h2 class="section-title">报告接收信息</h2>
    <el-row :gutter="16">
      <el-col :span="12">
        <el-form-item label="接收邮箱" prop="report_email">
          <el-input v-model="newFormInline.report_email" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="接收姓名" prop="report_receiver">
          <el-input v-model="newFormInline.report_receiver" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="12">
        <el-form-item label="接收电话" prop="report_phone">
          <el-input v-model="newFormInline.report_phone" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="接收地址" prop="report_address">
          <el-input v-model="newFormInline.report_address" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>
.patient-profile-form {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  padding-bottom: 8px;
  margin: 20px 0 12px;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  border-bottom: 2px solid #409eff;
}

.el-form-item {
  margin-bottom: 8px;
}

.relative-info {
  padding: 12px;
  margin-bottom: 16px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.relative-info h3 {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #606266;
}

/* 统一输入框和选择框样式 */
.el-input,
.el-select,
.el-date-editor.el-input {
  width: 100% !important;
}

.el-row {
  margin-bottom: 0;
}

/* 调整表单项label和内容的对齐 */
.el-form-item__label {
  padding-right: 4px;
  font-size: 14px;
}

.el-form-item__content {
  margin-left: 100px !important; /* 调整为与 label-width 相同 */
}

/* 统一输入框内边距 */
.el-input__inner,
.el-select .el-input__inner {
  padding-right: 8px;
  padding-left: 8px;
}

.el-textarea__inner {
  font-family: inherit;
}

/* 可能需要调整的其他样式 */
</style>
