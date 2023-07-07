import { Provider } from "react-redux";
import Navigation from "./navigation/navigation";
import { Store } from "./store/store";

const App = () => {
  // return (
  //   <Provider store={Store}>
  //     <Navigation />
  //   </Provider>
  // );
  return <Navigation />;
};

export default App;
