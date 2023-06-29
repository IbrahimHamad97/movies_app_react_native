import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { fallbackPersonImage, img185 } from "../API/movieApis";

const Cast = ({ cast, navigation }) => {
  return (
    <View className="my-6">
      <Text className="text-lg text-white mb-5 mx-4">Top Cast</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {cast.map((i, index) => {
          return (
            <View style={{ marginRight: 20 }} key={index}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Cast", i)}
              >
                <Image
                  source={{
                    uri: img185(i.profile_path) || fallbackPersonImage,
                  }}
                  resizeMode="cover"
                  className="rounded-full"
                  style={{ width: 90, height: 90, marginBottom: 10 }}
                />
              </TouchableWithoutFeedback>

              <Text className="text-sm text-white text-center">
                {i.character?.length > 10
                  ? i.character?.slice(0, 10) + "..."
                  : i.character}
              </Text>

              <Text className="text-xs text-neutral-400 text-center">
                {i.name?.length > 10 ? i.name?.slice(0, 10) + "..." : i.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cast;
