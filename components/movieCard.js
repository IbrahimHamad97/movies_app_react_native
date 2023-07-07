import React from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { img500 } from "../API/movieApis";

export const MovieCard = ({ movie, onPress, width, height, showTitle }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <Image
          className="rounded-3xl"
          source={{ uri: img500(movie.poster_path) }}
          style={{ width: width, height: height }}
        />
        {showTitle && (
          <Text className="text-white text-sm">
            {movie.title?.length > 10
              ? movie.title?.slice(0, 10) + "..."
              : movie.title}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
