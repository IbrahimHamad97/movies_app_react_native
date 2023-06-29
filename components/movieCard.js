import React from "react";
import { Image, TouchableWithoutFeedback } from "react-native";
import { img500 } from "../API/movieApis";

export const MovieCard = ({ movie, onPress, width, height }) => {
  const base = "https://image.tmdb.org/t/p/original";
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        className="rounded-3xl"
        source={{ uri: img500(movie.poster_path) }}
        style={{ width: width, height: height }}
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
