import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import Landing from "../screens/landing";
import ListePlante from "../screens/liste-plante";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import DetailPlante from "../screens/detail-plante";
import ListeHerbicide from "../screens/list-herbicide";

const LandingNav = createStackNavigator(
  {
    Landing: Landing,
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

const Plante = createStackNavigator(
  {
    ListePlante: ListePlante,
    DetailPlante:DetailPlante,
    ListeHerbicide: ListeHerbicide
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


const AppNav = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: LandingNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconAntDesign name="home" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Plante: {
      screen: Plante,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconAntDesign name="profile" size={25} color="#fafafa" />;
        },
        tabBarColor: "#673ab7",
      },
    },
  },
  {
    activeColor: "white",
    shifting: true,
  }
);


export default createAppContainer(AppNav)
