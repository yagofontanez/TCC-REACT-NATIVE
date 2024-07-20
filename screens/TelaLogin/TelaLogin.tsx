import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Toast from "react-native-toast-message";
import { grayApp, redApp, whiteApp } from "../../utils/colors";
import bgdPhoto from "../../assets/imagemHalley.jpg";

interface LoginScreenProps {
  navigate: (screen: 'Home' | 'TelaInicial' | 'Cadastro' | 'Login' | 'TelaPrincipal', params?: any) => void;
}

const fetchFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("../../fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../fonts/Poppins-Bold.ttf"),
  });
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigate }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [EMAIL, setEMAIL] = useState('');
  const [SENHA, setSENHA] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ EMAIL, SENHA }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }
  
      const { id, nome } = result;
      Toast.show({
        type: 'success',
        text1: 'Login bem-sucedido',
        text2: 'Você foi autenticado com sucesso.',
      });
      navigate('TelaPrincipal', { userId: id, nome }); 
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Toast.show({
        type: 'error',
        text1: 'Falha ao realizar login.',
        text2: 'Email ou senha inválidos.',
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
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={() => navigate('Home')}
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
  title: {
    fontSize: 38,
    fontFamily: "Poppins-Bold",
    color: redApp,
    textAlign: 'center',
  },
  input: {
    backgroundColor: whiteApp,
    color: grayApp,
    width: 300,
    paddingBottom: 6,
    paddingTop: 6,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 25,
    height: 40,
    justifyContent: "center",
  },
  buttonLogin: {
    backgroundColor: redApp,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonVoltar: {
    backgroundColor: grayApp,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: whiteApp,
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
});

export default LoginScreen;
