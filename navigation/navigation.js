import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen, Movie, Actor, Search } from "../screens";
import { HeaderBtn } from "../components";
import { icons } from "../constants";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerStyle: {
              backgroundColor: "rgb(38 38 38)",
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerRight: () => <HeaderBtn icon={1} />,
            headerTitle: "Movies",
            headerShadowVisible: false,
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Movie"
          options={{
            headerShown: false,
          }}
          component={Movie}
        />
        <Stack.Screen
          name="Cast"
          options={{
            headerShown: false,
          }}
          component={Actor}
        />
        <Stack.Screen
          name="Search"
          options={{
            headerShown: false,
          }}
          component={Search}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
