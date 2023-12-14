import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotfoundPage from "./pages/NotfoundPage";
import Home from "./pages/HomePage";
const Login = lazy(() => import("./pages/LoginPage"));
const Signup = lazy(() => import("./pages/SignupPage"));
const Account = lazy(() => import("./pages/ViewAccountPage"));
const Movie = lazy(() => import("./pages/MoviePage"));
const AddMovie = lazy(() => import("./pages/AddmoviePage"));
const AddRating = lazy(() => import("./pages/AddRating"));
import Loading from "./components/Loading";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/u/account" element={<Account />} />
          <Route path="/addMovie" element={<AddMovie />} />
          <Route path="/addRating" element={<AddRating />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
