import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DetailPlante = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.17:5000/api/mauvaiseHerbe/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.mauvaiseHerbe);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  const id = props.navigation.getParam("id");
  console.log(id);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.17:5000/api/mauvaiseHerbe/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.mauvaiseHerbe);
    };
    sendRequest();
  }, []);
  console.log(list.image);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.mealItem}>
        <TouchableOpacity>
          <View style={{ ...styles.MealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: `http://192.168.1.17:5000/${list.image}` }}
              style={styles.bgImage}
            >
              <Text style={styles.title}>{list.nom}</Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.MealRow, ...styles.mealDetail }}>
        <View>
          <Text style={{ fontSize: 20 }}>Type: </Text>
          <Text>{list.type}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 20 }}>Description: </Text>
          <Text>{list.description}</Text>
        </View>
      </View>
      <View style={{ marginLeft: "40%", marginTop: 20 }}>
        <MaterialIcons
          name="local-hospital"
          size={40}
          color="#002171"
          onPress={() => {
            props.navigation.navigate({
              routeName: "ListeHerbicide",
              params: {
                id: list._id,
              },
            });
          }}
        />
        <Text>Herbicide</Text>
      </View>
    </ScrollView>
  );
};

DetailPlante.navigationOptions = (navData) => {
  return {
    headerTitle: "Mauvaise herbe",
  };
};

const styles = StyleSheet.create({
  mealItem: {
    height: 300,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
  },
  MealRow: {
    flexDirection: "column",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    alignItems: "flex-start",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center",
  },
});

export default DetailPlante;
