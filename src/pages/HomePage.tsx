import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { IMovie } from "../type";
import { getMovies } from "../services/api";
import "react-pagination-js/dist/styles.css"; // import css
import Movies from "../components/PaginationMovies";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<IMovie[]>([]);

  const handleSearch = () => {
    console.log("clicked search");
  };

  async function getMoviesFromAPI(page: number) {
    try {
      setIsLoading(true);
      const pageSize = 3;
      const response = await getMovies(page, pageSize);
      setMovies(response.data.movies);
      console.log(response.data.length / pageSize);
      setTotalPages(response.data.totalCount / pageSize);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
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
          <Movies movies={movies} />

          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
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
