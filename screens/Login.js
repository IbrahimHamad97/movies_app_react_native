import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import { signup, login, getUser } from "../API/authApis";
import Toast, { BaseToast } from "react-native-toast-message";
import { Loading } from "../components";
import { toastConfig } from "../helpers/Toast";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/user/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const Login = () => {
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        // style={{ borderLeftColor: "rgb(153 27 27)" }}
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
        // style={{ borderLeftColor: "rgb(153 27 27)" }}
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

  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const [isLogin, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const handleEmail = (e) => {
    setEmail(e);
  };
  const handleUsername = (e) => {
    setUsername(e);
  };
  const handlePassword = (e) => {
    setPassword(e);
  };

  const submit = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Error :(",
        text2: "You are missing a valid email",
      });
      return;
    }
    if (!password || password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Sorry!",
        text2: "Password should be at least 6 letters",
      });
      return;
    }
    if (!isLogin) signUpUser();
    else loginUser();
  };

  signUpUser = async () => {
    if (!username || username.length < 3) {
      Toast.show({
        type: "error",
        text1: "Sorry!",
        text2: "Username should be at least 3 letters",
      });
      return;
    }
    setLoading(true);
    try {
      const data = await signup(username, email, password);
      if (data.error) {
        Toast.show({
          type: "error",
          text1: "Sorry!",
          text2: data.error,
        });
        setLoading(false);
        return;
      }
      if (data.token) {
        Toast.show({
          type: "success",
          text1: "Congrats!",
          text2: "You have successfully created your account :D",
        });
        await AsyncStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        const user = await getUser(data.token);
        dispatch(setUser(user));
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Sorry!",
        text2: "error doing stuff",
      });
      return;
    }
  };

  loginUser = async () => {
    try {
      setLoading(true);
      const data = await login(email, password);
      if (data.error) {
        Toast.show({
          type: "error",
          text1: "Sorry!",
          text2: data.error,
        });
        setLoading(false);
        return;
      }
      if (data.token) {
        Toast.show({
          type: "success",
          text1: "Congrats!",
          text2: "You have logged in to your account ^^",
        });
        await AsyncStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        const user = await getUser(data.token);
        dispatch(setUser(user));
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Sorry!",
        text2: "error doing stuff",
      });
      return;
    }
  };
  return (
    <SafeAreaView className="bg-neutral-800 flex-1 justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
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
            value={email}
          />
          {!isLogin && (
            <TextInput
              className="rounded-lg text-white mb-4 border-orange-400 border p-4"
              placeholder="Display Name"
              placeholderTextColor="lightgray"
              onChangeText={(e) => handleUsername(e)}
              value={username}
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
              value={password}
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
          <TouchableOpacity
            className="p-2 w-3/4 bg-orange-400 rounded-lg mx-auto mb-4"
            onPress={() => submit()}
          >
            <Text className="text-base text-white text-center">
              {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLogin(!isLogin)}>
            <Text className="text-sm text-orange-400 text-center">
              {isLogin
                ? "Don't have an account? Sign up!"
                : "Already got an account? Login!"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default Login;
