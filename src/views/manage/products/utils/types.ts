// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 项目名称 */
  product_name: string;
  /** 项目代码 */
  product_code: string;
  // 项目类别
  product_category: string;
  // 检测机构
  product_lab: string;
  /** 检测方法 */
  method: string;
  // 样本要求
  sample_req: string;
  // 运输保存
  transport_storage: string;
  // 临床应用
  clinical_app: string;
  //报告周期
  report_cycle: string;
  // 标准收费
  standard_charge: string;
  // 备注
  remark: string;
  // 结算价格
  settlement_price: number;
  // 结算说明
  settlement_desc: string;
  // 结算渠道
  settlement_channel: string;
}
interface FormProps {
  formInline: FormItemProps;
  productsCategoryList: any[];
  libsList: any[];
  settlementChannelList: any[];
  disabled: boolean;
}

export type { FormItemProps, FormProps };
