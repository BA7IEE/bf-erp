import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import { reactive, ref, onMounted, h, toRaw, onUnmounted } from "vue";
import { getList, updateData } from "@/api/system";

export function useRole() {
  const form = reactive({
    name: "",
    phone: "",
    libs: ""
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
  const isLinkage = ref(false);
  const libsList = ref([]);
  let listener = null;

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const columns: TableColumnList = [
    {
      label: "ID",
      prop: "id",
      minWidth: 100,
      fixed: true
    },
    {
      label: "患者姓名",
      prop: "patient_name",
      minWidth: 100,
      fixed: true
    },
    {
      label: "患者性别",
      prop: "patient_gender",
      minWidth: 100,
      formatter: ({ patient_gender }) => {
        return patient_gender === 1 ? "男" : patient_gender === 0 ? "女" : "";
      }
    },
    {
      label: "患者年龄",
      prop: "patient_age",
      minWidth: 100
    },
    {
      label: "患者民族",
      prop: "patient_ethnicity",
      minWidth: 100
    },
    {
      label: "患者母亲姓名",
      prop: "mother_name",
      minWidth: 110
    },
    {
      label: "患者母亲年龄",
      prop: "mother_age",
      minWidth: 110
    },
    {
      label: "患者母亲民族",
      prop: "mother_ethnicity",
      minWidth: 110
    },
    {
      label: "患者父亲姓名",
      prop: "father_name",
      minWidth: 110
    },
    {
      label: "患者父亲年龄",
      prop: "father_age",
      minWidth: 110
    },
    {
      label: "患者父亲民族",
      prop: "father_ethnicity",
      minWidth: 110
    },
    {
      label: "患者亲属1称谓",
      prop: "relative1_title",
      minWidth: 110
    },
    {
      label: "患者亲属1姓名",
      prop: "relative1_name",
      minWidth: 110
    },
    {
      label: "患者亲属1性别",
      prop: "relative1_gender",
      minWidth: 110,
      formatter: ({ relative1_gender }) => {
        return relative1_gender === 1
          ? "男"
          : relative1_gender === 0
            ? "女"
            : "";
      }
    },
    {
      label: "患者亲属1年龄",
      prop: "relative1_age",
      minWidth: 110
    },
    {
      label: "患者亲属1民族",
      prop: "relative1_ethnicity",
      minWidth: 110
    },
    {
      label: "患者亲属2称谓",
      prop: "relative2_title",
      minWidth: 110
    },
    {
      label: "患者亲属2姓名",
      prop: "relative2_name",
      minWidth: 110
    },
    {
      label: "患者亲属2性别",
      prop: "relative2_gender",
      minWidth: 110,
      formatter: ({ relative2_gender }) => {
        return relative2_gender === 1
          ? "男"
          : relative2_gender === 0
            ? "女"
            : "";
      }
    },
    {
      label: "患者亲属2年龄",
      prop: "relative2_age",
      minWidth: 110
    },
    {
      label: "患者亲属2民族",
      prop: "relative2_ethnicity",
      minWidth: 110
    },
    {
      label: "送检原因（临床主诉）",
      prop: "referral_reason",
      minWidth: 200
    },
    {
      label: "临床表现（病史、家系信息等）",
      prop: "clinical_presentation",
      minWidth: 200
    },
    {
      label: "患者电话",
      prop: "patient_phone",
      minWidth: 150
    },
    {
      label: "患者身份证号",
      prop: "patient_id_card",
      minWidth: 170
    },
    {
      label: "报告接收邮箱",
      prop: "report_email",
      minWidth: 150
    },
    {
      label: "报告接收人姓名",
      prop: "report_receiver",
      minWidth: 110
    },
    {
      label: "报告接收电话",
      prop: "report_phone",
      minWidth: 110
    },
    {
      label: "报告接收地址",
      prop: "report_address",
      minWidth: 160
    },
    {
      label: "肿瘤类型",
      prop: "clinical_stage",
      minWidth: 100
    },
    {
      label: "临床病理诊断",
      prop: "clinical_diagnosis",
      minWidth: 100
    },
    {
      label: "初次确诊时间",
      prop: "first_diagnosis_date",
      minWidth: 100
    },
    {
      label: "原发部位",
      prop: "primary_site",
      minWidth: 100
    },
    {
      label: "转移部位",
      prop: "metastasis_site",
      minWidth: 100
    },
    {
      label: "实验室",
      prop: "lab",
      minWidth: 100,
      formatter: ({ lab }) => {
        return libsList.value.filter(item => item.id === lab)[0]?.lab_name;
      }
    },
    {
      label: "操作",
      fixed: "right",
      width: 140,
      slot: "operation"
    }
  ];

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    let conditions: Record<string, any> = {};
    if (form.libs) {
      conditions.lab = form.libs;
    }
    if (form.name) {
      conditions["patient_name LIKE ?"] = `%${form.name}%`;
    }
    if (form.phone) {
      conditions["patient_phone LIKE ?"] = `%${form.phone}%`;
    }

    let formData: Record<string, any> = {
      return_data: 1,
      model_name: "PatientProfiles",
      page: pagination.currentPage,
      perpage: pagination.pageSize
    };

    if (Object.keys(conditions).length > 0) {
      formData.conditions = JSON.stringify(conditions);
    }

    const data = await getList(toRaw(formData));
    dataList.value = data.items;
    pagination.total = data.total;
    pagination.pageSize = data.perpage;
    pagination.currentPage = data.page;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function getLibs() {
    const data = await getList({
      return_data: 1,
      model_name: "Labs"
    });
    libsList.value = data.items;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(edit = true, row?: FormItemProps) {
    addDialog({
      title: !edit ? "修改患者档案" : "查看患者档案",
      props: {
        formInline: {
          patient_name: row?.patient_name ?? "",
          patient_ethnicity: row?.patient_ethnicity ?? "",
          mother_name: row?.mother_name ?? "",
          mother_age: row?.mother_age ?? "",
          mother_ethnicity: row?.mother_ethnicity ?? "",
          father_name: row?.father_name ?? "",
          father_age: row?.father_age ?? "",
          father_ethnicity: row?.father_ethnicity ?? "",
          relative1_title: row?.relative1_title ?? "",
          relative1_name: row?.relative1_name ?? "",
          relative1_gender: row?.relative1_gender ?? "",
          relative1_age: row?.relative1_age ?? "",
          relative1_ethnicity: row?.relative1_ethnicity ?? "",
          relative2_title: row?.relative2_title ?? "",
          relative2_name: row?.relative2_name ?? "",
          relative2_gender: row?.relative2_gender ?? "",
          relative2_age: row?.relative2_age ?? "",
          relative2_ethnicity: row?.relative2_ethnicity ?? "",
          referral_reason: row?.referral_reason ?? "",
          clinical_presentation: row?.clinical_presentation ?? "",
          patient_phone: row?.patient_phone ?? "",
          patient_id_card: row?.patient_id_card ?? "",
          report_email: row?.report_email ?? "",
          report_receiver: row?.report_receiver ?? "",
          report_phone: row?.report_phone ?? "",
          report_address: row?.report_address ?? "",
          clinical_stage: row?.clinical_stage ?? "",
          clinical_diagnosis: row?.clinical_diagnosis ?? "",
          first_diagnosis_date: row?.first_diagnosis_date ?? "",
          primary_site: row?.primary_site ?? "",
          metastasis_site: row?.metastasis_site ?? "",
          lab: row?.lab ?? ""
        },
        libsList,
        disabled: edit
      },
      width: "60%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;

        if (!options.props.disabled) {
          FormRef.validate(async valid => {
            if (valid) {
              let rowData = {
                ...JSON.parse(JSON.stringify(row)),
                ...curData
              };
              let form = {
                id: (row as any).id,
                data: JSON.stringify(rowData),
                model_name: "PatientProfiles",
                uuid: window.localStorage.getItem("uuid"),
                token: window.localStorage.getItem("token")
              };
              console.log(form);

              const data = await updateData(toRaw(form));
              if (data.err_code === 0) {
                message(`修改成功`, {
                  type: "success"
                });
                done(); // 关闭弹框
                onSearch(); // 刷新表格数据
              }
            }
          });
        } else {
          done();
        }
      }
    });
  }

  function rowStyle({ row: { id } }) {
    return {
      cursor: "pointer",
      background: id === curRow.value?.id ? "var(--el-fill-color-light)" : ""
    };
  }

  onMounted(async () => {
    onSearch();
    getLibs();
    listener = e => {
      if (e.keyCode === 13) {
        onSearch();
      }
    };
    window.addEventListener("keydown", listener);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", listener);
    listener = null;
  });

  return {
    form,
    isShow,
    curRow,
    loading,
    columns,
    rowStyle,
    dataList,
    isLinkage,
    pagination,
    onSearch,
    resetForm,
    openDialog,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    libsList
  };
}
