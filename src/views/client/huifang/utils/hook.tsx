// 导入需要使用的外部库和功能
import dayjs from "dayjs"; // 用于处理日期和时间的库
import editForm from "../form.vue"; // 导入编辑表单组件
// import { handleTree } from "@/utils/tree"; // 这行被注释掉了，可能之前用于处理树形结构数据
import { message } from "@/utils/message"; // 导入消息提示功能
import { addDialog } from "@/components/ReDialog"; // 导入添加对话框的功能
import type { FormItemProps } from "../utils/types"; // 导入表单项属性的类型定义
import type { PaginationProps } from "@pureadmin/table"; // 导入分页属性的类型定义
import { deviceDetection } from "@pureadmin/utils"; // 导入设备检测功能
import { getList } from "@/api/system"; // 导入获取列表数据的API函数
import { type Ref, reactive, ref, h, onMounted, onUnmounted } from "vue"; // 导入Vue 3的组合式API相关功能
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

// 定义一个名为useRole的函数，这是一个自定义的Vue组合式函数（也称为"组合式API"或"hook"）
// 它接受一个名为treeRef的参数，这个参数是一个引用，可能指向一个树形组件
export function useRole(treeRef: Ref) {
  // 使用reactive创建一个响应式的表单对象，包含多个字段
  const form = reactive({
    account_id: "", // 账户ID
    phone_number: "", // 电话号码
    start_time: "", // 开始时间
    end_time: "", // 结束时间
    state: "1" // 状态，默认值为"1"
  });

  // 使用ref创建多个响应式变量
  const curRow = ref(); // 当前选中的行
  const formRef = ref(); // 表单引用
  const dataList = ref([]); // 数据列表
  const treeData = ref([]); // 树形结构的数据
  const isShow = ref(false); // 是否显示某些元素
  const loading = ref(true); // 加载状态
  const isLinkage = ref(false); // 是否联动
  const treeSearchValue = ref(); // 树形搜索的值
  const isExpandAll = ref(false); // 是否全部展开
  const isSelectAll = ref(false); // 是否全部选中

  // 定义账户选项数组
  const accountOptions = [
    { label: "A02", value: "A02" },
    { label: "A05", value: "A05" }
  ];

  // 定义树形结构的属性
  const treeProps = {
    value: "id", // 用作值的属性名
    label: "title", // 用作标签的属性名
    children: "children" // 用作子节点的属性名
  };

  // 使用reactive创建一个响应式的分页对象
  const pagination = reactive<PaginationProps>({
    total: 0, // 总条目数
    pageSize: 10, // 每页显示的条目数
    currentPage: 1, // 当前页码
    background: true // 是否显示背景
  });

  // 定义表格列的配置数组
  const columns: TableColumnList = [
    {
      label: "账户",
      prop: "account_id"
    },
    {
      label: "手机号",
      prop: "phone_number",
      cellRenderer: ({ row }) => (
        <el-button
          link
          type="primary"
          onClick={() => copyToClipboard(row.phone_number)}
        >
          {row.phone_number}
        </el-button>
      )
    },
    {
      label: "开始时间",
      prop: "start_time",
      formatter: ({ start_time }) =>
        dayjs(start_time).format("YYYY-MM-DD HH:mm:ss") // 格式化日期时间
    },
    {
      label: "距离开始",
      prop: "timeToStart",
      formatter: ({ start_time }) => calculateTimeToStart(start_time)
    },
    {
      label: "截止时间",
      prop: "end_time",
      formatter: ({ end_time }) => dayjs(end_time).format("YYYY-MM-DD HH:mm:ss") // 格式化日期时间
    },
    {
      label: "剩余时间",
      prop: "remainingTime",
      formatter: ({ end_time }) => calculateRemainingTime(end_time)
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
        return stateMap[state] || "未知"; // 将状态码转换为文字描述
      }
    },
    {
      label: "操作",
      fixed: "right",
      width: 140,
      slot: "operation"
    }
  ];

  // 处理删除操作的函数
  function handleDelete(row) {
    message(`您删除了${row.phone_number}这条数据`, { type: "success" });
    onSearch(); // 删除后重新搜索更新数据
  }

  // 处理每页显示数量变化的函数
  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch(); // 更新每页数量后重新搜索
  }

  // 处理当前页码变化的函数
  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch(); // 更新页码后重新搜索
  }

  // 处理表格选择变化的函数
  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  // 执行搜索的异步函数
  async function onSearch() {
    loading.value = true;
    try {
      // 构建查询条件
      const conditions = {};
      if (form.account_id) conditions["account_id"] = form.account_id;
      if (form.phone_number) conditions["phone_number"] = form.phone_number;
      if (form.state) conditions["state"] = form.state;

      // 构建API请求参数
      const params = {
        return_data: 1,
        page: pagination.currentPage,
        perpage: pagination.pageSize,
        model_name: "Reminders",
        conditions: JSON.stringify(conditions),
        order: JSON.stringify(["add_time DESC"])
      };

      // 调用API获取数据
      const response = await getList(params);
      if (response.success) {
        dataList.value = response.items.map(item => ({
          ...item,
          remainingTime: calculateRemainingTime(item.end_time),
          timeToStart: calculateTimeToStart(item.start_time)
        })); // 更新数据列表
        pagination.total = response.total; // 更新总条目数
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

  // 重置表单的函数
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields(); // 重置表单字段
    onSearch(); // 重置后重新搜索
  };

  // 打开对话框的函数
  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}回访信息`,
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
          message(`您${title}${curData.phone_number}这条数据`, {
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

  // 设置行样式的函数
  function rowStyle({ row: { id } }) {
    return {
      cursor: "pointer",
      background: id === curRow.value?.id ? "var(--el-fill-color-light)" : ""
    };
  }

  // 处理保存操作的函数
  function handleSave() {
    const { id, name } = curRow.value;
    // 根据用户 id 调用实际项目中菜单权限修改接口
    console.log(id, treeRef.value.getCheckedKeys());
    message(`角色名称为${name}的菜单权限修改成功`, {
      type: "success"
    });
  }

  // 处理查询变化的函数
  const onQueryChanged = (query: string) => {
    treeRef.value!.filter(query);
  };

  let timer;
  onMounted(() => {
    timer = setInterval(() => {
      dataList.value = dataList.value.map(item => ({
        ...item,
        remainingTime: calculateRemainingTime(item.end_time),
        timeToStart: calculateTimeToStart(item.start_time)
      }));
    }, 60000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  function calculateRemainingTime(endTime) {
    const now = dayjs();
    const end = dayjs(endTime);
    const diff = end.diff(now);

    if (diff <= 0) {
      return "已过期";
    }

    const duration = dayjs.duration(diff);
    const days = duration.days();
    const hours = duration.hours();

    return `${days}天${hours}小时`;
  }

  function calculateTimeToStart(startTime) {
    const now = dayjs();
    const start = dayjs(startTime);
    const diff = start.diff(now);

    if (diff <= 0) {
      return "已开始";
    }

    const duration = dayjs.duration(diff);
    const hours = duration.hours();
    const minutes = duration.minutes();

    return `${hours}小时${minutes}分`;
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        message("复制成功", { type: "success" });
      },
      () => {
        message("复制失败", { type: "error" });
      }
    );
  }

  // 返回所有需要在组件中使用的变量和函数
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
    onSearch,
    resetForm,
    openDialog,
    handleSave,
    handleDelete,
    onQueryChanged,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    copyToClipboard
  };
}
