import React from "react";
import { Text, View, Dimensions } from "react-native";
import { Carousel } from "react-native-snap-carousel";
import MovieCard from "./movieCard";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
export const TrendingMovies = ({ data }) => {
  const nav = useNavigation();
  const goToMovie = (movie) => {
    nav.navigate("Movie", movie.item ? movie.item : movie);
  };
  return (
    <View className="mb-4">
      <Text className="text-white text-lg mx-4 my-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={(item) => (
          <MovieCard
            width={width * 0.6}
            height={height * 0.4}
            movie={item.item ? item.item : item}
            onPress={() => goToMovie(item)}
            showTitle={false}
          />
        )}
        sliderWidth={width}
        itemWidth={width * 0.6}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

export default TrendingMovies;
