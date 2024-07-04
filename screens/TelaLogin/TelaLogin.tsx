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
import { grayApp, redApp, whiteApp } from "../../utils/colors";

interface LoginScreenProps {
  navigate: (screen: "Home" | "Details" | "Cadastro" | "Login") => void;
}

const fetchFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("../../fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../fonts/Poppins-Bold.ttf"),
  });
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigate }) => {
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
      navigate("Cadastro");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Toast.show({
        type: "error",
        text1: "Falha ao realizar login.",
        text2: "Login não realizado",
      });
    }
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
        <Text style={styles.title}>Faça Login na sua Conta!</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu Email"
          value={EMAIL}
          onChangeText={setEMAIL}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Sua Senha"
          value={SENHA}
          secureTextEntry
          onChangeText={setSENHA}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => handleLogin}
        >
          <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={() => navigate("Home")}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
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
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 25,
    flexDirection: "column",
  },
  containerButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 15,
  },
  title: {
    fontSize: 38,
    fontFamily: "Poppins-Bold",
    color: `${redApp}`,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 26,
    fontFamily: "Poppins-Bold",
    color: `${grayApp}`,
  },
  input: {
    backgroundColor: `${whiteApp}`,
    color: `${grayApp}`,
    width: 300,
    paddingBottom: 6,
    paddingTop: 6,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 25,
    height: 40,
    display: "flex",
    justifyContent: "center",
  },
  buttonLogin: {
    backgroundColor: `${redApp}`,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    width: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonVoltar: {
    backgroundColor: `${grayApp}`,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    width: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: `${whiteApp}`,
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  buttonText2: {

  },
  containerInputs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
});

export default LoginScreen;
