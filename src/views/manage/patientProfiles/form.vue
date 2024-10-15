<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    patient_name: "",
    patient_ethnicity: "",
    mother_name: "",
    mother_age: null,
    mother_ethnicity: "",
    father_name: "",
    father_age: null,
    father_ethnicity: "",
    relative1_title: "",
    relative1_name: "",
    relative1_gender: null,
    relative1_age: null,
    relative1_ethnicity: "",
    relative2_title: "",
    relative2_name: "",
    relative2_gender: null,
    relative2_age: null,
    relative2_ethnicity: "",
    referral_reason: "",
    clinical_presentation: "",
    patient_phone: "",
    patient_id_card: "",
    report_email: "",
    report_receiver: "",
    report_phone: null,
    report_address: "",
    clinical_stage: "",
    clinical_diagnosis: "",
    first_diagnosis_date: "",
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
    label-width="140px"
    :disabled="props.disabled"
  >
    <h2 class="section-title">患者基本信息</h2>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="患者姓名" prop="patient_name">
          <el-input
            v-model="newFormInline.patient_name"
            clearable
            placeholder="请输入患者姓名"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="患者民族" prop="patient_ethnicity">
          <el-input
            v-model="newFormInline.patient_ethnicity"
            clearable
            placeholder="请输入患者民族"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="患者电话" prop="patient_phone">
          <el-input
            v-model="newFormInline.patient_phone"
            placeholder="请输入患者电话"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="患者身份证号" prop="patient_id_card">
      <el-input
        v-model="newFormInline.patient_id_card"
        placeholder="请输入患者身份证号"
      />
    </el-form-item>

    <h2 class="section-title">家庭信息</h2>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="母亲姓名" prop="mother_name">
          <el-input
            v-model="newFormInline.mother_name"
            placeholder="请输入患者母亲姓名"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="母亲年龄" prop="mother_age">
          <el-input
            v-model="newFormInline.mother_age"
            placeholder="请输入患者母亲年龄"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="母亲民族" prop="mother_ethnicity">
          <el-input
            v-model="newFormInline.mother_ethnicity"
            placeholder="请输入患者母亲民族"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="父亲姓名" prop="father_name">
          <el-input
            v-model="newFormInline.father_name"
            placeholder="请输入患者父亲姓名"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="父亲年龄" prop="father_age">
          <el-input
            v-model="newFormInline.father_age"
            placeholder="请输入患者父亲年龄"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="父亲民族" prop="father_ethnicity">
          <el-input
            v-model="newFormInline.father_ethnicity"
            placeholder="请输入患者父亲民族"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <h2 class="section-title">亲属信息</h2>
    <!-- 亲属1信息 -->
    <div class="relative-info">
      <h3>亲属1</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="称谓" prop="relative1_title">
            <el-input
              v-model="newFormInline.relative1_title"
              placeholder="请输入亲属1称谓"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="relative1_name">
            <el-input
              v-model="newFormInline.relative1_name"
              placeholder="请输入亲属1姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" prop="relative1_gender">
            <el-select
              v-model="newFormInline.relative1_gender"
              placeholder="请选择"
            >
              <el-option label="男" value="male" />
              <el-option label="女" value="female" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="年龄" prop="relative1_age">
            <el-input
              v-model="newFormInline.relative1_age"
              placeholder="年龄"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族" prop="relative1_ethnicity">
            <el-input
              v-model="newFormInline.relative1_ethnicity"
              placeholder="民族"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <!-- 亲属2信息 -->
    <div class="relative-info">
      <h3>亲属2</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="称谓" prop="relative2_title">
            <el-input
              v-model="newFormInline.relative2_title"
              placeholder="请输入亲属2称谓"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="relative2_name">
            <el-input
              v-model="newFormInline.relative2_name"
              placeholder="请输入亲属2姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" prop="relative2_gender">
            <el-select
              v-model="newFormInline.relative2_gender"
              placeholder="请选择"
            >
              <el-option label="男" value="male" />
              <el-option label="女" value="female" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="年龄" prop="relative2_age">
            <el-input
              v-model="newFormInline.relative2_age"
              placeholder="年龄"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族" prop="relative2_ethnicity">
            <el-input
              v-model="newFormInline.relative2_ethnicity"
              placeholder="民族"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <h2 class="section-title">临床信息</h2>
    <el-form-item label="送检原因（临床主诉）" prop="referral_reason">
      <el-input
        v-model="newFormInline.referral_reason"
        type="textarea"
        :rows="3"
        placeholder="请输入送检原因（临床主诉）"
      />
    </el-form-item>
    <el-form-item
      label="临床表现（病史、家系信息等）"
      prop="clinical_presentation"
    >
      <el-input
        v-model="newFormInline.clinical_presentation"
        type="textarea"
        :rows="3"
        placeholder="请输入临床表现（病史、家系信息等）"
      />
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="肿瘤类型" prop="clinical_stage">
          <el-input
            v-model="newFormInline.clinical_stage"
            placeholder="请输入肿瘤类型"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="临床病理诊断" prop="clinical_diagnosis">
          <el-input
            v-model="newFormInline.clinical_diagnosis"
            placeholder="请输入临床病理诊断"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="初次确诊时间" prop="first_diagnosis_date">
      <el-date-picker
        v-model="newFormInline.first_diagnosis_date"
        type="date"
        placeholder="请选择初次确诊时间"
      />
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="原发部位" prop="primary_site">
          <el-input
            v-model="newFormInline.primary_site"
            placeholder="请输入原发部位"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="转移部位" prop="metastasis_site">
          <el-input
            v-model="newFormInline.metastasis_site"
            placeholder="请输入转移部位"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="实验室" prop="lab">
      <el-select
        v-model="newFormInline.lab"
        placeholder="请选择实验室"
        clearable
        class="w-[180px]"
      >
        <el-option
          v-for="item in props.libsList"
          :key="item.id"
          :label="item.lab_name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>

    <h2 class="section-title">报告接收信息</h2>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="报告接收邮箱" prop="report_email">
          <el-input
            v-model="newFormInline.report_email"
            placeholder="请输入报告接收邮箱"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="报告接收人姓名" prop="report_receiver">
          <el-input
            v-model="newFormInline.report_receiver"
            placeholder="请输入报告接收人姓名"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="报告接收电话" prop="report_phone">
          <el-input
            v-model="newFormInline.report_phone"
            placeholder="请输入报告接收电话"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="报告接收地址" prop="report_address">
          <el-input
            v-model="newFormInline.report_address"
            placeholder="请输入报告接收地址"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>
.section-title {
  padding-bottom: 8px;
  margin: 24px 0 16px;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  border-bottom: 1px solid #ebeef5;
}

.el-form-item {
  margin-bottom: 18px;
}

.relative-info {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}

.relative-info:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.relative-info h3 {
  margin-bottom: 15px;
  font-size: 16px;
  color: #606266;
}
</style>
