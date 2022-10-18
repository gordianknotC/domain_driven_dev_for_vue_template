export enum EUserAccount {
  admin = "admin",
  user = "user"
}

const all: EUserAccount[] = [EUserAccount.admin, EUserAccount.user];
const userOnly: EUserAccount[] = [EUserAccount.user];

export const ADMIN_GROUP = {
  all,
  userOnly
};
