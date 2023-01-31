// todo: define error code here...
export enum EErrorCode {
  networkError,
  internalError = 100000,
  socketConnectFailed = 100001,
  timeout = 100002,
}

export type Pager = {
  page: number;
  pages?: number;
  per_page: number;
  total?: number;
};

export type Optional<T> = T | undefined | null;

export type ErrorResponse = {
  error_code: EErrorCode;
  error_key: string;
  error_msg: string;
  message: string;
};

export type SuccessResponse = {
  succeed: boolean;
};

export type DataResponse<T> = {
  data: T;
  pager?: Pager | null | undefined;
};

export type Response<T> = DataResponse<T> | ErrorResponse | SuccessResponse;
