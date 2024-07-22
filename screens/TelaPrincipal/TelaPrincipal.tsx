import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { grayApp, greenApp, redApp, whiteApp } from "../../utils/colors";
import { IoMdLogOut } from "react-icons/io";
import { BsFillGeoAltFill } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import Toast from "react-native-toast-message";

interface PrincipalScreenProps {
  navigate: (
    screen:
      | "Home"
      | "TelaInicial"
      | "Cadastro"
      | "Login"
      | "TelaPrincipal"
      | "ViewPontos"
      | "ViewFaculdades"
      | "TelaConfiguracao",
    params?: any
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

const PrincipalScreen: React.FC<PrincipalScreenProps> = ({
  navigate,
  userId,
  userName,
}) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [nome, setNome] = useState(userName || "");
  const [pontoMarcado, setPontoMarcado] = useState(false);
  const date = new Date();

  const objDate = {
    dia: date.getDate(),
    mes: date.getMonth(),
    ano: date.getFullYear(),
  };

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const mesNome = meses[objDate.mes];

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

  const handleLogOff = () => {
    navigate("Home");
    Toast.show({
      type: "success",
      text1: "Você foi deslogado com sucesso!",
    });
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
        <View style={styles.viewName}>
          <Text style={styles.title}>Olá, {nome}! 👋</Text>
          <View style={styles.alignView}>
            <Text style={styles.subTitle}>
              {objDate.dia}, {mesNome}
            </Text>
            <TouchableOpacity onPress={() => navigate('TelaConfiguracao')}>
              <FaGear size={30} color={grayApp} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewPoint}>
          {!pontoMarcado ? (
            <Text style={styles.textPonto}>
              Ponto: <Text style={styles.pontoNaoMarcado}>Não Marcado</Text>
            </Text>
          ) : (
            <Text style={styles.textPonto}>
              Ponto: <Text style={styles.pontoMarcado}>Marcado</Text>
            </Text>
          )}
        </View>
      </View>
      <View style={styles.containerBoxes}>
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => console.log("aqui conecta c a api do maps")}
        >
          <View style={styles.alignBoxContent}>
            <Text style={styles.textoBoxes}>Marcar</Text>
            <Text style={styles.textoBoxesRed}>Ponto</Text>
          </View>
          <BsFillGeoAltFill style={styles.icon} size={60} color={redApp} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => console.log("aqui conecta c a api do maps")}
        >
          <View style={styles.alignBoxContent}>
            <Text style={styles.textoBoxes}>Acompanhar</Text>
            <Text style={styles.textoBoxesRed}>Ponto</Text>
          </View>
          <FaCircleInfo style={styles.icon} size={60} color={grayApp} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => navigate("ViewPontos")}
        >
          <View style={styles.alignBoxContent}>
            <Text style={styles.textoBoxes}>Ver</Text>
            <Text style={styles.textoBoxesRed}>Pontos</Text>
          </View>
          <FaEye style={styles.icon} size={60} color={grayApp} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => navigate("ViewFaculdades")}
        >
          <View style={styles.alignBoxContent}>
            <Text style={styles.textoBoxes}>Ver</Text>
            <Text style={styles.textoBoxesRed}>Faculdades</Text>
          </View>
          <FaBook style={styles.icon} size={60} color={redApp} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogOff} style={styles.viewConf}>
        <IoMdLogOut color={redApp} size={32} />
      </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    // padding: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 5,
    fontFamily: "Poppins-Bold",
    color: redApp,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: "Poppins-Bold",
    color: grayApp,
  },
  viewName: {
    backgroundColor: whiteApp,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: "auto",
    padding: 15,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  alignView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  viewPoint: {
    padding: 15,
    marginTop: 10,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  pontoNaoMarcado: {
    color: redApp,
  },
  pontoMarcado: {
    color: greenApp,
  },
  textPonto: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  containerBoxes: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
  },
  boxContainer: {
    backgroundColor: whiteApp,
    borderRadius: 20,
    width: "48%",
    aspectRatio: 1,
    marginBottom: 16,
    justifyContent: "space-between",
    padding: 10,
  },
  textoBoxes: {
    fontSize: 18,
    color: grayApp,
    fontFamily: "Poppins-Bold",
  },
  textoBoxesRed: {
    fontSize: 18,
    color: redApp,
    fontFamily: "Poppins-Bold",
  },
  alignBoxContent: {
    alignItems: "flex-start",
  },
  icon: {
    alignSelf: "flex-end",
  },
  viewConf: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PrincipalScreen;
