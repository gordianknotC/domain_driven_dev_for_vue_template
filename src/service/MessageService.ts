import Toast, { ToastOptions } from "vant/lib/toast";
import {EErrorCode, TErrorResponse} from "~/service/apiTypes";
import {useI18n} from "~/service/fadkeI18n";

const i18n = useI18n();


const failToast = (message: string, options?: ToastOptions): void => {
  options ??= {};
  options.closeOnClick ??= true;
  Toast({
    message: message,
    position: "bottom",
    overlay: false,
    className: "royal-toast fail-toast",
    ...options
  });
};

const successToast = (message: string, options?: ToastOptions): void => {
  options ??= {};
  options.closeOnClick ??= true;
  Toast({
    message: message,
    position: "bottom",
    overlay: false,
    className: "royal-toast success-toast",
    ...options
  });
};

const warningToast = (message: string, options?: ToastOptions): void => {
  options ??= {};
  options.closeOnClick ??= true;
  Toast({
    message: message,
    position: "bottom",
    overlay: false,
    className: "royal-toast warning-toast",
    ...options
  });
};

const infoToast = (message: string, options?: ToastOptions): void => {
  options ??= {};
  options.closeOnClick ??= true;
  Toast({
    message: message,
    position: "bottom",
    overlay: false,
    className: "royal-toast black-toast",
    ...options
  });
};

const loadingToast = (): void => {
  const i18n = useI18n();
  Toast.loading({
    duration: 0,
    message: i18n.$t("loading"),
    forbidClick: true,
    className: "royal-toast loading-toast"
  });
};

const clearToast = (): void => {
  Toast.clear();
};

const MessageService = {
  errorMessageHandler,
  errorMessageToast,
  failToast,
  successToast,
  warningToast,
  infoToast,
  loadingToast,
  clearToast
};

export default MessageService;
