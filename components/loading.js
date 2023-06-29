import { Dimensions, View } from "react-native";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("window");

export const Loading = () => {
  return (
    <View
      className="absolute justify-center items-center z-10"
      style={{ width, height }}
    >
      <Progress.CircleSnail thickness={10} size={120} color="orange" />
    </View>
  );
};

export default Loading;
