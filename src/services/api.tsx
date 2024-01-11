import axios from "axios";
import {
  IMovie,
  IRating,
  IUserData,
  IChangePassword,
  IForgetPassword,
} from "../type";

const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:3456",
});

const setHeaders = () => {
  const token = localStorage.getItem("token");
  let headers = {};
  if (token) {
    headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return headers;
};

// const token = localStorage.getItem("token");
// if (!token) {
//   axiosInstance.post("/login");
// }
export const addUser = (payload: IUserData) => {
  return axiosInstance.post("/signup", payload);
};

export const getToken = (payload: IUserData) => {
  return axiosInstance.post("/login", payload);
};

export const forgetPasswordApi = (payload: IForgetPassword) => {
  return axiosInstance.post("/forget-password", payload);
};

export const getMovies = (
  search: string,
  page: number,
  pagesize: number,
  sortby: string
) => {
  return axiosInstance.get(
    `/movies?search=${search}&page=${page}&pagesize=${pagesize}&sortby=${sortby}`
  );
};

// export const getUser = () => {
//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };
//   return axiosInstance.get("/u/account", { headers });
// };

export const getUser = () => {
  return axiosInstance.get("/u/account", setHeaders());
};

export const updateUser = (payload: IUserData) => {
  return axiosInstance.put("/u/account", payload, setHeaders());
};
export const updateUserPassword = (payload: IChangePassword) => {
  return axiosInstance.put("/u/account/password", payload, setHeaders());
};

export const addMovie = (payload: FormData) => {
  return axiosInstance.post("/movies", payload, setHeaders());
};

export const updateMovie = (payload: IMovie, movieId: number) => {
  return axiosInstance.put(`/movies/${movieId}`, payload, setHeaders());
};

export const deleteMovieApi = (movieId: string) => {
  return axiosInstance.delete(`/movies/${movieId}`, setHeaders());
};

export const getMovie = async (movieId: string) => {
  return axiosInstance.get(`/movies/${movieId}`, setHeaders());
};

export const addRating = (payload: IRating, movieId: string) => {
  return axiosInstance.post(`/movies/${movieId}/rating`, payload, setHeaders());
};
