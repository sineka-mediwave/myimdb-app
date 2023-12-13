import axios from "axios";
import { IMovie, IUserData } from "../type";

const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:3456",
});

const axiosHeader = axios.create({
  baseURL: "http://0.0.0.0:3456",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const addUser = (payload: IUserData) => {
  return axiosInstance.post("/signup", payload);
};

export const getToken = (payload: IUserData) => {
  return axiosInstance.post("/login", payload);
};

export const getMovies = () => {
  return axiosInstance.get("/movies");
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  return axiosInstance.get("/u/account", { headers });
};

export const addMovie = (payload: IMovie) => {
  return axiosHeader.post("/movies", payload);
};

export const updateMovie = (payload: IMovie, movieId: number) => {
  return axiosHeader.put(`/movies/${movieId}`, payload);
};

export const deleteMovie = (movieId: number) => {
  return axiosHeader.delete(`/movies/${movieId}`);
};

export const getMovie = async (movieId: string) => {
  return axiosHeader.get(`/movies/${movieId}`);
};
