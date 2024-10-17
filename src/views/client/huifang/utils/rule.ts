import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive<FormRules>({
  account_id: [{ required: true, message: "账户为必填项", trigger: "change" }],
  phone_number: [
    { required: true, message: "手机号为必填项", trigger: "blur" }
  ],
  state: [{ required: true, message: "状态为必填项", trigger: "change" }]
});
