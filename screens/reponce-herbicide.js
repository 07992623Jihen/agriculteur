import React, { useEffect, useCallback, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  Button,
} from "react-native";
import { Card, CardItem, Body } from "native-base";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HerbicideReponce = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const id = props.navigation.getParam("id");

  console.log(id);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.17:5000/api/herbicide/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.herbicide);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.17:5000/api/herbicide/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.herbicide);
    };
    sendRequest();
  }, []);
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list && (
          <View>
            <Card>
              <CardItem header bordered>
                <Text>Nom: {list.nom}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>Matière: {list.matiere}</Text>
                </Body>
              </CardItem>
              <CardItem footer bordered>
                <Text>Dose: {list.dose}</Text>
                
              </CardItem>
              <CardItem footer bordered>
                
                <Text>Stade: {list.stade}</Text>
              </CardItem>
            </Card>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

HerbicideReponce.navigationOptions = {
  headerTitle: "Herbicide",
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  map: {
    width: "100%",
    height: 265,
  },
});

export default HerbicideReponce;
