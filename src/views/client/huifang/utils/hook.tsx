import dayjs from "dayjs";
import editForm from "../form.vue";
// import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import { getList } from "@/api/system";
import { type Ref, reactive, ref, h, watch } from "vue";

export function useRole(treeRef: Ref) {
  const form = reactive({
    account_id: "",
    phone_number: "",
    start_time: "",
    end_time: "",
    state: "1"
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const treeIds = ref([]);
  const treeData = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
  const isLinkage = ref(false);
  const treeSearchValue = ref();
  const isExpandAll = ref(false);
  const isSelectAll = ref(false);
  const accountOptions = [
    { label: "A02", value: "A02" },
    { label: "A05", value: "A05" }
  ];
  const treeProps = {
    value: "id",
    label: "title",
    children: "children"
  };
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "账户",
      prop: "account_id"
    },
    {
      label: "手机号",
      prop: "phone_number"
    },
    {
      label: "开始时间",
      prop: "start_time",
      formatter: ({ start_time }) =>
        dayjs(start_time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "截止时间",
      prop: "end_time",
      formatter: ({ end_time }) => dayjs(end_time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "状态",
      prop: "state",
      formatter: ({ state }) => {
        const stateMap = {
          1: "待处理",
          2: "已过期",
          3: "已达标",
          4: "不达标"
        };
        return stateMap[state] || "未知";
      }
    },
    {
      label: "操作",
      fixed: "right",
      width: 120,
      slot: "operation"
    }
  ];
  // const buttonClass = computed(() => {
  //   return [
  //     "!h-[20px]",
  //     "reset-margin",
  //     "!text-gray-500",
  //     "dark:!text-white",
  //     "dark:hover:!text-primary"
  //   ];
  // });

  function handleDelete(row) {
    message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
    onSearch();
  }

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
    try {
      const conditions = {};
      if (form.account_id) conditions["account_id"] = form.account_id;
      if (form.phone_number) conditions["phone_number"] = form.phone_number;
      if (form.state) conditions["state"] = form.state;

      const params = {
        return_data: 1,
        page: pagination.currentPage,
        perpage: pagination.pageSize,
        model_name: "Reminders",
        conditions: JSON.stringify(conditions),
        order: JSON.stringify(["add_time DESC"])
      };

      const response = await getList(params);
      if (response.success) {
        dataList.value = response.items;
        pagination.total = response.total;
      } else {
        message(response.err_msg || "获取数据失败", { type: "error" });
      }
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
      message("获取提醒列表失败", { type: "error" });
    } finally {
      loading.value = false;
    }
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          name: row?.name ?? "",
          code: row?.code ?? "",
          remark: row?.remark ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了角色名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  /** 菜单权限 */
  /*
  async function handleMenu(row?: any) {
    const { id } = row;
    if (id) {
      curRow.value = row;
      isShow.value = true;
      const { data } = await getRoleMenuIds({ id });
      treeRef.value.setCheckedKeys(data);
    } else {
      curRow.value = null;
      isShow.value = false;
    }
  }
*/
  /** 高亮当前权限选中行 */
  function rowStyle({ row: { id } }) {
    return {
      cursor: "pointer",
      background: id === curRow.value?.id ? "var(--el-fill-color-light)" : ""
    };
  }

  /** 菜单权限-保存 */
  function handleSave() {
    const { id, name } = curRow.value;
    // 根据用户 id 调用实际项目中菜单权限修改接口
    console.log(id, treeRef.value.getCheckedKeys());
    message(`角色名称为${name}的菜单权限修改成功`, {
      type: "success"
    });
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  const onQueryChanged = (query: string) => {
    treeRef.value!.filter(query);
  };
  /*
  const filterMethod = (query: string, node) => {
    return transformI18n(node.title)!.includes(query);
  };

  onMounted(async () => {
    onSearch();
    const { data } = await getRoleMenu();
    treeIds.value = getKeyList(data, "id");
    treeData.value = handleTree(data);
  });
*/
  watch(isExpandAll, val => {
    val
      ? treeRef.value.setExpandedKeys(treeIds.value)
      : treeRef.value.setExpandedKeys([]);
  });

  watch(isSelectAll, val => {
    val
      ? treeRef.value.setCheckedKeys(treeIds.value)
      : treeRef.value.setCheckedKeys([]);
  });

  return {
    form,
    isShow,
    curRow,
    loading,
    columns,
    rowStyle,
    dataList,
    treeData,
    treeProps,
    isLinkage,
    pagination,
    isExpandAll,
    isSelectAll,
    treeSearchValue,
    accountOptions,
    // buttonClass,
    onSearch,
    resetForm,
    openDialog,
    //handleMenu,
    handleSave,
    handleDelete,
    // filterMethod,
    // transformI18n,
    onQueryChanged,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
