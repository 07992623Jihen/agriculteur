import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from "native-base";
import { View } from "react-native";
const CalculeVitesse = (props) => {
  return (
    <View style={{padding:10}}>
      <Item floatingLabel>
        <Label>temps (s)</Label>
        <Input keyboardType="numeric" />
      </Item>
      <Item floatingLabel>
        <Label>distance (m)</Label>
        <Input keyboardType="numeric" />
      </Item>
      <Button block style={{marginTop:20}}>
        <Text>Calculer</Text>
      </Button>
    </View>
  );
};

export default CalculeVitesse;
