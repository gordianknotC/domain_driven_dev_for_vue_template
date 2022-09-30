import { ElLoading, ElMessage } from "element-plus";
import { TErrorResponse } from "~/data_source/entities/response_entity";

const errorMessageHandler = (msg: any): TErrorResponse => {
  const errorData = msg?.error_code
    ? (msg as TErrorResponse)
    : (msg?.data as TErrorResponse);
  if (errorData?.error_code) {
    return errorData;
  } else {
    // 如果拿不到任何錯誤資訊
    return {
      error_code: 0,
      error_key: "",
      error_msg: "",
      message: "Internet connection is poor, please try again later"
    };
  }
};

/**
 * errorMessageToast
 * @param msg data: TErrorResponse
 */
const errorMessageToast = (msg: any): void => {
  const errorData = msg?.error_code
    ? (msg as TErrorResponse)
    : (msg?.data as TErrorResponse);
  if (errorData?.error_code) {
    ElMessage.error(
      errorData?.message ??
      errorData?.error_msg ??
      "Internet connection is poor, please try again later"
    );
  } else {
    ElMessage.error("Internet connection is poor, please try again later");
  }
};

const failToast = (message: string): void => {
  ElMessage.error(message);
};

const successToast = (message: string): void => {
  ElMessage.success(message);
};

const warningToast = (message: string): void => {
  ElMessage.warning(message);
};

const infoToast = (message: string): void => {
  ElMessage.info(message);
};

const loadingToast = (): void => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)"
  });
  setTimeout(() => {
    loading.close();
  }, 3000);
};

const loadingDelegate = () => {
  return ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)"
  });
};

const MessageService = {
  errorMessageHandler,
  errorMessageToast,
  failToast,
  successToast,
  warningToast,
  infoToast,
  loadingToast,
  loadingDelegate
};

export default MessageService;
