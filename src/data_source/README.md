# data source
- core
  可以理解為所有用於 **直接處理資料層級的 Service**, data access logic
    > impl 為 implementation 的縮寫，代表界面的實作
    >
    > interfaces 為界面定義   

- entities
  代表對應 data base （DAL-DataAccessLayer) 接口的資料別，以前端而言指的是 API 直接回傳未經修改的資料型別. 

- mappers
  用來轉換資料型別所需的 mapper, 主要提供以下三種轉換，分別對應不同 layer
  1) entity model > domain model / view model
  2) domain model > view model / domain model
  3) view model > domain model / entity model
  
  1 用於 data access layer 將資料轉入 business logic 處理
  
  2 用於 business logic 將資料理理完後送到 ui render
  
  3 用於 ui 將資料回傳到 business logic 再傳入 data access layer
  
- repositories
  直接存取資料層級的的接口 data access io，不涉及邏輯，如與邏輯相關則定義為 data access logic，需實作在 core 當中
  

## core
- encrypt_service_impl
  資料加密/解密
  
- local_client_service_impl
  本地存取資料
  
- remote_client_service_impl
  遠端存取資料

- request_plugins_impl
  遠端 request 邏輯，以責任鍊方式實作  
  - UpdateRequestHeaderGuard
    用於每個 request 前，更新 request header

- response_plugins_impl
  遠端 response 邏輯，以責任鍊方式實作
  - AuthResponseGuardImpl
    用於處理當 response 判定為 refresh token 過期時，處理 token 換發機制

- socket_client_service_impl
  websocket service



## entities

## mappers

## repositories
