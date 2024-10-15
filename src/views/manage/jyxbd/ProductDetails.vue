<script setup lang="ts">
import { FormItemProps } from "./utils/types";

const props = defineProps<{
  product: FormItemProps;
}>();

function formatText(text: string | null) {
  return text ? text.replace(/\n/g, "<br>") : "";
}
</script>

<template>
  <div class="product-details">
    <h2 class="product-title">{{ product.product_name }}</h2>

    <el-descriptions :column="1" border>
      <el-descriptions-item label="子公司">{{
        product.subsidiary
      }}</el-descriptions-item>
      <el-descriptions-item label="所属科室">{{
        product.projectConcourse
      }}</el-descriptions-item>
      <el-descriptions-item label="检测方法">{{
        product.medicalMethod
      }}</el-descriptions-item>
      <el-descriptions-item label="标准收费">{{
        product.tollStandard
      }}</el-descriptions-item>
      <el-descriptions-item label="报告时间">{{
        product.reportingTime
      }}</el-descriptions-item>
      <el-descriptions-item label="加急部门">{{
        product.hurryDepartment
      }}</el-descriptions-item>
      <el-descriptions-item label="系列">{{
        product.series
      }}</el-descriptions-item>
      <el-descriptions-item label="子系列">{{
        product.subSeries
      }}</el-descriptions-item>
      <el-descriptions-item label="补充说明">
        <div v-html="formatText(product.supplement)" />
      </el-descriptions-item>
      <el-descriptions-item label="样本类型">{{
        product.sample
      }}</el-descriptions-item>
      <el-descriptions-item label="送检培训">
        <div v-html="formatText(product.tutorial)" />
      </el-descriptions-item>
      <el-descriptions-item label="保存方法">
        <div v-html="formatText(product.preservation)" />
      </el-descriptions-item>
      <el-descriptions-item label="运输方法">
        <div v-html="formatText(product.transportation)" />
      </el-descriptions-item>
      <el-descriptions-item label="申请单类型">{{
        product.applicationUnitType
      }}</el-descriptions-item>
      <el-descriptions-item label="临床应用">
        <div v-html="formatText(product.clinicalApplication)" />
      </el-descriptions-item>
      <el-descriptions-item label="备注">
        <div v-html="formatText(product.remarks)" />
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
