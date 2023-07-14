import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
  Bars3CenterLeftIcon,
  UserIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";

const HeaderBtn = ({ icon }) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {}, [user]);
  return (
    <View>
      {icon === 1 ? (
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MagnifyingGlassIcon size={24} strokeWidth={2} color="white" />
        </TouchableOpacity>
      ) : user ? (
        <TouchableOpacity onPress={() => navigation.push("User", user)}>
          <WrenchScrewdriverIcon size={24} strokeWidth={2} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.push("Login")}>
          <UserIcon size={24} strokeWidth={2} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderBtn;
