export interface LoginBody {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}
