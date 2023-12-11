export interface IMovie {
  user_id: string;
  image: string;
  title: string;
  story?: string;
  language?: string;
  year: number | undefined;
}

export interface IUserData {
  first_name?: string;
  last_name?: string;
  user_name?: string;
  email: string;
  user_password: string;
}

export interface IShowError {
  action: string;
  msg: string;
}
