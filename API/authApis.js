import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../store/user/userReducer";
baseUrl = "http://192.168.100.23:3000/api/";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const signup = async (username, email, password) => {
  const body = {
    username,
    email,
    password,
  };
  try {
    const res = await axios.post(baseUrl + "signup", JSON.stringify(body), {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const login = async (email, password) => {
  const body = {
    email,
    password,
  };
  try {
    const res = await axios.post(baseUrl + "login", JSON.stringify(body), {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getUser = async (token) => {
  try {
    const res = await axios.get(baseUrl + "user", {
      headers: { ...headers, Authorization: "Bearer " + token },
    });
    return res.data.user;
  } catch (err) {
    return err;
  }
};

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem("token");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const uploadUserImage = async (image) => {
  try {
    const res = await axios.post(
      baseUrl + "uploadImage",
      { image: image },
      {
        headers: { ...headers },
      }
    );
    return res.data.image;
  } catch (err) {
    return err;
  }
};

export const editProfile = async (data) => {
  try {
    const res = await axios.post(baseUrl + "userUpdate", data, {
      headers: { ...headers },
    });
    return res.data?.user;
  } catch (err) {
    console.log(err);
  }
};
