import {
  DataResponse,
  EErrorCode,
  ErrorResponse,
  SuccessResponse
} from "@/data_source/entities/response_entity";
import { facade } from "@/main";
import { IQueue } from "@gdknot/frontend_common";

import {
  RequestReplacer,
  AuthResponseGuard,
  ClientOption,
  NetworkErrorResponseGuard,
  ACFetchedMarker,
  ACTokenUpdater,
  ACAuthResponseGuard,
  ACIdleMarker ,
  AuthRequestHeaderUpdater,
  ExtraRequestHeaderUpdater,
  EClientStage,
  BaseClient,
  IBaseClient
} from "@gdknot/request_client";
import { AxiosResponse } from "axios";
import { IdentData, IRemoteClientService } from "../interfaces/remote_client_service";
import { ISocketClientService } from "../interfaces/socket_client_service";

export type AuthResponse = DataResponse<{
  token: string;
}>;

const timeout = 10 * 1000;
const baseURL = "http://localhost";

export const formatHeader = { value: { format: "mock" } };
const authUrl = "path/to/auth_url";

export const requestClientOption: ClientOption<
  DataResponse<any>,
  ErrorResponse,
  SuccessResponse
> = {
  isSuccessResponse: (s: any) => (s as SuccessResponse).succeed != undefined,
  isDataResponse: (d: any) => (d as DataResponse<any>).data != undefined,
  isErrorResponse: (e: any) => (e as ErrorResponse).error_code != undefined,
  axiosConfig: {
    baseURL,
    timeout,
  },
  requestChain: [
    new AuthRequestHeaderUpdater(function tokenGetter() {
      return facade.data.repo.user.get()?.entity[0]?.token ?? "";
    }),
    new ExtraRequestHeaderUpdater(function () {
      return formatHeader.value;
    }),
    new RequestReplacer(
      // replacementIdentifier = BaseRequestReplacer...
    ),
  ],
  responseChain: [
    new AuthResponseGuard(
    ),
    new NetworkErrorResponseGuard(
      function networkError(error){
      console.log("detect network error:", error);
    }),
  ],
  authOption: {
    axiosConfig: {
      url: authUrl,
      baseURL,
      timeout: 12000,
    },
    interval: 600,
    requestChain: [],
    responseChain: [
      new ACFetchedMarker(),
      new ACTokenUpdater(),
      new ACAuthResponseGuard(),
      new ACIdleMarker(),
    ],
    payloadGetter: function () {
      return null;
    },
    tokenGetter: function () {
      return facade.data.repo.user.get()?.entity[0]?.token ?? "";
    },
    tokenUpdater: function (response: AxiosResponse<any, any>): void {
      try{
        console.log("tokenUpdater", (response.data as any).data.token)
        const user = facade.data.repo.user;
        const entity = (user.get()?.entity[0] ?? {}) as any;
        entity.token = (response.data as any).data.token;
        facade.data.repo.user.set([entity]);
      }catch(e){
        console.error("tokenUpdater error, response:", response, "\nerror:", e);
        throw e;
      }
    },
    redirect: function (response: AxiosResponse<any, any>) {
      return null;
    },
  },
};



export class RemoteClientServiceImpl<T extends IdentData<any>>
  implements IRemoteClientService<T>
{
  private client: IBaseClient<DataResponse<T>, ErrorResponse, SuccessResponse>;
  get stage(): EClientStage{
    return this.client.stage;
  }
  constructor(public socket: ISocketClientService, public queue: IQueue<any>) {
    this.client = new BaseClient(requestClientOption);
  }
  isSuccessResponse(response: any): boolean {
    return this.client.isSuccessResponse(response);
  }
  isDataResponse(response: any): boolean {
    return this.client.isDataResponse(response);
  }
  isErrorResponse(response: DataResponse<T> | ErrorResponse | any): boolean {
    return this.client.isErrorResponse(response);
  }

  // TODO: 失敗後自我連接，直到 max retries
  private connect(): Promise<SuccessResponse| ErrorResponse> {
    return new Promise<SuccessResponse|ErrorResponse>((resolve, reject) => {
      this.socket.connect({
        success(msg: string) {
          resolve({succeed: true});
        },
        failed(msg: string) {
          const ret: ErrorResponse = {
            error_code: EErrorCode.socketConnectFailed,
            error_key: "",
            error_msg: "",
            message: ""
          };
          reject(ret);
        },
        reSuccess(msg: string) {
          resolve({succeed: true});
        },
        reFailed(msg: string) {
          const ret: ErrorResponse = {
            error_code: EErrorCode.socketConnectFailed,
            error_key: "",
            error_msg: "",
            message: ""
          };
          reject(ret);
        }
      });
    });
  }

  // TODO: 實作資料轉換(如果需要的話)
  private toResponse(rawData: any): DataResponse<T> | SuccessResponse {
    return rawData;
  }

  // async sendRequest(
  //   event: string,
  //   payload: Record<string, any>
  // ): Promise<DataResponse<T> | ErrorResponse | SuccessResponse> {
  //   this.stage = EClientStage.fetching;
  //   const payloadAsString = JSON.stringify({ event, payload });
  //   const id: number = payload.id;
  //   const self = this;
  //   const action = () => {
  //     return new Promise<DataResponse<T>|SuccessResponse>((resolve, reject) => {
  //       this.socket.send(
  //         event,
  //         payloadAsString,
  //         // FIXME: 原認知為:這裡的 socket response 為 serializable json string
  //         function onSuccess(msg: string) {
  //           const rawData = JSON.parse(msg);
  //           resolve(self.toResponse(rawData));
  //         },
  //         // FIXME: 原認知為:這裡的 socket response 為 serializable json string
  //         function onError(msg: string) {
  //           const rawData = JSON.parse(msg);
  //           reject(self.toResponse(rawData));
  //         }
  //       );
  //     });
  //   };

  //   if (this.socket.socket.connected) {
  //     return this.queue.enqueue(id, action);
  //   } else {
  //     try {
  //       const connected = await this.connect();
  //       if ((connected as TSuccessResponse).succeed) {
  //         return this.queue.enqueue(id, action);
  //       } else {
  //         const error: TErrorResponse = {
  //           error_code: 0,
  //           error_key: "",
  //           error_msg: "network error",
  //           message: "network error"
  //         };
  //         return error;
  //       }
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  // }

  // FIXME: 從設計上考量，get by event name 而不是 url, 因為使用的是 web socket 而不是 http request
  async get(
    url: string,
    payload: Record<string, any>
  ): Promise<DataResponse<T> | ErrorResponse> {
    return this.client.get(url, payload);
  }

  post(url: string, payload: Record<string, any>) {
    return this.client.post(url, payload);
  }

  put(url: string, payload: Record<string, any>) {
    return this.client.put(url, payload);
  }

  del(url: string, payload: Record<string, any>) {
    return this.client.del(url, payload);
  }
  
}
 