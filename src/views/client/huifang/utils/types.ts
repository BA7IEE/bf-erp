// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  name: string;
  code: string;
  remark: string;
  account_id: string;
  phone_number: string;
  start_time: string;
  end_time: string;
  state: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
