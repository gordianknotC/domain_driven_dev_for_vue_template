export enum EErrorCode {
  // /** cors 或 404 not found 內部會產生 Network Error, 為使錯誤型別一致，計入 ErrorCode*/
  // AXIOS_ERROR= 111111,
  // 1. 系統錯誤
  /** 基本錯誤 */
  BASE_ERROR = 1001,  // 基本錯誤
  /** 未知錯誤 */
  UNKNOWN_ERROR = 1002,  // 未知錯誤

  // """
  // 2. 資料錯誤
  // """
  // SERVER(20-)
  /** 資料錯誤 */
  DATA_ERROR = 2001,  // 資料錯誤
  /** 資料遺漏 */
  DATA_MISSING = 2002,  // 資料遺漏
  /** 必須提供的資料 */
  DATA_REQUIRED = 2004,  // 必須提供的資料
  /** 不可變動 */
  DATA_IMMUTABLE = 2005,  // 不可變動

  // CLIENT(21-)
  /** 酬載錯誤 */
  PAYLOAD_ERROR = 2101,  // 酬載錯誤
  /** 缺少必要鍵 */
  PAYLOAD_MISSING_KEY = 2102,  // 缺少必要鍵
  /** 型別錯誤 */
  PAYLOAD_UNEXPECTED_TYPE = 2103,  // 型別錯誤
  /** JSON 格式錯誤 */
  JSON_DECODE_ERROR = 2104,  // JSON 格式錯誤

  // """
  // 3. 操作錯誤
  //     - 授權錯誤
  //     - 操作錯誤
  //     - 驗證錯誤
  //     - 檢查錯誤
  // """

  // 簡述(30-)
  /** 無效的操作 */
  INVALID_OPERATION = 3001,  // 無效的操作
  /** 權限不足 */
  INVALID_PERMISSION = 3002,  // 權限不足
  /** 無效通行証書 */
  INVALID_ACCESS_TOKEN = 3003,  // 無效通行証書
  /** 無效重置証書 */
  INVALID_REFRESH_TOKEN = 3004,  // 無效重置証書
  /** 無效手機號碼 */
  INVALID_PHONE_NUMBER = 3005,  // 無效手機號碼
  /** 無效信箱 */
  INVALID_EMAIL = 3006,  // 無效信箱
  /** 無效使用者名稱 */
  INVALID_USERNAME = 3007,  // 無效使用者名稱
  /** 無效密碼 */
  INVALID_PASSWORD = 3008,  // 無效密碼
  /** 無效驗證代碼 */
  INVALID_VERIFY_CODE = 3009,  // 無效驗證代碼
  /** 無效關鍵字長度 */
  INVALID_KEYWORD_LENGTH = 3010,  // 無效關鍵字長度
  /** 無效檔案大小 */
  INVALID_FILE_SIZE = 3011,  // 無效檔案大小
  /** 無效圖片格式 */
  INVALID_IMAGE_FORMAT = 3012,  // 無效圖片格式
  /** 無效生日格式 */
  INVALID_BIRTHDAY_FORMAT = 3013,  // 無效生日格式

  // 細述(31-)
  /** 未包含通行証 */
  ACCESS_TOKEN_MISSING = 3101,  // 未包含通行証
  /** 通行証過期 */
  ACCESS_TOKEN_IS_EXPIRED = 3102,  // 通行証過期
  /** 含有非法字元 */
  CONTAIN_FORBIDDEN_CHARACTER = 3103,  // 含有非法字元
  /** 重複的電子郵件 */
  EMAIL_IS_EXIST = 3104,  // 重複的電子郵件
  /** 觸及最大嘗試次數 */
  REACHED_MAXIMUM_RETRY_ATTEMPTS = 3105,  // 觸及最大嘗試次數
  /** 重複的使用者名稱 */
  USERNAME_IS_EXIST = 3106,  // 重複的使用者名稱
  /** 使用者不存在或密碼錯誤 */
  USERNAME_IS_NOT_EXIST_OR_PASSWORD_IS_WRONG = 3107,  // 使用者不存在或密碼錯誤
  /** 使用者被鎖定 */
  USER_IS_LOCKED = 3108,  // 使用者被鎖定
  /** 使用者被凍結 */
  USER_IS_BLOCKED = 3109,  // 使用者被凍結
  /** 使用者不存在 */
  USER_NOT_FOUND = 3110,  // 使用者不存在
  /** 短時間重複操作驗證 */
  VERIFY_OPERATION_REPEATEDLY = 3111,  // 短時間重複操作驗證
  /** 簽名錯誤 */
  SIGNATURE_ERROR = 3112,  // 簽名錯誤
  /** 餘額不足 */
  AMOUNT_INSUFFICIENT = 3113,  // 餘額不足
  /** 金額條件不符 */
  AMOUNT_INVALID = 3114,  // 金額條件不符
  /** 檔案不存在 */
  FILE_NOT_EXIST = 3115,  // 檔案不存在
  /** 觸及密碼重設最大額度 */
  REACHED_RESET_PASSWORD_MAXIMUM = 3116,  // 觸及密碼重設最大額度
  /** 會員碼不存在 */
  USER_CODE_NOT_EXIST = 3117,  // 會員碼不存在
  /** 表頭未包含版本資訊 */
  APP_VERSION_DETAIL_IS_MISSING = 3118,  // 表頭未包含版本資訊
  /** APP版本過時 */
  APP_VERSION_IS_OUT_OF_DATE = 3119,  // APP版本過時
  /** 錯誤的APP版本格式 */
  APP_VERSION_FORMAT_ERROR = 3120,  // 錯誤的APP版本格式
  /** 聊天室不存在 */
  MESSAGE_ROOM_IS_NOT_EXIST = 3121,  // 聊天室不存在
  /** 連線id不存在 */
  SESSION_IS_NOT_EXIST = 3122,  // 連線id不存在
  /** 重複的手機號碼 */
  PHONE_IS_EXIST = 3123,  // 重複的手機號碼

  // """
  // 9.  專案用錯誤
  /** 請求第三方API失敗 */
  API_CONNECTION_ERROR = 9001,  // 請求第三方API失敗
  /** PAN 驗證失敗 */
  INVALID_PAN_DETAILS = 9002,  // PAN 驗證失敗
  /** PAN NUMBER 格式錯誤 */
  INVALID_PAN_NUMBER = 9003 , // PAN NUMBER 格式錯誤
  /** 銀行帳戶不合法 */
  INVALID_BANK_ACCOUNT = 9004,  // 銀行帳戶不合法
  /** 銀行名稱不正確 */
  BANK_NAME_INCORRECT = 9005,  // 銀行名稱不正確
  /** 分行名稱不正確 */
  BRANCH_NAME_INCORRECT = 9006,  // 分行名稱不正確
  /** 銀行帳戶不存在 */
  BANK_ACCOUNT_NOT_FOUND = 9007,  // 銀行帳戶不存在
  /** 手機號碼未綁定 */
  PHONE_NOT_BOUND = 9008, // 手機號碼未綁定
  /** 手機號碼未驗證 */
  PHONE_NOT_VERIFIED = 9009,  // 手機號碼未驗證
  /** 手機已驗證過 */
  PHONE_HAS_BEEN_VERIFIED = 9010,  // 手機已驗證過
  /** 信箱已驗證過 */
  EMAIL_HAS_BEEN_VERIFIED = 9011,  // 信箱已驗證過

  // ===== deposit ===== #
  /** 商戶單號已經存在 */
  TICKET_NUMBER_IS_EXIST = 9200,  // 商戶單號已經存在
  /** 訂單非正確狀態 */
  TICKET_NOT_IN_PROCESSING = 9201,  // 訂單非正確狀態
  /** 三方單不存在 */
  TICKET_NOT_EXIST = 9202,  // 三方單不存在
  /** 渠道不存在 */
  DEPOSIT_CHANNEL_NOT_EXIST = 9203,  // 渠道不存在
  /** 設定不存在 */
  DEPOSIT_CHANNEL_SETTING_NOT_EXIST = 9204,  // 設定不存在
  /** 訂單不存在 */
  DEPOSIT_TICKET_NOT_FOUND = 9205,  // 訂單不存在
  /** 請求上游失敗 */
  REQUEST_UPSTREAM_FAILED = 9206,  // 請求上游失敗
  /** payment link 過期 */
  LINK_EXPIRED = 9207,  // payment link 過期
  /** 找不到單號 */
  SERIAL_NUMBER_MISSING = 9208,  // 找不到單號
  /** 回調金額與單子不匹配 */
  TICKET_AMOUNT_NOT_MATCH = 9209,  // 回調金額與單子不匹配

  // ===== withdraw ===== #
  /** 沒有更佳的費率 */
  NOT_FOUND_BETTER_COST_RATE = 9300,  // 沒有更佳的費率
  /** 失敗 */
  FAILED = 9301,  // 失敗
  /** 電商訂單不足 */
  NOT_ENOUGH_ORDER = 9302,  // 電商訂單不足
  /** 子代付單不存在 */
  WITHDRAW_SUB_TICKET_NOT_FOUND = 9303,  // 子代付單不存在
  /** 訂單不存在 */
  WITHDRAW_TICKET_NOT_FOUND = 9304,  // 訂單不存在
  /** 無法取得提款單 */
  MSS_GET_WITHDRAW_TICKET_ERROR = 9305,  // 無法取得提款單
  /** mss查無此提款單 */
  MSS_WITHDRAW_TICKET_NOT_FOUND = 9306,  // mss查無此提款單
  /** 更新訂單失敗 */
  UPDATE_WITHDRAW_TICKET_STATUS_FAIL = 9307,  // 更新訂單失敗
  /** 找不到適合的渠道 */
  WITHDRAW_CHANNEL_NOT_EXIST = 9308,  // 找不到適合的渠道

  // ===== payment ===== #
  /** 支付渠道不存在 */
  CHANNEL_NOT_EXIST = 9400,  // 支付渠道不存在
  /** 支付渠道已存在 */
  CHANNEL_ALREADY_EXIST = 9401,  // 支付渠道已存在
  /** callback狀態錯誤 */
  CALLBACK_STATUS_WRONG = 9415,  // callback狀態錯誤
  /** 手續費設定不存在 */
  PAYMENT_FEE_SETTING_NOT_FOUND = 9416,  // 手續費設定不存在

  // ===== withdraw request ===== #
  /** 出款請求已處理完 */
  WITHDRAW_REQUEST_HAS_BEEN_PROCESSED = 9501,  // 出款請求已處理完
  /** 出款請求已被其他人上鎖 */
  WITHDRAW_REQUEST_IS_LOCKED_BY_ANOTHER_ADMIN = 9502,  // 出款請求已被其他人上鎖
  /** 維護中 */
  UNDER_MAINTENANCE = 9601,  // 維護中
  /** 請求重整 */
  REFRESH_REQUIRED = 9602,  // 請求重整
  /** 版本過時 */
  VERSION_OUT_OF_DATE = 9603,  // 版本過時

  SUSPICIOUS_CONNECTION = 205,
}



export type TDataResponse<T> = {
  data: T;
  pager?: TPager | null | undefined;
};


export type TEmpty = undefined | null;

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

export type IPhoneLoginPayload = {
  phone: string;
  password: string;
};
export type IEmailLoginPayload = {
  email: string;
  password: string;
};
export type IRequestOtpThruPhonePayload = {
  phone: string;
};
export type IVerifyOTPPayload = {
  phone: string;
  otp: string;
};

export type ISignUpPayload = {
  phone: string;
  password: string;
  otp: string;
  referral_code: string;
  visitor_id?: string;
  zone_id?: string;
  is_app: boolean;
};


export type ISignUpResponse = TSuccessResponse;

