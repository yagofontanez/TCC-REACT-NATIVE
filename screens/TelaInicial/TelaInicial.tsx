import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import bgdPhoto from "./assets/imagemHalley.jpg";
import { grayApp, redApp, whiteApp } from "../../utils/colors";

interface InitialScreenProps {
  navigate: (screen: "Home" | "Details" | "Cadastro" | "Login") => void;
}

const fetchFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("../../fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../fonts/Poppins-Bold.ttf"),
  });
};

const InitialScreen: React.FC<InitialScreenProps> = ({ navigate }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [EMAIL, setEMAIL] = useState("");
  const [SENHA, setSENHA] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.6:3000/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EMAIL, SENHA }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const result = await response.json();
      const token = result.token;
      await AsyncStorage.setItem("authToken", token);
      Toast.show({
        type: "success",
        text1: "Login bem-sucedido",
        text2: "Você foi autenticado com sucesso.",
      });
      navigate("Details");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const openExternalLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/imagemHalley.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Olá! 👋</Text>
        <Text style={styles.subtitle}>Controle de Ponto</Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.buttonLogin} onPress={() => navigate("Login")}>
            <Text style={styles.buttonText}>Fazer Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCadastro} onPress={() => navigate("Cadastro")}>
            <Text style={styles.buttonText}>Solicitar Cadastro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openExternalLink(`https://www.controledeponto.netlify.app`)}>
            <Text>Mais Informações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  containerButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 15,
  },
  title: {
    fontSize: 38,
    marginBottom: 5,
    fontFamily: "Poppins-Bold",
    color: `${redApp}`,
  },
  subtitle: {
    fontSize: 26,
    fontFamily: "Poppins-Bold",
    color: `${grayApp}`,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    fontFamily: "Poppins-Regular",
  },
  buttonLogin: {
    backgroundColor: `${redApp}`,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    width: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonCadastro: {
    backgroundColor: `${grayApp}`,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    width: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: `${whiteApp}`,
    fontSize: 16,
    fontFamily: 'Poppins-Bold'
  }
});

export default InitialScreen;
