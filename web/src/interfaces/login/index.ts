export interface ILogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}
