// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 患者姓名 */
  patient_name: string;
  /** 患者民族 */
  patient_ethnicity: string;
  patient_age: number | null;
  patient_gender: number | null;
  /** 患者母亲姓名 */
  mother_name: string;
  // 患者母亲年龄
  mother_age: number;
  // 患者母亲民族
  mother_ethnicity: string;
  // 患者父亲姓名
  father_name: string;
  // 患者父亲年龄
  father_age: number;
  // 患者父亲民族
  father_ethnicity: string;
  // 患者亲属1称谓
  relative1_title: string;
  // 患者亲属1姓名
  relative1_name: string;
  // 患者亲属1性别
  relative1_gender: number;
  // 患者亲属1年龄
  relative1_age: number;
  // 患者亲属1民族
  relative1_ethnicity: string;
  // 患者亲属2称谓
  relative2_title: string;
  // 患者亲属2姓名
  relative2_name: string;
  // 患者亲属2性别
  relative2_gender: number;
  // 患者亲属2年龄
  relative2_age: number;
  // 患者亲属2民族
  relative2_ethnicity: string;
  // 送检原因（临床主诉）
  referral_reason: string;
  // 临床表现（病史、家系信息等）
  clinical_presentation: string;
  // 患者电话
  patient_phone: string;
  // 患者身份证号
  patient_id_card: string;
  // 报告接收邮箱
  report_email: string;
  // 报告接收人姓名
  report_receiver: string;
  // 报告接收电话
  report_phone: number;
  //报告接收地址
  report_address: string;
  // 肿瘤类型
  clinical_stage: string;
  // 临床病理诊断
  clinical_diagnosis: string;
  // 初次确诊时间
  first_diagnosis_date: string;
  // 原发部位
  primary_site: string;
  // 转移部位
  metastasis_site: string;
  // 实验室
  lab: string;
}
interface FormProps {
  formInline: FormItemProps;
  libsList: any[];
}

export type { FormItemProps, FormProps };
