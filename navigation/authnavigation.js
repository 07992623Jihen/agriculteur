import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Acceuil from "../screens/acceuil";
import Calcule from "../screens/calcule";

import Login from "../screens/login";
import Signup from "../screens/signup";

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
        backgroundColor: "#4a148c",
      },
      headerTintColor: "white",
    },
  }
);

export default createAppContainer(Auth)