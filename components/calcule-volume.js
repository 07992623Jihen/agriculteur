import React, { useState } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from "native-base";
import { View } from "react-native";
const CalculeVolume = (props) => {
  const [volume, setVolume] = useState(null);
  const [vitesse, setVitese] = useState(null);
  const [distance, setDistance] = useState(null);
  const [result, setResult] = useState(null);

  const calcule = () => {
    if (vitesse != null && distance != null && volume != null) {
      setResult((volume * vitesse * distance) / 600);
    }
  };
  return (
    <View style={{ padding: 10 }}>
      <Item floatingLabel>
        <Label>volume par hectare (l)</Label>
        <Input
          keyboardType="numeric"
          onChangeText={(text) => {
            setVolume(text);
          }}
        />
      </Item>
      <Item floatingLabel>
        <Label>vitesse (Km)</Label>
        <Input
          keyboardType="numeric"
          onChangeText={(text) => {
            setVitese(text);
          }}
        />
      </Item>
      <Item floatingLabel>
        <Label>distance (m)</Label>
        <Input
          keyboardType="numeric"
          onChangeText={(text) => {
            setDistance(text);
          }}
        />
      </Item>
      <Button block style={{ marginTop: 20 }} onPress={calcule}>
        <Text>Calculer</Text>
      </Button>

      {result && (
        <Text style={{ fontSize: 30, marginLeft: 25, marginTop: 20 }}>
          Le volume idéal est: {result.toFixed(2)} l/m
        </Text>
      )}
    </View>
  );
};

export default CalculeVolume;
