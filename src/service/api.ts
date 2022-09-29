import axios from "axios";
import {
  TSuccessResponse
} from "~/service/apiTypes";

const API_DOMAIN = "https://api.abc.com";
const IS_MOBILE_APP = true;
const currentVersion = "1.3.0";

export const middleVersion = () => {
  const [big, middle, small] = currentVersion.split(".");
  return `${big}.${middle}`;
};

export const requestConfig = (config: any) => {
  config.headers.common["Authorization"] = "";
  config.headers["Version"] = middleVersion();
  config.headers["is_app"] = IS_MOBILE_APP ? 1 : 0;
  return config;
}

export const requestError = async (error: any) => {
  console.log(error);
  return Promise.reject(error);
}

export const mainAxios = axios.create({
  baseURL: API_DOMAIN,
  timeout: 10000
});

mainAxios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
mainAxios.interceptors.request.use(requestConfig, requestError);

function post(url: string, data: Record<string, any>): Promise<any> {
  return new Promise((resolve, reject) => {
    mainAxios({
      method: "post",
      url,
      data: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function get<T>(url: string, data: Record<string, any> = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    mainAxios({
      method: "get",
      url,
      params: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function put(url: string, data: Record<string, any>): Promise<any> {
  return new Promise((resolve, reject) => {
    mainAxios({
      method: "put",
      url,
      data: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function del(url: string, data: Record<string, any>): Promise<any> {
  return new Promise((resolve, reject) => {
    mainAxios({
      method: "delete",
      url,
      data: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

const Api = {
  async signUp(payload: ISignUpPayload): Promise<ISignUpResponse> {
    if (!payload.visitor_id) {
      delete payload.visitor_id;
    }
    if (!payload.zone_id) {
      delete payload.zone_id;
    }
    return await post("/register", {
      ...payload,
      is_app: IS_MOBILE_APP
    });
  },
  /** user registration via mobile phone*/
  async requestPhoneOTP(payload: IRequestOtpThruPhonePayload): Promise<TSuccessResponse> {
    return await post("/request/register", payload);
  },

  async verifyPhoneOTP(payload: IVerifyOTPPayload): Promise<TSuccessResponse> {
    return await post("/verify/phone/otp", payload);
  },
  // async requestResetPwdThruPhone(payload: IRequestOtpThruPhonePayload): Promise<TSuccessResponse> {
  //   return await post("/request/reset-password", payload);
  // },
};

export default Api;


