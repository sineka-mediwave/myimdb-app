import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { IMovie } from "../type";
import { getMovies } from "../services/api";
import Movies from "../components/PaginationMovies";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  let [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByMovie, setsortByMovie] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<IMovie[]>([]);

  const handleSearch = () => {
    getMoviesFromAPI(searchTerm, currentPage, sortByMovie);
  };

  async function getMoviesFromAPI(s: string, page: number, sortby: string) {
    try {
      setIsLoading(true);
      const pageSize = 3;
      const response = await getMovies(s, page, pageSize, sortby);
      setMovies(response.data.movies);
      setTotalPages(response.data.totalCount / pageSize);
      setMessage("");
    } catch (error: any) {
      setMessage(error.message || error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMoviesFromAPI(searchTerm, currentPage, sortByMovie);
  }, [currentPage, sortByMovie]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleMovieSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setsortByMovie(e.target.value);
  };

  return (
    <Layout title="MyIMDb">
      {isLoading ? (
        <p>Loading Movies..</p>
      ) : (
        <>
          <div className="search-container">
            <input
              type="text"
              className="movie-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by movie title..."
            />
            <button className="search-button" onClick={handleSearch}>
              search
            </button>
            <select
              className="filter-button"
              onChange={(e) => handleMovieSort(e)}
              defaultValue="title"
            >
              <option value="title" disabled>
                title
              </option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            {/* <select
              className="filter-button"
              // onChange={(e) => handleMovieSort(e)}
            >
              <option value="OverallRating" disabled>
                rating
              </option>
              <option value="high">max</option>
              <option value="low">min</option>
            </select> */}
          </div>
          {message && <p className="error">{message}</p>}
          <Movies movies={movies} />

          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage == Math.ceil(totalPages)}
            >
              Next Page
            </button>
          </div>
          {/* <Stack spacing={2}>
            <Pagination
              count={totalPages}
              variant="outlined"
              color="secondary"
              onChange={}
            />
          </Stack> */}
        </>
      )}
    </Layout>
  );
};

export default Home;
