// todo: define error code here...
export enum EErrorCode {
  networkError,
  internalError = 100000,
  socketConnectFailed = 100001,
  timeout = 100002,
}

export type TPager = {
  page: number;
  pages?: number;
  per_page: number;
  total?: number;
};

export type TOptional<T> = T | undefined | null;

export type TErrorResponse = {
  error_code: EErrorCode;
  error_key: string;
  error_msg: string;
  message: string;
};

export type TSuccessResponse = {
  succeed: boolean;
};

export type TDataResponse<T> = {
  data: T;
  pager?: TPager | null | undefined;
};

export type TResponse<T> = TDataResponse<T> | TErrorResponse | TSuccessResponse;
