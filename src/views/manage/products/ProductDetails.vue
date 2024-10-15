<script setup lang="ts">
import { FormItemProps } from "./utils/types";

const props = defineProps<{
  product: FormItemProps;
  libsList: any[];
  productsCategoryList: any[];
  settlementChannelList: any[];
}>();

function getLabName(id: string) {
  return props.libsList.find(lab => lab.id === id)?.lab_name || "Unknown";
}

function getCategoryName(id: string) {
  return (
    props.productsCategoryList.find(category => category.id === id)
      ?.category_name || "Unknown"
  );
}

function getChannelName(id: string) {
  return (
    props.settlementChannelList.find(channel => channel.id === id)
      ?.channel_name || "Unknown"
  );
}

function formatText(text: string | null) {
  return text ? text.replace(/\n/g, "<br>") : "";
}
</script>

<template>
  <div class="product-details">
    <h2 class="product-title">{{ product.product_name }}</h2>

    <el-descriptions :column="2" border>
      <el-descriptions-item label="检测机构">{{
        getLabName(product.product_lab)
      }}</el-descriptions-item>
      <el-descriptions-item label="检测方法">{{
        product.method
      }}</el-descriptions-item>
      <el-descriptions-item label="报告周期">{{
        product.report_cycle
      }}</el-descriptions-item>
      <el-descriptions-item label="标准收费">{{
        product.standard_charge
      }}</el-descriptions-item>
      <el-descriptions-item label="样本要求" :span="2">
        <div v-html="formatText(product.sample_req)" />
      </el-descriptions-item>
      <el-descriptions-item label="运输保存" :span="2">
        <div v-html="formatText(product.transport_storage)" />
      </el-descriptions-item>
      <el-descriptions-item label="临床应用" :span="2">
        <div v-html="formatText(product.clinical_app)" />
      </el-descriptions-item>
      <el-descriptions-item label="备注" :span="2">
        <div v-html="formatText(product.remark)" />
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.product-details {
  max-width: 800px;
  padding: 20px;
  margin: 0 auto;
}

.product-title {
  margin-bottom: 20px;
  font-size: 20px;
  color: #303133;
  text-align: center;
}

.el-descriptions {
  font-size: 14px;
}

.el-descriptions :deep(.el-descriptions__label) {
  width: 100px;
  padding: 12px 10px;
  font-weight: bold;
  line-height: 1.5;
  background-color: #f5f7fa;
}

.el-descriptions :deep(.el-descriptions__content) {
  padding: 12px 10px;
  line-height: 1.5;
  word-break: break-word;
}
</style>
