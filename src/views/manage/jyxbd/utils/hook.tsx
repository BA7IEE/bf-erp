import ProductDetails from "../ProductDetails.vue";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import { reactive, ref, onMounted, h, toRaw, onUnmounted } from "vue";
import { getList } from "@/api/system";
import type { FormInstance } from "element-plus";

export function useRole() {
  const form = reactive({ project: "" });
  const curRow = ref();
  const dataList = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
  const isLinkage = ref(false);
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
      label: "项目名称",
      prop: "product_name",
      minWidth: 320,
      fixed: true,
      align: "left"
    },
    { label: "子公司", prop: "subsidiary", minWidth: 100 },
    { label: "标准收费", prop: "tollStandard", minWidth: 100 },
    { label: "补充说明", prop: "supplement", minWidth: 200 },
    { label: "样本类型", prop: "sample", minWidth: 100 },
    { label: "送检培训", prop: "tutorial", minWidth: 200 },
    { label: "保存方法", prop: "preservation", minWidth: 200 },
    { label: "运输方法", prop: "transportation", minWidth: 200 },
    { label: "申请单", prop: "applicationUnitType", minWidth: 100 },
    { label: "检测方法", prop: "medicalMethod", minWidth: 100 },
    { label: "所属科室", prop: "projectConcourse", minWidth: 100 },
    { label: "加急部门", prop: "hurryDepartment", minWidth: 100 },
    { label: "报告时间", prop: "reportingTime", minWidth: 100 },
    { label: "临床应用", prop: "clinicalApplication", minWidth: 200 },
    { label: "系列", prop: "series", minWidth: 100 },
    { label: "子系列", prop: "subSeries", minWidth: 100 },
    { label: "备注", prop: "remarks", minWidth: 200 },
    { label: "操作", fixed: "right", width: 78, slot: "operation" }
  ];

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }
  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }
  function handleSelectionChange() {}
  function handleSortChange({ prop, order }) {
    order =
      order === "ascending" ? "ASC" : order === "descending" ? "DESC" : "";
    orderList.value = order ? [`${prop} ${order}`] : [];
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const conditions: Record<string, any> = {
      "activated = ?": 1 // 添加默认过滤条件，只显示已激活的项目
    };
    if (form.project) {
      conditions["product_name LIKE ? OR clinicalApplication LIKE ?"] = [
        `%${form.project}%`,
        `%${form.project}%`
      ];
    }
    const formData: Record<string, any> = {
      return_data: 1,
      model_name: "JyxbdPj",
      page: pagination.currentPage,
      perpage: pagination.pageSize,
      conditions: JSON.stringify(conditions),
      ...(orderList.value.length && { order: JSON.stringify(orderList.value) })
    };
    const data = await getList(toRaw(formData));
    dataList.value = data.items;
    pagination.total = data.total;
    pagination.pageSize = data.perpage || pagination.pageSize;
    pagination.currentPage = data.page || pagination.currentPage;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    form.project = "";
    formEl.resetFields();
    onSearch(); // 重置后立即执行搜索
  };

  function openDialog(row?: FormItemProps) {
    addDialog({
      title: "项目详情",
      hideFooter: true,
      props: { formInline: row },
      width: "60%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      contentRenderer: () => h(ProductDetails, { product: row })
    });
  }

  function rowStyle({ row: { id } }) {
    return {
      cursor: "pointer",
      background: id === curRow.value?.id ? "var(--el-fill-color-light)" : ""
    };
  }

  onMounted(async () => {
    await onSearch();
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
    handleSortChange
  };
}
