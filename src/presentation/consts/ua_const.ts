export enum EUserAdmin {
  admin="admin",
  user="user",
}

const all: EUserAdmin[] = [EUserAdmin.admin, EUserAdmin.user];
const userOnly: EUserAdmin[]  = [EUserAdmin.user];

export const ADMIN_GROUP = {
  all,
  userOnly
}

