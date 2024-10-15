// import dayjs from "dayjs";
import editForm from "../form.vue";
import ProductDetails from "../ProductDetails.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import { reactive, ref, onMounted, h, toRaw, onUnmounted } from "vue";
import { getList, updateData } from "@/api/system";

export function useRole() {
  const form = reactive({
    project: "",
    libs: "",
    type: ""
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
  const isLinkage = ref(false);
  const settlementChannelList = ref([]);
  const productsCategoryList = ref([]);
  const libsList = ref([]);
  let listener = null;
  let orderList = ref([]);

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 20,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "检测机构",
      prop: "product_lab",
      minWidth: 82,
      fixed: true,
      formatter: ({ product_lab }) => {
        return libsList.value.filter(item => item.id === product_lab)[0]
          ?.lab_name;
      }
    },
    {
      label: "项目名称",
      prop: "product_name",
      minWidth: 320,
      fixed: true,
      align: "left"
    },
    {
      label: "临床应用",
      prop: "clinical_app",
      minWidth: 260,
      align: "left"
    },
    {
      label: "检测方法",
      prop: "method",
      minWidth: 100
    },
    {
      label: "样本要求",
      prop: "sample_req",
      minWidth: 100
    },
    {
      label: "运输保存",
      prop: "transport_storage",
      minWidth: 140
    },
    {
      label: "报告周期",
      prop: "report_cycle",
      minWidth: 100
    },
    {
      label: "标准收费",
      prop: "standard_charge",
      sortable: "custom",
      minWidth: 108
    },
    {
      label: "结算价格",
      prop: "settlement_price",
      sortable: "custom",
      minWidth: 108
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 200
    },
    {
      label: "结算说明",
      prop: "settlement_desc",
      minWidth: 200
    },
    {
      label: "结算渠道",
      prop: "settlement_channel",
      formatter: ({ settlement_channel }) => {
        return settlementChannelList.value.filter(
          item => item.id === settlement_channel
        )[0]?.channel_name;
      }
    },
    {
      label: "项目类别",
      prop: "product_category",
      minWidth: 82,
      formatter: ({ product_category }) => {
        return productsCategoryList.value.filter(
          item => item.id === product_category
        )[0]?.category_name;
      }
    },
    {
      label: "项目代码",
      prop: "product_code",
      minWidth: 90
    },
    {
      label: "操作",
      fixed: "right",
      width: 78,
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

  function handleSortChange({ prop, order }) {
    if (order === "ascending") {
      order = "ASC";
    } else if (order === "descending") {
      order = "DESC";
    }
    orderList.value = [prop + " " + order];
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    let conditions: Record<string, any> = {};
    if (form.libs) {
      conditions.product_lab = form.libs;
    }
    if (form.type) {
      conditions.product_category = form.type;
    }
    if (form.project) {
      conditions["product_name LIKE ? OR clinical_app LIKE ?"] = [
        `%${form.project}%`,
        `%${form.project}%`
      ];
    }

    let formData: Record<string, any> = {
      return_data: 1,
      model_name: "Products",
      page: pagination.currentPage,
      perpage: pagination.pageSize
    };

    if (Object.keys(conditions).length > 0) {
      formData.conditions = JSON.stringify(conditions);
    }

    if (orderList.value.length > 0) {
      formData.order = JSON.stringify(orderList.value);
    }

    const data = await getList(toRaw(formData));
    dataList.value = data.items;
    pagination.total = data.total;
    pagination.pageSize = data.perpage || pagination.pageSize;
    pagination.currentPage = data.page || pagination.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function getSettlementChannel() {
    const data = await getList({
      return_data: 1,
      model_name: "SettlementChannel"
    });
    settlementChannelList.value = data.items;
  }

  async function getProductsCategory() {
    const data = await getList({
      return_data: 1,
      model_name: "ProductsCategory"
    });
    productsCategoryList.value = data.items;
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
    form.libs = "";
    form.type = "";
    form.project = "";
    formEl.resetFields();
    onSearch();
  };

  function openDialog(view = false, row?: FormItemProps) {
    addDialog({
      title: view ? "项目详情" : "修改检验项目",
      // 在查看模式下设置 hideFooter 为 true，编辑模式使用默认值
      hideFooter: view ? true : undefined,
      // 在编辑模式下设置 closeOnClickModal 为 false，查看模式使用默认值
      closeOnClickModal: view ? undefined : false,
      props: {
        formInline: {
          product_name: row?.product_name ?? "",
          product_code: row?.product_code ?? "",
          product_category: row?.product_category ?? "",
          product_lab: row?.product_lab ?? "",
          method: row?.method ?? "",
          sample_req: row?.sample_req ?? "",
          transport_storage: row?.transport_storage ?? "",
          clinical_app: row?.clinical_app ?? "",
          report_cycle: row?.report_cycle ?? "",
          standard_charge: row?.standard_charge ?? "",
          remark: row?.remark ?? "",
          settlement_price: row?.settlement_price ?? "",
          settlement_desc: row?.settlement_desc ?? "",
          settlement_channel: row?.settlement_channel ?? ""
        },
        productsCategoryList,
        libsList,
        settlementChannelList,
        disabled: view
      },
      width: "60%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      contentRenderer: () =>
        view
          ? h(ProductDetails, {
              product: row,
              libsList: libsList.value,
              productsCategoryList: productsCategoryList.value,
              settlementChannelList: settlementChannelList.value
            })
          : h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        if (!view) {
          const FormRef = formRef.value.getRef();
          const curData = options.props.formInline as FormItemProps;

          FormRef.validate(async valid => {
            if (valid) {
              let rowData = {
                ...JSON.parse(JSON.stringify(row)),
                ...curData
              };
              let form = {
                id: (row as any).id,
                data: JSON.stringify(rowData),
                model_name: "Products",
                uuid: window.localStorage.getItem("uuid"),
                token: window.localStorage.getItem("token")
              };
              console.log(form);

              const { data } = await updateData(toRaw(form));
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

  /** 高亮当前权限选中行 */
  function rowStyle({ row: { id } }) {
    return {
      cursor: "pointer",
      background: id === curRow.value?.id ? "var(--el-fill-color-light)" : ""
    };
  }
  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(async () => {
    onSearch();
    getSettlementChannel();
    getProductsCategory();
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
    handleSortChange,
    libsList,
    productsCategoryList
  };
}
