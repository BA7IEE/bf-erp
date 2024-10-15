<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    product_name: "",
    product_code: "",
    method: "",
    sample_req: "",
    transport_storage: "",
    clinical_app: "",
    report_cycle: "",
    standard_charge: "",
    remark: "",
    settlement_price: null,
    settlement_desc: "",
    settlement_channel: "",
    product_category: "",
    product_lab: ""
  }),
  productsCategoryList: () => [],
  libsList: () => [],
  settlementChannelList: () => [],
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
    label-width="120px"
    :disabled="props.disabled"
    class="product-form"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="项目名称" prop="product_name">
          <el-input
            v-model="newFormInline.product_name"
            clearable
            placeholder="请输入项目名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目代码" prop="product_code">
          <el-input
            v-model="newFormInline.product_code"
            clearable
            placeholder="请输入项目代码"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="项目类别" prop="product_category">
          <el-select
            v-model="newFormInline.product_category"
            placeholder="请选择项目类别"
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="item in props.productsCategoryList"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="检测机构" prop="product_lab">
          <el-select
            v-model="newFormInline.product_lab"
            placeholder="请选择检测机构"
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="item in props.libsList"
              :key="item.id"
              :label="item.lab_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider>基本信息</el-divider>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="检测方法" prop="method">
          <el-input
            v-model="newFormInline.method"
            placeholder="请输入检测方法"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="样本要求" prop="sample_req">
          <el-input
            v-model="newFormInline.sample_req"
            placeholder="请输入样本要求"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="运输保存" prop="transport_storage">
          <el-input
            v-model="newFormInline.transport_storage"
            placeholder="请输入运输保存"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="临床应用" prop="clinical_app">
          <el-input
            v-model="newFormInline.clinical_app"
            placeholder="请输入临床应用"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="报告周期" prop="report_cycle">
          <el-input
            v-model="newFormInline.report_cycle"
            placeholder="请输入报告周期"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="标准收费" prop="standard_charge">
          <el-input
            v-model="newFormInline.standard_charge"
            placeholder="请输入标准收费"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider>结算信息</el-divider>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="结算价格" prop="settlement_price">
          <el-input
            v-model="newFormInline.settlement_price"
            placeholder="请输入结算价格"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="结算说明" prop="settlement_desc">
          <el-input
            v-model="newFormInline.settlement_desc"
            placeholder="请输入结算说明"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="结算渠道" prop="settlement_channel">
          <el-select
            v-model="newFormInline.settlement_channel"
            placeholder="请选择结算渠道"
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="item in props.settlementChannelList"
              :key="item.id"
              :label="item.channel_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="newFormInline.remark"
            placeholder="请输入备注"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>
.product-form {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.el-form-item {
  margin-bottom: 20px;
}

.form-actions {
  margin-top: 20px;
}
</style>
