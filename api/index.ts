import {
  Bind2faParams,
  BindMachineParams,
  KVObject,
  LoginPassParams,
} from "@/types";
import axios, { AxiosRequestConfig } from "axios";
import "@/interceptors/index";

const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;

/**
 * 用户绑定2FA-获取绑定信息
 * @returns
 */
export function bind2fa(): Promise<KVObject> {
  return axios.get(`${apiPrefix}/auth/bind/2fa`);
}

/**
 * 用户绑定2FA-验证
 * @param data LoginPassParams
 * @returns
 */
export function postBind2fa(data: Bind2faParams): Promise<KVObject> {
  return axios.post(`${apiPrefix}/auth/bind/2fa`, data);
}

/**
 * 用户登录
 * @param data LoginPassParams
 * @returns
 */
export function loginPass(data: LoginPassParams): Promise<KVObject> {
  return axios.post(`${apiPrefix}/auth/login/pass`, data, {
    // @ts-ignore
    showErrorMsg: false,
  });
}

/**
 * 用户登出
 * @returns
 */
export function authLogout(): Promise<KVObject> {
  return axios.post(`${apiPrefix}/auth/logout`);
}

/**
 * 用户绑定机器
 * @param data LoginPassParams
 * @returns
 */
export function bindMachine(data: BindMachineParams): Promise<KVObject> {
  return axios.post(`${apiPrefix}/auth/bind/machine`, data, {
    // @ts-ignore
    showErrorMsg: false,
  });
}
