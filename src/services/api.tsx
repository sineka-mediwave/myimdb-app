import axios from "axios";
import { IMovie, IUserData } from "../type";

const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:3456",
});

export const addUser = (payload: IUserData) => {
  return axiosInstance.post("/signup", payload);
};

export const getUser = (payload: IUserData) => {
  return axiosInstance.post("/login", payload);
};

export const getMovies = () => {
  return axiosInstance.get("/movies");
};

export const addMovie = (payload: IMovie) => {
  return axiosInstance.post("/movies", payload);
};

export const updateMovie = (payload: IMovie, movieId: number) => {
  return axiosInstance.put(`/movies/${movieId}`, payload);
};

export const deleteMovie = (movieId: number) => {
  return axiosInstance.delete(`/movies/${movieId}`);
};

export const getMovie = async (movieId: number) => {
  return axiosInstance.get(`/movies/${movieId}`);
};
