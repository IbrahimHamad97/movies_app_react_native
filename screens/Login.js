import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";

const { width, height } = Dimensions.get("window");
const Login = () => {
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const [isLogin, setLogin] = useState(true);
  const handleEmail = (e) => {};
  const handleUsername = (e) => {};
  const handlePassword = (e) => {};
  return (
    <SafeAreaView className="bg-neutral-800 flex-1 justify-center items-center">
      {/* <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-orange-400 rounded-xl py-1 px-2 absolute z-20 top-8 left-8 flex-row items-center"
      >
        <ChevronLeftIcon strokeWidth={2.5} size="24" color="white" />
        <Text className="text-base text-white">Home</Text>
      </TouchableOpacity> */}
      <View style={{ width: width }} className="px-8">
        <Text className="text-3xl text-white text-center mb-8">
          {isLogin ? "Login to your account" : "Create a new account"}
        </Text>
        <TextInput
          className="rounded-lg text-white mb-4 border-orange-400 border p-4"
          placeholder="Email"
          placeholderTextColor="lightgray"
          onChangeText={(e) => handleEmail(e)}
          textContentType="emailAddress"
        />
        {!isLogin && (
          <TextInput
            className="rounded-lg text-white mb-4 border-orange-400 border p-4"
            placeholder="Display Name"
            placeholderTextColor="lightgray"
            onChangeText={(e) => handleUsername(e)}
          />
        )}
        <View className="flex-row items-center">
          <TextInput
            className="rounded-lg text-white border-orange-400 border p-4 flex-1 mr-6"
            placeholder="Password"
            placeholderTextColor="lightgray"
            onChangeText={(e) => handlePassword(e)}
            textContentType="password"
            secureTextEntry={hidePass ? true : false}
          />
          <Icon
            name={hidePass ? "eye-slash" : "eye"}
            onPress={() => setHidePass(!hidePass)}
            color="rgb(251 146 60)"
            size={20}
          />
        </View>
        <TouchableOpacity className="my-4 text-left">
          <Text className="text-sm text-orange-400 text-center">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-2 w-3/4 bg-orange-400 rounded-lg mx-auto mb-4">
          <Text className="text-base text-white text-center">LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLogin(!isLogin)}>
          <Text className="text-sm text-orange-400 text-center">
            {isLogin
              ? "Don't have an account? Sign up!"
              : "Already got an account? Login!"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
