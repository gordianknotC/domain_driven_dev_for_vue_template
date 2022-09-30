// todo: define error code here...
export enum EErrorCode {}

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

export type TResponse = Partial<TSuccessResponse & TDataResponse<any>>;
