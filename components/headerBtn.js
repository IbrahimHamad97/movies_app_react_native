import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, View } from "react-native";
import {
  Bars3CenterLeftIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

const HeaderBtn = ({ icon }) => {
  const navigation = useNavigation();
  return (
    <View>
      {icon === 1 ? (
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MagnifyingGlassIcon size={24} strokeWidth={2} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.push("Login")}>
          <UserIcon size={30} strokeWidth={2} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderBtn;
