import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading } from "../components";
import { img342, searchMovies } from "../API/movieApis";
import { debounce } from "lodash";

const { width, height } = Dimensions.get("window");
const Search = () => {
  const navigation = useNavigation();
  const [movies, setmovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      const val = await searchMovies(search);
      setmovies(val.results);
      setLoading(false);
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View
        className="rounded-full mx-auto border-white border justify-between items-center flex-row"
        style={{ width: width * 0.9, marginTop: height * 0.02 }}
      >
        <TextInput
          className="rounded-full text-white placeholder-white flex-1 pl-6"
          placeholder="holder"
          placeholderTextColor="lightgray"
          onChangeText={handleTextDebounce}
        />
        <TouchableOpacity
          className="rounded-full bg-neutral-500 m-1 p-3"
          onPress={() => navigation.navigate("Home")}
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {movies.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl text-white">No results found.</Text>
        </View>
      ) : loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={{ width: width * 0.85 }}
          className="mx-auto my-4 flex-auto"
          showsHorizontalScrollIndicator={false}
        >
          <Text className="text-base text-white">Result {movies?.length}</Text>
          <View className="flex-row flex-wrap justify-between">
            {movies.map((movie, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.push("Movie", movie)}
                className="mb-1 py-4"
              >
                <Image
                  source={{ uri: img342(movie.poster_path) }}
                  style={{ width: width * 0.4, height: height * 0.3 }}
                  className="rounded-3xl"
                />
                <Text className="text-base text-white text-center">
                  {movie.title?.length > 14
                    ? movie.title?.slice(0, 14) + "..."
                    : movie.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;
