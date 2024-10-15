import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  patient_name: [
    { required: false, message: "患者姓名为选填项", trigger: "blur" }
  ],
  patient_ethnicity: [
    { required: false, message: "患者民族为选填项", trigger: "blur" }
  ],
  mother_name: [
    { required: false, message: "患者母亲姓名为选填项", trigger: "blur" }
  ],
  mother_age: [
    { required: false, message: "患者母亲年龄为选填项", trigger: "blur" }
  ],
  mother_ethnicity: [
    { required: false, message: "患者母亲民族为选填项", trigger: "blur" }
  ],
  father_name: [
    { required: false, message: "患者父亲姓名为选填项", trigger: "blur" }
  ],
  father_age: [
    { required: false, message: "患者父亲年龄为选填项", trigger: "blur" }
  ],
  father_ethnicity: [
    { required: false, message: "患者父亲民族为选填项", trigger: "blur" }
  ],
  relative1_title: [
    { required: false, message: "患者亲属1称谓为选填项", trigger: "blur" }
  ],
  relative1_name: [
    { required: false, message: "患者亲属1姓名为选填项", trigger: "blur" }
  ],
  relative1_gender: [
    { required: false, message: "患者亲属1性别为选填项", trigger: "blur" }
  ],
  relative1_age: [
    { required: false, message: "患者亲属1年龄为选填项", trigger: "blur" }
  ],
  relative1_ethnicity: [
    { required: false, message: "患者亲属1民族为选填项", trigger: "blur" }
  ],
  relative2_title: [
    { required: false, message: "患者亲属2称谓为选填项", trigger: "blur" }
  ],
  relative2_name: [
    { required: false, message: "患者亲属2姓名为选填项", trigger: "blur" }
  ],
  relative2_gender: [
    { required: false, message: "患者亲属2性别为选填项", trigger: "blur" }
  ],
  relative2_age: [
    { required: false, message: "患者亲属2年龄为选填项", trigger: "blur" }
  ],
  relative2_ethnicity: [
    { required: false, message: "患者亲属2民族为选填项", trigger: "blur" }
  ],
  referral_reason: [
    {
      required: false,
      message: "送检原因（临床主诉）为选填项",
      trigger: "blur"
    }
  ],
  clinical_presentation: [
    {
      required: false,
      message: "临床表现（病史、家系信息等）为选填项",
      trigger: "blur"
    }
  ],
  patient_phone: [
    { required: false, message: "患者电话为选填项", trigger: "blur" }
  ],
  patient_id_card: [
    { required: false, message: "患者身份证号为选填项", trigger: "blur" }
  ],
  report_email: [
    { required: false, message: "报告接收邮箱为选填项", trigger: "blur" }
  ],
  report_receiver: [
    { required: false, message: "报告接收人姓名为选填项", trigger: "blur" }
  ],
  report_phone: [
    { required: false, message: "报告接收电话为选填项", trigger: "blur" }
  ],
  report_address: [
    { required: false, message: "报告接收地址为选填项", trigger: "blur" }
  ],
  clinical_stage: [
    { required: false, message: "肿瘤类型为选填项", trigger: "blur" }
  ],
  clinical_diagnosis: [
    { required: false, message: "临床病理诊断为选填项", trigger: "blur" }
  ],
  first_diagnosis_date: [
    { required: false, message: "初次确诊时间为选填项", trigger: "blur" }
  ],
  primary_site: [
    { required: false, message: "原发部位为选填项", trigger: "blur" }
  ],
  metastasis_site: [
    { required: false, message: "转移部位为选填项", trigger: "blur" }
  ],
  lab: [{ required: false, message: "实验室为选填项", trigger: "blur" }]
});
