import React, { useState, useContext } from "react";
import { View, Image, Text, StyleSheet, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { H2, Button, Textarea } from "native-base";
import mime from "mime";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import ListeImageDycote from "../components/liste-image-dycote";
import ListeImageMonocote from "../components/liste-image-monocote";
import { RadioButton } from "react-native-paper";
import { Authcontext } from "../context/auth-context";

const Landing = (props) => {
  const [image, setImage] = useState();
  const [checked, setChecked] = useState();
  const [modalVisibleDycote, setModalVisibleDycote] = useState(false);
  const [modalVisibleMonocote, setModalVisibleMonocote] = useState(false);

  const selectdycote = () => {
    setChecked("dycote");
    setModalVisibleDycote(true);
    setModalVisibleMonocote(false);
  };

  const selectmonocote = () => {
    setChecked("monocote");
    setModalVisibleMonocote(true);
    setModalVisibleDycote(false);
  };
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  const takeimageLibrary = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(image);
    props.onImageTaken(image.uri);
  };
  const takeimageCamera = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(image);
    props.onImageTaken(image.uri);
  };

  const auth = useContext(Authcontext);

  const postDocument = async () => {
    const url = "http://192.168.1.17:5000/api/demandeTraitement/ajout";
    const fileUri = image.uri;
    const newImageUri = "file:///" + fileUri.split("file:/").join("");
    const formData = new FormData();
    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("type", checked);
    formData.append("utilisateurId", auth.userId);
    const options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData);

    let response = await fetch(url, options);

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }


    Alert.alert("Message", "Votre demande est envoyer", [
      { text: "fermer" },
    ]);
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.imagePicker}>
          

          <View style={styles.imagePreview}>
            {!image ? (
              <Text>image de mauvaise herbe.</Text>
            ) : (
              <Image style={styles.image} source={{ uri: image.uri }} />
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <IconEntypo
              style={{ justifyContent: "space-evenly", marginHorizontal: 30 }}
              name="image"
              size={30}
              color="#2196f3"
              onPress={takeimageLibrary}
            />
            <IconAntDesign
              style={{ justifyContent: "space-evenly", marginHorizontal: 30 }}
              name="camera"
              size={30}
              color="#2196f3"
              onPress={takeimageCamera}
            />
          </View>

          <Text>Choisir une image</Text>
          <Text style={{marginTop:20}}>Choisir le type de l'image </Text>
          <View style={{ flexDirection: "row" }}>
            <RadioButton
              color="#2196f3"
              value="dycote"
              status={checked === "dycote" ? "checked" : "unchecked"}
              onPress={() => {
                selectdycote();
              }}
            />
            <Text>Dicotylédone</Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <RadioButton
              color="#2196f3"
              value="monocote"
              status={checked === "monocote" ? "checked" : "unchecked"}
              onPress={() => {
                selectmonocote();
              }}
            />
            <Text>Monocotylédone</Text>
          </View>
          {modalVisibleDycote && (
            <ListeImageDycote visible={modalVisibleDycote} />
          )}
          {modalVisibleMonocote && (
            <ListeImageMonocote visible={modalVisibleMonocote} />
          )}

        <View style={{width: "100%"}}>
          <Button
          
            style={{ marginTop: 40, width: "70%",marginLeft:"15%" }}
            onPress={() => {
              postDocument();
            }}
          >
            <Text style={{marginLeft:"35%",fontSize:25}}>Envoyer</Text>
          </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

Landing.navigationOptions = (navData) => {
  return {
    headerTitle: "Demande de Traitement Mauvaise herbe ",
  };
};
const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "80%",
    height: 200,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Landing;
