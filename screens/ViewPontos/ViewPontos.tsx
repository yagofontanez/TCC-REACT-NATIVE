import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { grayApp, redApp, whiteApp } from "../../utils/colors";
import Toast from "react-native-toast-message";
import { FaPlus } from "react-icons/fa";
import { BlurView } from "expo-blur";

interface InitialScreenProps {
  navigate: (screen: "Home" | "TelaInicial" | "Cadastro" | "Login" | "TelaPrincipal") => void;
}

const fetchFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("../../fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../fonts/Poppins-Bold.ttf"),
  });
};

const ViewPontos: React.FC<InitialScreenProps> = ({ navigate }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [pontos, setPontos] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pointsPerPage = 7;

  useEffect(() => {
    const fetchPontos = async () => {
      try {
        const response = await fetch("http://localhost:3000/pontos-public");
        const data = await response.json();
        setPontos(data);
      } catch (e) {
        Toast.show({
          type: "error",
          text1: "Erro ao carregar pontos",
          text2: "Tente novamente mais tarde",
        });
        console.error(e);
      }
    };

    fetchPontos();
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  const indexOfLastPoint = currentPage * pointsPerPage;
  const indexOfFirstPoint = indexOfLastPoint - pointsPerPage;
  const currentPoints = pontos.slice(indexOfFirstPoint, indexOfLastPoint);

  const totalPages = Math.ceil(pontos.length / pointsPerPage);

  return (
    <ImageBackground
      source={require("../../assets/imagemHalley.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Pontos Disponíveis</Text>
        <BlurView intensity={50} style={styles.blurContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.listaPontosHeader}>
              <Text style={styles.columnHeader}>Rua</Text>
              <Text style={styles.columnHeader}>Cidade</Text>
            </View>
            {currentPoints.map((ponto: any) => (
              <View key={ponto.ID} style={styles.listaPontos}>
                <Text style={styles.textoPontoLeft}>{ponto.RUA_PONTO}</Text>
                <Text style={styles.textoPontoRight}>{ponto.CIDADE_PONTO}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            <TouchableOpacity
              disabled={currentPage === 1}
              onPress={() => setCurrentPage(currentPage - 1)}
              style={styles.pageButton}
            >
              <Text style={styles.pageButtonText}>Anterior</Text>
            </TouchableOpacity>
            <Text style={styles.pageIndicator}>
              Página {currentPage} de {totalPages}
            </Text>
            <TouchableOpacity
              disabled={currentPage === totalPages}
              onPress={() => setCurrentPage(currentPage + 1)}
              style={styles.pageButton}
            >
              <Text style={styles.pageButtonText}>Próxima</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
        <TouchableOpacity
          onPress={() => navigate('TelaPrincipal')}
          style={styles.buttonVoltar}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    fontFamily: "Poppins-Bold",
    color: `${redApp}`,
  },
  listaPontosHeader: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: grayApp,
    gap: 10
  },
  listaPontos: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: grayApp,
    gap: 10
  },
  columnHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: redApp,
  },
  hiddenIcon: {
    opacity: 0,
    width: 18,
    height: 18,
  },
  blurContainer: {
    width: "90%",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "rgba(40, 40, 40, 0.3)",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  textoPontoLeft: {
    fontSize: 14,
    color: grayApp,
    fontFamily: 'Poppins-Bold',
    textAlign: 'left'
  },
  textoPontoRight: {
    fontSize: 14,
    color: grayApp,
    fontFamily: 'Poppins-Bold',
    textAlign: 'right'
  },
  buttonVoltar: {
    backgroundColor: `${redApp}`,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: `${whiteApp}`,
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  pageButton: {
    padding: 10,
    backgroundColor: grayApp,
    borderRadius: 5,
  },
  pageButtonText: {
    color: whiteApp,
    fontSize: 16,
  },
  pageIndicator: {
    fontSize: 14,
    color: whiteApp,
    fontFamily: 'Poppins-Bold'
  },
});

export default ViewPontos;
