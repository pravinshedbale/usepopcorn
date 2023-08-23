import React, { useEffect, useState } from "react";
import { KEY } from "../util/constants";
import StarRating from "./StarRating";
import Loader from "./Loader";
const MovieDetails = ({ selectedId, onCloseMovie }) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;
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
                    <StarRating maxRating={10} size={24} />
                </div>
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
            </section>
            {selectedId}
        </div>
    );
};

export default MovieDetails;
