import React, { useEffect, useRef, useState } from "react";
import { KEY } from "../util/constants";
import StarRating from "./StarRating";
import Loader from "./Loader";
const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");
    const countRef = useRef(0);
    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Genre: genre,
    } = movie;
    const handleAdd = () => {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDecisions: countRef.current,
        };
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    };
    useEffect(() => {
        if (userRating) countRef.current = countRef.current + 1;
    }, [userRating]);
    useEffect(() => {
        const getMovieDetails = async () => {
            setIsLoading(true);
            const res = await fetch(
                `http://www.omdbapi.com/?apiKey=${KEY}&i=${selectedId}`
            );
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        };
        getMovieDetails();
    }, [selectedId]);
    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;
        return () => {
            document.title = "usePopcorn";
        };
    }, [title]);
    return isLoading ? (
        <Loader />
    ) : (
        <div className="details">
            <header>
                <button className="btn-back" onClick={onCloseMovie}>
                    &larr;
                </button>
                <img src={poster} alt={`Poster of ${title}`} />
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>
                        <span>⭐</span>
                        {imdbRating}
                    </p>
                </div>
            </header>
            <section>
                <div className="rating">
                    {!isWatched ? (
                        <>
                            <StarRating
                                maxRating={10}
                                size={24}
                                onSetRating={setUserRating}
                            />
                            {userRating && (
                                <button className="btn-add" onClick={handleAdd}>
                                    + Add to list
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            <p>
                                You've already rated this movie :{" "}
                                {watchedUserRating} ⭐
                            </p>
                        </>
                    )}
                </div>
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
            </section>
        </div>
    );
};

export default MovieDetails;
