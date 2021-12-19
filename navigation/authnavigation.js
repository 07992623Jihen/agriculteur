import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Acceuil from "../screens/acceuil";
import Calcule from "../screens/calcule";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Login from "../screens/login";
import Signup from "../screens/signup";
import ChatScreen from "../screens/chat";

const Auth = createStackNavigator(
  {
    Acceuil:Acceuil,
    login: Login,
    Signup: Signup,
    Calcule:Calcule
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#006400",
      },
      headerTintColor: "white",
    },
  }
);


export default createAppContainer(Auth)