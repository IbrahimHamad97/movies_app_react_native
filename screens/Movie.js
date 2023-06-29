import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieList from "../components/movieList";
import { theme } from "../theme/theme";
import { Cast, Loading } from "../components";
import {
  getCredits,
  getMovieDetails,
  getSimilar,
  img500,
} from "../API/movieApis";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "py-4 px-6";
const Movie = () => {
  const navigation = useNavigation();
  const { params: movie } = useRoute();
  const [isFav, setfav] = useState(false);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieDets, setMovieDets] = useState();

  useEffect(() => {
    getDetails();
    getSim();
    getCredit();
  }, []);

  const getDetails = async () => {
    const res = await getMovieDetails(movie.id);
    setMovieDets(res);
  };

  const getSim = async () => {
    const res = await getSimilar(movie.id);
    setSimilar(res.results);
  };

  const getCredit = async () => {
    const res = await getCredits(movie.id);
    setCast(res.cast);
  };

  return (
    <ScrollView
      className="bg-neutral-900"
      showsHorizontalScrollIndicator={false}
    >
      <View>
        <SafeAreaView
          className={
            "justify-between items-center flex-row absolute z-20 w-full " +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-orange-400 rounded-xl p-1"
          >
            <ChevronLeftIcon strokeWidth={2.5} size="28" color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setfav(!isFav)}>
            <HeartIcon
              strokeWidth={2.5}
              size="35"
              color={isFav ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <View>
          <Image
            source={{ uri: img500(movie.poster_path) }}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
          />
        </View>
      </View>

      <View style={{ marginTop: -(height * 0.1) }} className="space-y-3">
        <Text className="text-3xl text-white text-center mx-4">
          {movie.title}
        </Text>
        <Text className=" text-neutral-400 text-center text-base mx-4">
          {movieDets?.status} - {movieDets?.release_date?.split("-")[0]} -{" "}
          {movieDets?.runtime + " mins"}
        </Text>
        <View className="justify-center flex-row mx-4 flex-wrap">
          {movieDets?.genres?.map((genre, index) => (
            <Text
              className=" text-neutral-400 text-center text-base"
              key={genre.id}
            >
              {genre.name} {index === movieDets.genres.length - 1 ? "" : " - "}
            </Text>
          ))}
        </View>
        <Text className=" text-neutral-400 text-center text-base tracking-wide mx-4">
          {movie.overview}
        </Text>
      </View>

      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}

      {similar.length > 0 && (
        <MovieList title="Similar Movies" data={similar} hideSeeAll={true} />
      )}
    </ScrollView>
  );
};

export default Movie;
