import React, { useEffect, useCallback, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  Button,
  ImageBackground,
} from "react-native";
import { Card, CardItem, Body } from "native-base";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Reponce = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const id = props.navigation.getParam("id");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `${url}/api/reponse/demande/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.reponces);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `${url}/api/reponse/demande/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.reponces);
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
        {list &&
          list.map((row) => (
            <View style={{ ...styles.MealRow, ...styles.mealDetail }}>
              <Card>
                <View>
                  <Text style={{ fontSize: 20 }}>Nom Mauvaise herbe : </Text>
                  <Text>{row.nom}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 20 }}>Description :</Text>
                  <Text>{row.description}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 20 }}>
                    Description Stade Plature :{" "}
                  </Text>
                  <Text>{row.descriptionPlature}</Text>
                </View>

                <CardItem bordered>
                  <ImageBackground
                    source={{
                      uri: `${url}/${row.imagePlature}`,
                    }}
                    style={styles.bgImage}
                  >
                    <Text style={styles.title}></Text>
                  </ImageBackground>
                </CardItem>

                <View>
                  <Text style={{ fontSize: 20 }}>
                    {" "}
                    Description Stade Adulte :{" "}
                  </Text>
                  <Text>{row.descriptionAdulte}</Text>
                </View>

                <CardItem bordered>
                  <ImageBackground
                    source={{
                      uri: `${url}/${row.imageAdulte}`,
                    }}
                    style={styles.bgImage}
                  >
                    <Text style={styles.title}></Text>
                  </ImageBackground>
                </CardItem>
                <View>
                  <Text style={{ fontSize: 20 }}>
                    {" "}
                    Description Stade Avance :{" "}
                  </Text>
                  <Text>{row.descriptionAvance}</Text>
                </View>

                <CardItem bordered>
                  <ImageBackground
                    source={{
                      uri: `${url}/${row.imageAvance}`,
                    }}
                    style={styles.bgImage}
                  >
                    <Text style={styles.title}></Text>
                  </ImageBackground>
                </CardItem>

                <View>
                  <Text style={{ fontSize: 20 }}> Moyen de lutte : </Text>
                  <Text>{row.lutte}</Text>
                </View>

                <View>
                  <Text style={{ fontSize: 20 }}> Type de Lutte : </Text>
                  <Text>{row.typeLutte}</Text>
                </View>
                {row.herbicide != 'undefined' && <Text> {row.herbicide}</Text>}

                {row.herbicide != 'undefined' && (
                <View style={{width:'70%',marginLeft:'15%'}}>
                <Button
                  
                  title="Afficher le traitement"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: "HerbicideReponce",
                      params: {
                        id: row.herbicide,
                      },
                    });
                  }}
                />
                </View>
              )}
              </Card>

              
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

Reponce.navigationOptions = {
  headerTitle: "Réponce",
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
  bgImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
});

export default Reponce;
