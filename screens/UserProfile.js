import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading, MovieCard } from "../components";
import {
  PencilIcon,
  XCircleIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import { getTrending, img185, img500 } from "../API/movieApis";
import { editProfile, signOut, uploadUserImage } from "../API/authApis";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/user/userReducer";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from "react-native-progress";
import Toast, { BaseToast } from "react-native-toast-message";

const { width, height } = Dimensions.get("window");
const UserProfile = () => {
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

  let { params: user } = useRoute();
  const navigation = useNavigation();
  const [username, setUsername] = useState(user.username);
  const [description, setDescription] = useState(user.description);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [image, setImage] = useState(user.image);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  getTrendingMovies = async () => {
    const data = await getTrending();
    if (data && data.results) setTrending(data.results);
  };

  const dispatch = useDispatch();
  const signout = async () => {
    // Alert.alert("Alert Title", "My Alert Msg", [
    //   {
    //     text: "Cancel",
    //     onPress: () => console.log("Cancel Pressed"),
    //     style: "cancel",
    //   },
    //   { text: "OK", onPress: () => console.log("OK Pressed") },
    // ]);
    if (isEditMode) setEditMode(false);
    else {
      try {
        setLoading(true);
        if (await signOut()) {
          dispatch(setToken(null));
          dispatch(setUser(null));
          navigation.navigate("Home");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const [activeTab, setActiveTab] = useState("movies");
  const handleTabPress = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  const handleUsername = (e) => {
    setUsername(e);
  };

  const handleDesc = (e) => {
    setDescription(e);
  };

  const uploadImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted")
        alert("Permission to access gallery was denied.");
      else if (status === "granted") {
        setImageLoading(true);
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          base64: true,
        });
        if (!result.canceled) {
          let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
          const img = await uploadUserImage(base64Img);
          if (img) {
            setImage({
              url: img.secure_url,
              public_id: img.public_id,
            });
          }
        }
        setImageLoading(false);
      }
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Image size must be under 10MB",
      });
      setImageLoading(false);
    }
  };

  const saveChanges = async () => {
    if (!isEditMode) setEditMode(true);
    else {
      try {
        setLoading(true);
        if (!username) return;
        user.username = username;
        user.description = description;
        const token = await AsyncStorage.getItem("token");
        const body = {
          username,
          description,
          image,
          token,
          id: user._id,
        };
        const data = await editProfile(body);
        if (data) {
          dispatch(setUser(data));
          setLoading(false);
          Toast.show({
            type: "success",
            text1: "Congrats!",
            text2: "You have Updated your profile ^^",
          });
        }
        setEditMode(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {loading ? (
        <Loading />
      ) : (
        <View className="flex-1">
          {isEditMode ? (
            <View
              className="mx-auto mb-4 flex-row items-center"
              style={{ marginTop: height * 0.05, width: width * 0.9 }}
            >
              <View className="relative mr-4 rounded-full">
                {imageLoading ? (
                  <View
                    className="justify-center items-center rounded-full bg-neutral-900"
                    style={{ width: width * 0.3, height: height * 0.15 }}
                  >
                    <Progress.CircleSnail
                      thickness={8}
                      size={80}
                      color="orange"
                    />
                  </View>
                ) : (
                  <View>
                    <Image
                      source={
                        image
                          ? { uri: image.url }
                          : require("../assets/nophoto.png")
                      }
                      className="rounded-full"
                      style={{ width: width * 0.3, height: height * 0.15 }}
                      resizeMode="center"
                      name="avatar"
                    />
                    <TouchableOpacity
                      className="absolute z-20 rounded-full items-center justify-center"
                      style={{ width: width * 0.3, height: height * 0.15 }}
                      onPress={() => uploadImage()}
                    >
                      <View className="bg-black opacity-50 rounded-full w-full h-full"></View>
                      <PencilSquareIcon
                        size={32}
                        strokeWidth={2}
                        color="white"
                        style={{ position: "absolute", zIndex: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View className="flex-col flex-1">
                <TextInput
                  className="rounded-lg text-white mb-2 border-orange-400 border p-2"
                  placeholder="Username"
                  placeholderTextColor="lightgray"
                  onChangeText={(e) => handleUsername(e)}
                  value={username}
                />
                <TextInput
                  className="rounded-lg text-white border-orange-400 border p-2"
                  placeholder="Description"
                  placeholderTextColor="lightgray"
                  onChangeText={(e) => handleDesc(e)}
                  value={description}
                  multiline={true}
                  numberOfLines={3}
                />
              </View>
            </View>
          ) : (
            <View
              className="mx-auto mb-4 flex-row items-center"
              style={{ marginTop: height * 0.05, width: width * 0.9 }}
            >
              <Image
                source={
                  image ? { uri: image.url } : require("../assets/nophoto.png")
                }
                className="rounded-full mr-4"
                style={{ width: width * 0.3, height: height * 0.15 }}
                resizeMode="cover"
              />
              <View className="flex-col flex-1">
                <Text className="text-lg text-white">{user?.username}</Text>
                <Text className="text-neutral-400">{user.description}</Text>
              </View>
            </View>
          )}

          <View
            style={{ width: width * 0.9 }}
            className="mx-auto flex-row justify-between mb-4"
          >
            <TouchableOpacity
              className="bg-red-600 rounded-lg py-3 flex-row items-center justify-center"
              style={{ width: "48%" }}
              onPress={() => signout()}
            >
              <XCircleIcon size={16} strokeWidth={2} color="white" />
              <Text className="text-white text-center ml-2">
                {isEditMode ? "Cancel" : "Log Out"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-orange-400 rounded-lg py-3 flex-row items-center justify-center"
              style={{ width: "48%" }}
              onPress={() => saveChanges()}
            >
              <PencilIcon size={16} strokeWidth={2} color="white" />
              <Text className="text-white text-center ml-2">
                {isEditMode ? "Save Changes" : "Edit Profile"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            className="mx-auto flex-row mb-4 bg-black rounded-3xl"
            style={{ marginLeft: width * 0.05 }}
          >
            <TouchableOpacity
              style={[activeTab === "movies" && { backgroundColor: "white" }]}
              onPress={() => handleTabPress("movies")}
              className="py-2 px-6 rounded-3xl bg-black"
            >
              <Text
                style={[
                  activeTab === "movies" && {
                    color: "black",
                  },
                ]}
                className="text-white text-center"
              >
                Movies
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[activeTab === "actors" && { backgroundColor: "white" }]}
              onPress={() => handleTabPress("actors")}
              className="py-2 px-6 rounded-3xl bg-black"
            >
              <Text
                style={[
                  activeTab === "actors" && {
                    color: "black",
                  },
                ]}
                className="text-white text-center"
              >
                Actors
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: width * 0.9 }} className="mx-auto flex-1">
            <Text className="text-xl text-white mb-4">
              Favorite {activeTab === "movies" ? "Movies" : "Actors"}
            </Text>
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                rowGap: 8,
              }}
            >
              {activeTab === "actors"
                ? user.facoriteActors?.map((item, index) => (
                    <TouchableOpacity key={index}>
                      <Image
                        source={{ uri: img185(item.profile_path) }}
                        resizeMode="center"
                        className="rounded-full"
                        style={{ width: width * 0.25, height: height * 0.13 }}
                      />
                      <Text className="text-white text-sm text-center mt-1">
                        {item.name?.length > 10
                          ? item.name?.slice(0, 10) + "..."
                          : item.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                : user.favorites.map((item, index) => (
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("Movie", item)}
                      key={index}
                    >
                      <View>
                        <Image
                          className="rounded-3xl"
                          source={{ uri: img500(item.poster_path) }}
                          style={{ width: width * 0.26, height: height * 0.18 }}
                        />
                        <Text className="text-white text-sm">
                          {item.title?.length > 10
                            ? item.title?.slice(0, 10) + "..."
                            : item.title}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
            </ScrollView>
          </View>
        </View>
      )}
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default UserProfile;
