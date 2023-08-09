import { View, Platform, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Loading, MovieList, TrendingMovies } from "../components";
import { getTopRated, getTrending, getUpcoming } from "../API/movieApis";
import { useDispatch, useSelector } from "react-redux";
import { toastConfig } from "../helpers/Toast";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useRoute } from "@react-navigation/native";
import { getUser } from "../API/authApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../store/user/userReducer";

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getToken();
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  getToken = async () => {
    try {
      const t = await AsyncStorage.getItem("token");
      if (t) {
        const user = await getUser(t);
        if (user) dispatch(setUser(user));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const user = useSelector((state) => state.user.user);
  useEffect(() => {}, [user]);

  getTrendingMovies = async () => {
    const data = await getTrending();
    if (data && data.results) setTrending(data.results);
  };

  getUpcomingMovies = async () => {
    const data = await getUpcoming(1);
    if (data && data.results) setUpcoming(data.results);
  };

  getTopRatedMovies = async () => {
    const data = await getTopRated(1);
    if (data && data.results) setTopRated(data.results);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {upcoming.length > 0 && (
            <MovieList hideSeeAll={false} data={upcoming} title="Upcoming" />
          )}
          {topRated.length > 0 && (
            <MovieList hideSeeAll={false} data={topRated} title="Popular" />
          )}
        </ScrollView>
      )}
      <Toast config={toastConfig} />
    </View>
  );
};

export default HomeScreen;
