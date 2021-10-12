import React, { Component, useState } from "react";
import { Container, Header, Content, Button, Text } from "native-base";
import { View } from "react-native";
import CalculeVitesse from "../components/calcule-vitesse";
import CalculeVolume from '../components/calcule-volume'
const Calcule = (props) => {
  const [content, setContent] = useState(<CalculeVitesse />);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View></View>
        <Button rounded onPress={()=>setContent(<CalculeVitesse/>)} >
          <Text>Calcule vitesse</Text>
        </Button>

        <Button rounded info style={{ marginRight: 30 }} onPress={()=>setContent(<CalculeVolume/>)}>
          <Text>Calcule volume</Text>
        </Button>
      </View>
      <View style={{ marginTop: 20 }}>{content}</View>
    </View>
  );
};

export default Calcule;
