import { useState, useEffect } from "react";
import { KEY } from "../util/constants";
export const useMovies = (query) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchMovies = () => {
            setTimeout(async () => {
                try {
                    setIsLoading(true);
                    setError("");
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
                    );
                    if (!res.ok)
                        throw new Error("Error in fetching movie list");
                    const data = await res.json();
                    if (data.Response === "False")
                        throw new Error("Movie not found");
                    setMovies(data.Search);
                } catch (error) {
                    console.error(error);
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }, 900);
        };
        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        fetchMovies();
        return () => clearTimeout(fetchMovies);
    }, [query]);
    return [movies, error, isLoading];
};
