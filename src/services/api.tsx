import axios from "axios";
import { IMovie, IRating, IUserData } from "../type";

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

const token = localStorage.getItem("token");
if (!token) {
  axiosInstance.post("/login");
}
export const addUser = (payload: IUserData) => {
  return axiosInstance.post("/signup", payload);
};

export const getToken = (payload: IUserData) => {
  return axiosInstance.post("/login", payload);
};

export const getMovies = (page: number, pagesize: number) => {
  return axiosInstance.get(`/movies?page=${page}&pagesize=${pagesize}`);
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

export const addMovie = (payload: IMovie) => {
  return axiosInstance.post("/movies", payload, setHeaders());
};

export const updateMovie = (payload: IMovie, movieId: number) => {
  return axiosInstance.put(`/movies/${movieId}`, payload);
};

// export const deleteMovie = (movieId: number) => {
//   return axiosInstance.delete(`/movies/${movieId}`);
// };

export const getMovie = async (movieId: string) => {
  return axiosInstance.get(`/movies/${movieId}`, setHeaders());
};

export const addRating = (payload: IRating, movieId: string) => {
  return axiosInstance.post(`/movies/${movieId}/rating`, payload, setHeaders());
};
