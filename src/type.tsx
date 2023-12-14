export interface IMovie {
  id?: string;
  image: string;
  title: string;
  story?: string;
  language?: string;
  year: number | undefined;
  rating?: [{ rating: number }];
}

export interface IgetMovie {
  image: string;
  title: string;
  story?: string;
  language?: string;
  year: number;
  addedBy?: {
    first_name: string;
  };
  rating?: [{ userRating: { user_name: string }; rating: number }];
}
export interface IUserData {
  first_name?: string;
  last_name?: string;
  user_name?: string;
  email: string;
  user_password?: string;
}

export interface IRating {
  rating: number;
  reviews: string;
  movie_id: string;
}
export interface IShowError {
  action: string;
  msg: string;
}
