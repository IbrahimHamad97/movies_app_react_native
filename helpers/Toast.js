import Toast, { BaseToast } from "react-native-toast-message";
export const genConfig = {
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
