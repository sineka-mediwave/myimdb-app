import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { IMovie } from "../type";
import { getMovies, searchMovies } from "../services/api";
import Movies from "../components/PaginationMovies";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  let [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<IMovie[]>([]);

  const handleSearch = () => {
    searchMoviesApi(searchTerm);
    setSearchTerm("");
  };

  async function getMoviesFromAPI(page: number) {
    try {
      setIsLoading(true);
      const pageSize = 3;
      const response = await getMovies(page, pageSize);
      setMovies(response.data.movies);
      setTotalPages(response.data.totalCount / pageSize);
      setMessage("");
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function searchMoviesApi(s: string) {
    try {
      setIsLoading(true);
      const response = await searchMovies(s);
      setMovies(response.data);
      setMessage("");
    } catch (error: any) {
      setMessage(error.response.data.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMoviesFromAPI(currentPage);
  }, [currentPage]);

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
        </>
      )}
    </Layout>
  );
};

export default Home;
