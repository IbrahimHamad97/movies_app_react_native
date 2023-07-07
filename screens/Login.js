import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView className="bg-neutral-800 flex-1 justify-center items-center">
      <View>
        <Text className="text-2xl text-white">Login</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
