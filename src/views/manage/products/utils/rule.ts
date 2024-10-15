import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  product_name: [
    { required: true, message: "项目名称为必填项", trigger: "blur" }
  ],
  product_code: [
    { required: true, message: "项目代码为必填项", trigger: "blur" }
  ],
  method: [{ required: true, message: "检测方法必填项", trigger: "blur" }],
  sample_req: [{ required: true, message: "样本要求必填项", trigger: "blur" }],
  transport_storage: [
    { required: true, message: "运输保存必填项", trigger: "blur" }
  ],
  clinical_app: [
    { required: true, message: "临床应用必填项", trigger: "blur" }
  ],
  report_cycle: [
    { required: true, message: "报告周期必填项", trigger: "blur" }
  ],
  repostandard_chargert_cycle: [
    { required: true, message: "标准收费必填项", trigger: "blur" }
  ],
  remark: [{ required: true, message: "备注必填项", trigger: "blur" }],
  settlement_price: [
    { required: true, message: "结算价格必填项", trigger: "blur" }
  ],
  settlement_desc: [
    { required: true, message: "结算说明必填项", trigger: "blur" }
  ]
});
