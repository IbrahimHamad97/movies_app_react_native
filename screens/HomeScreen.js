import { View, Platform, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Loading, MovieList, TrendingMovies } from "../components";
import { getTopRated, getTrending, getUpcoming } from "../API/movieApis";
import { useDispatch, useSelector } from "react-redux";
const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

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

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    </View>
  );
};

export default HomeScreen;
