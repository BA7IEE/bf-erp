import { http } from "@/utils/http";

type Result = {
  perpage: number;
  page: number;
  err_msg: string;
  err_code: number;
  total: number;
  items: any[];
  success: boolean;
  data?: any;
  update_row?: number;
  api_version: string;
};

// 获取数据列表
export const getList = (data?: object) => {
  return http.request<Result>(
    "post",
    "https://api.23cc.cn/bf.php?s=SVIP.Sba7iee_MyApi.AGetList",
    {
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

// 更新数据
export const updateData = (data?: object) => {
  return http.request<Result>(
    "post",
    "https://api.23cc.cn/bf.php?s=SVIP.Sba7iee_MyApi.AUpdate",
    {
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

// 添加数据
export const createData = (data?: object) => {
  return http.request<Result>(
    "post",
    "https://api.23cc.cn/bf.php?s=SVIP.Sba7iee_MyApi.ACreate",
    {
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

// 删除数据
export const deleteData = (data?: object) => {
  return http.request<Result>(
    "post",
    "https://api.23cc.cn/bf.php?s=SVIP.Sba7iee_MyApi.ADelete",
    {
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};
