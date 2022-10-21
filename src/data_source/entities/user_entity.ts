export enum ERole {
  admin,
  user
}

export type UserEntity = {
  name: string;
  email?: string;
  id: string;
  phone?: string;
  token?: string;
  refresh_token?: string;
  role: ERole;
};
