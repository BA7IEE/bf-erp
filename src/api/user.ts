import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  err_code: number;
  err_msg: string;
  data: {
    userid: number;
    username: string;
    nickname: string;
    sex: string;
    phone: string;
    avatar: string;
    roles: string[];
    permissions: string[];
    accessToken: string;
    refreshToken: string;
    expires: number;
  };
  api_version: string;
};

export type RefreshTokenResult = {
  success: boolean;
  err_code: number;
  err_msg: string;
  data: {
    accessToken: string;
    refreshToken: string;
    expires: number;
  };
  api_version: string;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>(
    "post",
    "https://api.23cc.cn/bf.php/?s=SVIP.Sba7iee_MyApi.ALogin",
    {
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>(
    "post",
    "https://api.23cc.cn/bf.php?s=SVIP.Sba7iee_MyApi.ARefreshToken",
    {
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};
