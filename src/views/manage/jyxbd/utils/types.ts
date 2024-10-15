// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: number;
  subsidiary: string;
  product_name: string;
  activated: number;
  projectCode: string;
  chargeCode: string;
  tollStandard: string;
  supplement: string;
  sample: string;
  tutorial: string;
  preservation: string;
  transportation: string;
  applicationUnitType: string;
  medicalMethod: string;
  projectConcourse: string;
  hurryDepartment: string;
  reportingTime: string;
  clinicalApplication: string;
  series: string;
  subSeries: string;
  remarks: string;
}

interface FormProps {
  formInline: FormItemProps;
  disabled: boolean;
}

export type { FormItemProps, FormProps };
