import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Loading, MovieCard } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTopRated, getUpcoming } from "../API/movieApis";
import * as Progress from "react-native-progress";
import { ChevronLeftIcon, ArrowLeftIcon } from "react-native-heroicons/outline";

const { width, height } = Dimensions.get("window");
const AllMovies = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [initLoader, setInitLoader] = useState(true);
  const [newMovies, setNewMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMovies();
  }, [page]);

  getMovies = async () => {
    if (page !== 1) setLoading(true);
    console.log("page", page);
    let data;
    if (params.title === "Upcoming") data = await getUpcoming(page);
    else data = await getTopRated(page);
    if (data && data.results)
      setNewMovies([...newMovies, ...data.results.slice(0, 18)]);
    console.log(newMovies.length);
    setLoading(false);
    if (page === 1) setInitLoader(false);
  };

  const renderLoader = () => {
    return loading ? (
      <View className="justify-center items-center w-full py-4">
        <Progress.CircleSnail color="orange" size={80} thickness={10} />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setPage(page + 1);
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1 p-4 pb-8">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="px-2">
          <ArrowLeftIcon strokeWidth={2} size="30" color="white" />
        </TouchableOpacity>
        <Text className="text-xl ml-2 text-white text-center">
          {params.title.toUpperCase()}
        </Text>
      </View>
      {initLoader ? (
        <Loading />
      ) : (
        <View className="my-4">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={newMovies}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            numColumns={3}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                onPress={() => navigation.navigate("Movie", item)}
                width={width * 0.28}
                height={height * 0.25}
                showTitle={true}
              />
            )}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0}
            ListFooterComponent={renderLoader}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllMovies;
