import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import axios from "../../utils/axios";
import "./Row.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");

	async function fetchData() {
		const request = await axios.get(fetchUrl);
		setMovies(request.data.results);
		return request;
	}

	useEffect(() => {
		fetchData();
	}, [fetchUrl]);

	const opts = {
		hights: "390",
		width: "100%",
		playerVars: {
			autoplay: true,
		},
	};

	const handlerClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(movie?.name || "")
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);

					setTrailerUrl(urlParams.get("v"));
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className="row">
			<h2>{title}</h2>
			<div className="row__posters">
				{movies.map((movie) => {
					return (
						<img
							className={`row__poster ${isLargeRow && "row__posterLarge"}`}
							key={movie.id}
							src={`${baseUrl}${
								isLargeRow ? movie.poster_path : movie.backdrop_path
							}`}
							alt={movie.name}
							onClick={() => handlerClick(movie)}
						/>
					);
				})}
			</div>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
};

export default Row;
