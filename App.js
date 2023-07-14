import { Provider } from "react-redux";
import Navigation from "./navigation/navigation";
import { Store } from "./store/store";

const App = () => {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
};

export default App;
