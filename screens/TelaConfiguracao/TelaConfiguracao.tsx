import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { grayApp, redApp, whiteApp } from "../../utils/colors";
import Toast from "react-native-toast-message";

interface InitialScreenProps {
  navigate: (
    screen: "Home" | "TelaInicial" | "Cadastro" | "Login" | "TelaPrincipal"
  ) => void;
  userId: string | null;
  userName: string | null;
}

const fetchFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("../../fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../fonts/Poppins-Bold.ttf"),
  });
};

const TelaConfiguracao: React.FC<InitialScreenProps> = ({ navigate, userId, userName }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [nome, setNome] = useState(userName || "");

  useEffect(() => {
    const fetchUserName = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao pegar o nome do usuário");
        }

        const result = await response.json();
        setNome(result.NOME);
      } catch (error) {
        console.error("Erro ao pegar o nome do usuário:", error);
      }
    };

    if (userId) {
      fetchUserName(userId);
    }
  }, [userId]);

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
    <View style={styles.container}>
        <Image source={require('../../assets/avatar3.png')} style={styles.imageAvatar} />
      <Text>{nome}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  imageAvatar: {
    width: 180,
    height: 180,
  }
});

export default TelaConfiguracao;
