import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import Numresults from "./components/Numresults";
import Box from "./components/Box";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedSummary from "./components/WatchedSummary";
import MovieList from "./components/MovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorageState";
export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [movies, error, isLoading] = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], "watched");
    const handleSelectMovie = (id) => {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    };
    const handleCloseMovie = () => {
        setSelectedId(null);
    };
    const handleAddWatched = (movie) => {
        setWatched((watched) => [...watched, movie]);
    };
    const handleDeleteWatched = (id) => {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    };

    return (
        <>
            <Navbar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <Numresults movies={movies} />
            </Navbar>
            <Main>
                <Box>
                    {!error && !isLoading && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && !isLoading && <ErrorMessage message={error} />}
                    {!error && isLoading && <Loader />}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
