import "react-native-gesture-handler";
import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Details from "./screens/Details";
import Home from "./screens/Home";
import { CardStyleInterpolators } from "@react-navigation/stack";

const data = [
  { id: 1, el: 1 },
  { id: 2, el: 2 },
  { id: 3, el: 3 },
  { id: 4, el: 4 },
  { id: 5, el: 5 },
  { id: 6, el: 6 },
  { id: 7, el: 7 },
  { id: 8, el: 8 },
  { id: 9, el: 9 },
  { id: 10, el: 10 },
  { id: 11, el: 11 },
  { id: 12, el: 12 },
  { id: 13, el: 13 },
  { id: 14, el: 14 },
  { id: 15, el: 15 },
];

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            cardStyleInterpolator:
              Platform.OS === "android"
                ? CardStyleInterpolators.forNoAnimation
                : CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            cardStyleInterpolator:
              Platform.OS === "android"
                ? CardStyleInterpolators.forNoAnimation
                : CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
