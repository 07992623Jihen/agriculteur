import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { List, ListItem, Body, Button, Text } from "native-base";
import CategoryGrid from "../components/categorie";

const Acceuil = (props) => {
  
  return (
    <List style={{ marginTop: "50%" }}>
      <ListItem>
        <Button
          primary
          style={{ marginLeft: "25%" }}
          onPress={() => {
            props.navigation.navigate({
              routeName: "login",
            });
          }}
        >
          <Text>Authentification</Text>
        </Button>
      </ListItem>
      <ListItem>
        <Button
          primary
          style={{ marginLeft: "10%" }}
          onPress={() => {
            props.navigation.navigate({
              routeName: "Calcule",
            });
          }}
        >
          <Text>Calculer condition de traitement   </Text>
        </Button>
      </ListItem>
    </List>
  );
};

Acceuil.navigationOptions = (navData) => {
  return {
    headerTitle: "Acceuil",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default Acceuil;
