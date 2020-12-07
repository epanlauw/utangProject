type Gender = "Male" | "Female";

export type User = {
  id: number;
  role: number;
  email: string;
  name: string;
  date_of_birth: Date;
  gender: Gender;
  avatar_url: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  gender: Gender;
  avatar_url: string;
  id_role: number;
};

export type AuthRequest = LoginRequest | RegisterRequest;
export type AuthType = 'register' | 'login'
