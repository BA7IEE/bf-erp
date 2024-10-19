<script setup lang="ts">
defineOptions({
  name: "Welcome"
});

function goToJinYuZhongliu() {
  window.open("https://web.23cc.cn/jyzn/jyzn.html", "_blank");
}

function goToJinYuZhongliuID() {
  window.open("https://web.23cc.cn/jyzn-id/jyzn-id.html", "_blank");
}

function goToJinYuYichuanID() {
  window.open("https://web.23cc.cn/jyyc-id/jyyc-id.html", "_blank");
}
</script>

<template>
  <div class="quick-access">
    <button class="btn btn-primary" @click="goToJinYuZhongliu">
      金域肿瘤申请单
    </button>
    <button class="btn btn-secondary" @click="goToJinYuZhongliuID">
      金域肿瘤申请单ID版
    </button>
    <button class="btn btn-success" @click="goToJinYuYichuanID">
      金域遗传申请单ID版
    </button>
  </div>
</template>

<style scoped>
.quick-access {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

/* 基础按钮样式 */
.quick-access .btn {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

/* 主按钮样式 */
.quick-access .btn-primary {
  background-color: #007bff;
}

.quick-access .btn-primary:hover {
  background-color: #0069d9;
}

/* 次级按钮样式 */
.quick-access .btn-secondary {
  background-color: #6c757d;
}

.quick-access .btn-secondary:hover {
  background-color: #5a6268;
}

/* 成功按钮样式 */
.quick-access .btn-success {
  background-color: #28a745;
}

.quick-access .btn-success:hover {
  background-color: #218838;
}
</style>
