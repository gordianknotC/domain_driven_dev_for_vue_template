const tw = {
  add: "添加信息",
  edit: "编辑信息",
  delete: "删除信息",
  update: "更新信息",
    //
  supplierList: "供應商名單",
  humanResource: "人力範本",
  dashboard: "總覧",
  announcements: "公告",
  projectManagement: "案件管理",
  userAccountControl: "權限管理",
    //
  backText: "回到信息",
  material: "通用材料",
  dialogText: "您确定要{dialog_text}公告吗？",
  notFound: "404 找不到",
  errorCodes: {
    networkError: "網路連線異常",
    internalError: "內部錯誤"
  },
  routes: {
    home: "總覧",
    supplierList: "供應商名單",
    humanResource: "人力範本",
    dashboard: "總覧",
    announcements: "公告",
    projectManagement: "案件管理",
    userAccountControl: "權限管理",
  }
};

export default tw;

export type LocaleObject = typeof tw;
export type LocaleKeys = keyof LocaleObject;
