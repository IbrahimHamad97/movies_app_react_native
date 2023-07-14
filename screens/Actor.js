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
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../API/authApis";
import { setUser } from "../store/user/userReducer";
import Toast, { BaseToast } from "react-native-toast-message";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "py-4 px-6";
const Actor = () => {
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "white" }}
        className="bg-green-600"
        text1Style={{
          color: "white",
        }}
        text2Style={{
          color: "white",
        }}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "white" }}
        className="bg-red-800"
        text1Style={{
          color: "white",
        }}
        text2Style={{
          color: "white",
        }}
      />
    ),
  };
  const { params: actor } = useRoute();
  const navigation = useNavigation();
  const [isFav, setfav] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dets, setDets] = useState();
  const [isFaved, setisFaved] = useState(false);

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

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    checkIds();
  }, [user]);

  const dispatch = useDispatch();
  checkIds = () => {
    for (let i = 0; i < user?.facoriteActors?.length; i++) {
      if (user?.facoriteActors[i].id === actor.id) {
        setisFaved(true);
        break;
      } else setisFaved(false);
    }
  };

  const setFavorite = async () => {
    try {
      const mov = {
        profile_path: actor.profile_path,
        name: actor.name,
        place_of_birth: actor.place_of_birth,
        id: actor.id,
      };

      let updatedFavs = user.facoriteActors;
      if (isFaved) {
        updatedFavs = updatedFavs.filter((f) => f.id !== mov.id);
        setisFaved(false);
      } else {
        updatedFavs = [...updatedFavs, mov];
        setisFaved(true);
      }

      const res = await editProfile({
        facoriteActors: updatedFavs,
        id: user._id,
        fav: true,
      });
      if (res) {
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: isFaved
            ? "Actor was removed from favorites"
            : "Actor was added to favorites",
        });
        dispatch(setUser(res));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView
      className="bg-neutral-800 flex-1"
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

            <TouchableOpacity onPress={() => setFavorite()}>
              <HeartIcon
                strokeWidth={2.5}
                size="35"
                color={isFaved ? theme.background : "white"}
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
      <Toast config={toastConfig} />
    </ScrollView>
  );
};

export default Actor;
