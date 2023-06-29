import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { ArrowLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { theme } from "../theme/theme";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading, MovieList } from "../components";
import {
  fallbackPersonImage,
  getActor,
  getActorMovies,
  img185,
} from "../API/movieApis";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "py-4 px-6";
const Actor = () => {
  const { params: actor } = useRoute();
  const navigation = useNavigation();
  const [isFav, setfav] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dets, setDets] = useState();

  useEffect(() => {
    getDets();
    getMovies();
  }, [actor]);

  const getDets = async () => {
    const res = await getActor(actor.id);
    setDets(res);
    setLoading(false);
  };

  const getMovies = async () => {
    const res = await getActorMovies(actor.id);
    setMovies(res.cast);
  };

  return (
    <ScrollView
      className="bg-neutral-900 flex-1"
      showsHorizontalScrollIndicator={false}
    >
      {loading ? (
        <Loading />
      ) : (
        <View>
          <SafeAreaView
            className={
              "justify-between items-center flex-row w-full absolute z-20 " +
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
                color={isFav ? "red" : "white"}
              />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={{ marginTop: height * 0.15, marginBottom: 16 }}>
            <View className="rounded-full border-neutral-500">
              <Image
                source={{
                  uri: img185(actor.profile_path) || fallbackPersonImage,
                }}
                style={{ width: 200, height: 200 }}
                className="rounded-full mx-auto mb-4"
                resizeMode="cover"
              />
            </View>
            <Text className="text-3xl text-white text-center">
              {actor.name}
            </Text>
            <Text className="text-base text-neutral-400 text-center">
              {actor.place_of_birth}
            </Text>
          </View>

          <View
            className="bg-neutral-700 mb-4 justify-between items-center
         p-4 flex-row mx-3 rounded-full"
          >
            <View className=" border-white">
              <Text className="text-sm text-center text-white">Gender</Text>
              <Text className="text-xs text-center text-neutral-300">
                {dets.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className=" border-white">
              <Text className="text-sm text-center text-white">Birthday</Text>
              <Text className="text-xs text-center text-neutral-300">
                {dets.birthday || "-"}
              </Text>
            </View>
            <View className=" border-white">
              <Text className="text-sm text-center text-white">Known For</Text>
              <Text className="text-xs text-center text-neutral-300">
                {dets.known_for_department || "-"}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-center text-white">Popularity</Text>
              <Text className="text-xs text-center text-neutral-300">
                {dets.popularity || "-"}
              </Text>
            </View>
          </View>

          <View className="mx-6 mb-4">
            <Text className="text-base text-white">Biography</Text>
            <Text className="text-sm text-neutral-600 tracking-wide">
              {dets.biography || "No Information Available"}
            </Text>
          </View>
        </View>
      )}

      {!loading && (
        <MovieList title="Known For" data={movies} hideSeeAll={true} />
      )}
    </ScrollView>
  );
};

export default Actor;
