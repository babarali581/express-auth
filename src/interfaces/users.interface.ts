export interface User {
  isAdmin: boolean;
  isAdmn: boolean;
  role: string;
  _id: string;
  email: string;
  password: string;
}

export interface Users extends Array<User>{}
