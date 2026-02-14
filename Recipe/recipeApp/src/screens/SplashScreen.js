import React, { useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {

  useEffect(()=>{
    setTimeout(()=> navigation.replace("Main"),2500);
  },[])

  return (
    <ImageBackground
      source={require("../../assets/splash.jpg")}
      style={styles.container}
    >
      <Text style={styles.title}>Savory & Sweet</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:"center", alignItems:"center" },
  title:{ color:"#fff", fontSize:32, fontWeight:"bold" }
});
