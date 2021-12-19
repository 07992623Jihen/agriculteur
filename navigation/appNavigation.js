import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import Landing from "../screens/landing";
import ListePlante from "../screens/liste-plante";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import DetailPlante from "../screens/detail-plante";
import ListeHerbicide from "../screens/list-herbicide";
import ListReclamation from "../screens/list-reclamation";
import Reponce from "../screens/reponce";
import HerbicideReponce from "../screens/reponce-herbicide";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Meteo from "../screens/meteo";
import ChatScreen from "../screens/chat";
import AntDesign from "react-native-vector-icons/AntDesign";


const LandingNav = createStackNavigator(
  {
    Landing: Landing,
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

const ReclamationNav = createStackNavigator(
  {
    ListReclamation: ListReclamation,
    Reponce:Reponce,
    HerbicideReponce: HerbicideReponce
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

const Plante = createStackNavigator(
  {
    ListePlante: ListePlante,
    DetailPlante:DetailPlante,
    ListeHerbicide: ListeHerbicide
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

const MeteoNav = createStackNavigator(
  {
    Meteo:Meteo,
    
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

const ChatNav = createStackNavigator(
  {
    ChatScreen:ChatScreen,
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


const AppNav = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: LandingNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconAntDesign name="home" size={25} color="#fafafa" />;
        },
        tabBarColor: "#006400",
      },
    },
    Plante: {
      screen: Plante,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconAntDesign name="profile" size={25} color="#fafafa" />;
        },
        tabBarColor: "#006400",
      },
    },
    Reclamations: {
      screen: ReclamationNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Entypo name="list" size={25} color="#fafafa" />;
        },
        tabBarColor: "#006400",
      },
    },
    Meteo: {
      screen: MeteoNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <MaterialCommunityIcons name="weather-cloudy-alert" size={25} color="#fafafa" />;
        },
        tabBarColor: "#006400",
      },
    },
    Chat: {
      screen: ChatNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <AntDesign name="message1" size={25} color="#fafafa" />;
        },
        tabBarColor: "#006400",
      },
    },
  },
  {
    activeColor: "white",
    shifting: true,
  }
);


export default createAppContainer(AppNav)
