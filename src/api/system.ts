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
  api_version: string;
};

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

export const getid = (data?: object) => {
  return http.request<Result>(
    "post",
    "https://api.23cc.cn/bf.php?s=App.Table.FreeQuery",
    {
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

export const updateData = (data?: object) => {
  return http.request<Result>(
    "post",
    "https://api.23cc.cn/bf.php?s=App.Table.Update",
    {
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};
