import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingNav from "./navigation/appNavigation";
import Auth from './navigation/authnavigation'
import { Authcontext } from "./context/auth-context";
import { UserAuth } from "./hooks/auth";

export default function App() {
  global.url = 'http://192.168.175.105:5000';
  const { userId, token, login, logout } = UserAuth();
  
  let routes
  if(token){
    routes=<LandingNav/>
  }else{
    routes=<Auth/>
  }
  return (
    <Authcontext.Provider value={{userId:userId,token:token,login:login,logout:logout}}>
      {routes}
    </Authcontext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
