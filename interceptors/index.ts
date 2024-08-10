import { useUserStore } from "@/store";
import { getLocalStorage } from "@/utils/localStorage";
import { messageError } from "@/utils/message";
import axios from "axios";

axios.defaults.withCredentials = false;

// request interceptor
axios.interceptors.request.use(
  (config) => {
    const { token } = getLocalStorage("user", true) ?? {};
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
axios.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async (response) => {
    const { config, data } = response;
    // @ts-ignore
    const { showErrorMsg = true } = config;
    return new Promise((resolve, reject) => {
      if (data.code !== 200) {
        if (showErrorMsg) {
          messageError({ content: data.message });
        }

        return reject({
          code: data.code,
          msg: data.message || "Error",
          data: data.data,
        });
      } else {
        resolve(data.data);
      }
    });
  },
  (error) => {
    console.error("err" + error);
    messageError(error.message);
    return Promise.reject({ code: 1000, msg: error.message });
  }
);
