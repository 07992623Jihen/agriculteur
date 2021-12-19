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
const CalculeVitesse = (props) => {
  const [temps, setTemps] = useState(null);
  const [distance, setDistance] = useState(null);
  const [result, setResult] = useState(null);
  const calcule = () => {
    if (temps != null && distance != null) {
      setResult((3.6 * distance) / temps);
    }
  };
  return (
    <View style={{ padding: 10 }}>
      <Item floatingLabel>
        <Label>temps (s)</Label>
        <Input
          keyboardType="numeric"
          onChangeText={(text) => {
            setTemps(text);
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
          La vitesse idéal est: {result.toFixed(2)} m/s
        </Text>
      )}
    </View>
  );
};

export default CalculeVitesse;
