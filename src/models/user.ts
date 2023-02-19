export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface ILoginResponse {
  token: string;
}
