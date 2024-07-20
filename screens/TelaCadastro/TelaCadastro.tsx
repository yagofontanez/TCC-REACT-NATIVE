import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { grayApp, redApp, whiteApp } from "../../utils/colors";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Toast from "react-native-toast-message";

interface CadastroScreenProps {
  navigate: (screen: "Home" | "TelaInicial" | "Cadastro" | "Login") => void;
}

const fetchFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("../../fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../fonts/Poppins-Bold.ttf"),
  });
};

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigate }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [NOME_PEDIDO, setNOME_PEDIDO] = useState("");
  const [SOBRENOME_PEDIDO, setSOBRENOME_PEDIDO] = useState("");
  const [EMAIL_PEDIDO, setEMAIL_PEDIDO] = useState("");
  const [TELEFONE_PEDIDO, setTELEFONE_PEDIDO] = useState("");
  const [FACULDADE_PEDIDO, setFACULDADE_PEDIDO] = useState("");
  const [PONTO_PEDIDO, setPONTO_PEDIDO] = useState("");
  const [faculdadeNome, setFaculdadeNome] = useState("");
  const [pontoNome, setPontoNome] = useState("");
  const [faculdades, setFaculdades] = useState([]);
  const [pontos, setPontos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPontosVisible, setModalPontosVisible] = useState(false);

  useEffect(() => {
    const fetchFaculdades = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/faculdades-public"
        );
        const data = await response.json();
        setFaculdades(data);
      } catch (error) {
        console.error("Erro ao buscar faculdades:", error);
      }
    };

    const fetchPontos = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/pontos-public"
        );
        const data = await response.json();
        setPontos(data);
      } catch(e) {
        console.error("Erro ao buscar pontos:", e);
      }
    };

    fetchFaculdades();
    fetchPontos();
  }, []);

  const handleSolicitaCadastro = async () => {
    try {
      const pedidoCadastro = {
        NOME_PEDIDO,
        SOBRENOME_PEDIDO,
        EMAIL_PEDIDO,
        TELEFONE_PEDIDO,
        FACULDADE_PEDIDO,
        PONTO_PEDIDO,
      };
      const response = await fetch(
        "http://localhost:3000/pedidosCadastro/pedidosCadastro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedidoCadastro),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar Pedido de Cadastro");
      }
      Toast.show({
        type: "success",
        text1: "Envio bem-sucedido!",
        text2: "Seu pedido foi computado.",
      });
      navigate("Home");
    } catch (e) {
      console.error("Erro ao fazer Pedido de Cadastro", e);
      Toast.show({
        type: "error",
        text1: "Erro ao fazer Pedido de Cadastro",
        text2: "Pedido não enviado.",
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

  const renderFaculdadeItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setFACULDADE_PEDIDO(item.ID);
        setFaculdadeNome(item.NOME_FACULDADE);
        setModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.NOME_FACULDADE}</Text>
    </TouchableOpacity>
  );

  const renderPontoItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setPONTO_PEDIDO(item.ID);
        setPontoNome(item.NOME_PONTO);
        setModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.NOME_PONTO}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../assets/imagemHalley.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.textTop}>
          Insira seus dados para{"\n"}solicitar Cadastro
        </Text>
        <View style={styles.containerInputs}>
          <TextInput
            style={styles.input}
            placeholder="Seu Nome"
            value={NOME_PEDIDO}
            onChangeText={setNOME_PEDIDO}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Seu Sobrenome"
            value={SOBRENOME_PEDIDO}
            onChangeText={setSOBRENOME_PEDIDO}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Seu E-mail"
            value={EMAIL_PEDIDO}
            onChangeText={setEMAIL_PEDIDO}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Seu Telefone"
            value={TELEFONE_PEDIDO}
            onChangeText={setTELEFONE_PEDIDO}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.inputText}>
              {faculdadeNome ? faculdadeNome : "Selecione sua Faculdade"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalPontosVisible(true)}
          >
            <Text style={styles.inputText}>
              {pontoNome ? pontoNome : "Selecione seu Ponto"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewButtons}>
          <TouchableOpacity
            style={styles.buttonCadastro}
            onPress={handleSolicitaCadastro}
          >
            <Text style={styles.buttonText}>Solicitar Cadastro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCadastro}
            onPress={() => navigate("Home")}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={faculdades}
                renderItem={renderFaculdadeItem}
                keyExtractor={(item) => item.ID.toString()}
              />
              <Button title="Fechar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        <Modal
          visible={modalPontosVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalPontosVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={pontos}
                renderItem={renderPontoItem}
                keyExtractor={(item) => item.ID.toString()}
              />
              <Button title="Fechar" onPress={() => setModalPontosVisible(false)}/>
            </View>
          </View>
        </Modal>
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
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  textTop: {
    fontSize: 26,
    color: `${redApp}`,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    lineHeight: 30,
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
    display: "flex",
    justifyContent: "center",
  },
  inputText: {
    color: `${grayApp}`,
  },
  containerInputs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  buttonCadastro: {
    backgroundColor: `${grayApp}`,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    width: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: `${whiteApp}`,
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalItemText: {
    fontSize: 18,
  },
  viewButtons: {
    display: "flex",
    flexDirection: 'column',
    gap: 15
  }
});

export default CadastroScreen;
