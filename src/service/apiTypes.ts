export enum EErrorCode {
  /** 基本錯誤 */
  BASE_ERROR = 1001,  // 基本錯誤
}



export type TDataResponse<T> = {
  data: T;
  pager?: TPager | null | undefined;
};

export type TOptional<T> = undefined | null | T;

/** pagination */
export type TPager = {
  page: number;
  pages: number;
  per_page: number;
  /** 所有資料量, all data rows = total = per_page * estimated_pages*/
  total: number;
};

export type TErrorResponse = {
  error_code: EErrorCode;
  error_key: string;
  error_msg: string;
  message: string;
};

export type TSuccessResponse = {
  succeed: boolean;
};

export type TOKResponse<T> = TDataResponse<T>;

export type TResponse<T> = TOKResponse<T> | TErrorResponse;
