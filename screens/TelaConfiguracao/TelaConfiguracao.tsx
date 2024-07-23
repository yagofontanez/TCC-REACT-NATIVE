import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { FaEdit } from "react-icons/fa";
import { grayApp, redApp, whiteApp } from "../../utils/colors";
import Toast from "react-native-toast-message";
import { TextInput } from "react-native-paper";
import { updateUsuario } from "../../services/usuarioServices";

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

const TelaConfiguracao: React.FC<InitialScreenProps> = ({
  navigate,
  userId,
  userName,
}) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [nome, setNome] = useState(userName || "");
  const [inputNome, setInputNome] = useState("");
  const [inputSobrenome, setInputSobrenome] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputTelefone, setInputTelefone] = useState("");
  const [inputSenha, setInputSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [enabledInputs, setEnabledInputs] = useState(false);
  const initialInput = useRef<any>(null);

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

    const fetchUser = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          Toast.show({
            type: "error",
            text1: "Erro ao pegar dados do usuário",
          });
          throw new Error("Erro ao pegar dados do usuário");
        }

        const result = await response.json();
        setInputNome(result.NOME);
        setInputSobrenome(result.SOBRENOME);
        setInputEmail(result.EMAIL);
        setInputTelefone(result.TELEFONE);
        setInputSenha(result.SENHA);
      } catch (err) {
        console.error("Erro ao pegar os dados do usuário:", err);
      }
    };

    if (userId) {
      fetchUserName(userId);
      fetchUser(userId);
    }
  }, [userId]);

  const handleToggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const enableInputs = () => {
    setEnabledInputs(true);
    if (initialInput && initialInput.current) {
      initialInput.current.focus();
    }
  };

  const handleUpdateUser = async () => {
    try {
      const userData = {
        NOME: inputNome,
        SOBRENOME: inputSobrenome,
        EMAIL: inputEmail,
        TELEFONE: inputTelefone,
        SENHA: inputSenha,
      };

      const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      };

      if (!inputNome) {
        Toast.show({
          type: "error",
          text1: "Nome é Obrigatório",
        });
        return;
      }
      if (!inputSobrenome) {
        Toast.show({
          type: "error",
          text1: "Sobrenome é Obrigatório",
        });
        return;
      }
      if (!inputEmail) {
        Toast.show({
          type: "error",
          text1: "Email é Obrigatório",
        });
        return;
      }
      if (!validateEmail(inputEmail) && inputEmail !== "") {
        Toast.show({
          type: "error",
          text1: "Insira um Email Válido",
        });
        return;
      }
      if (!inputTelefone) {
        Toast.show({
          type: "error",
          text1: "Telefone é Obrigatório",
        });
        return;
      }

      if (userId) {
        await updateUsuario(userId, userData);
        navigate("TelaPrincipal");
        Toast.show({
          type: "success",
          text1: "Cadastro Atualizado com Sucesso!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "ID de Usuário não Encontrado.",
        });
      }
    } catch (e) {
      console.error("Erro ao atualizar Usuário:", e);
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar Usuário.",
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
    <View style={styles.container}>
      <View style={styles.cabecalhoConfig}>
        <Image
          source={require("../../assets/avatar3.png")}
          style={styles.imageAvatar}
        />
        <Text style={styles.nomePerfil}>{nome}</Text>
        <View style={styles.buttonsPerfil}>
          <TouchableOpacity onPress={enableInputs}>
            <FaEdit color={whiteApp} size={32} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewInputs}>
        <TextInput
          label="Seu Nome"
          value={inputNome}
          onChangeText={(text) => setInputNome(text)}
          mode="outlined"
          style={styles.input}
          disabled={!enabledInputs}
          ref={initialInput}
          theme={{
            colors: {
              primary: grayApp,
              text: grayApp,
              placeholder: grayApp,
              background: `${grayApp}20`,
            },
          }}
        />
        <TextInput
          label="Seu Sobrenome"
          value={inputSobrenome}
          onChangeText={(text) => setInputSobrenome(text)}
          mode="outlined"
          style={styles.input}
          disabled={!enabledInputs}
          theme={{
            colors: {
              primary: grayApp,
              text: grayApp,
              placeholder: grayApp,
              background: whiteApp,
            },
          }}
        />
        <TextInput
          label="Seu Email"
          value={inputEmail}
          onChangeText={(text) => setInputEmail(text)}
          mode="outlined"
          style={styles.input}
          disabled={true}
          theme={{
            colors: {
              primary: grayApp,
              text: grayApp,
              placeholder: grayApp,
              background: whiteApp,
            },
          }}
        />
        <TextInput
          label="Seu Telefone"
          value={inputTelefone}
          onChangeText={(text) => setInputTelefone(text)}
          mode="outlined"
          style={styles.input}
          disabled={!enabledInputs}
          theme={{
            colors: {
              primary: grayApp,
              text: grayApp,
              placeholder: grayApp,
              background: whiteApp,
            },
          }}
        />
        <TextInput
          label="Sua Senha"
          value={inputSenha}
          secureTextEntry={!senhaVisivel}
          disabled={!enabledInputs}
          right={
            <TextInput.Icon
              icon={senhaVisivel ? "eye-off" : "eye"}
              onPress={handleToggleSenhaVisivel}
            />
          }
          onChangeText={(text) => setInputSenha(text)}
          mode="outlined"
          style={styles.input}
          theme={{
            colors: {
              primary: grayApp,
              text: grayApp,
              placeholder: grayApp,
              background: whiteApp,
            },
          }}
        />
      </View>
      <View style={styles.viewButtons}>
        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={() => navigate("TelaPrincipal")}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSalvar}
          onPress={handleUpdateUser}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
  },
  imageAvatar: {
    width: 180,
    height: 180,
  },
  nomePerfil: {
    fontSize: 22,
    color: whiteApp,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  buttonsPerfil: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  cabecalhoConfig: {
    backgroundColor: grayApp,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  input: {
    height: 40,
    width: "90%",
    backgroundColor: whiteApp,
    borderBottomColor: grayApp,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  inputText: {
    color: `${grayApp}`,
  },
  viewInputs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    gap: 15,
  },
  viewInput: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonVoltar: {
    backgroundColor: grayApp,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    width: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSalvar: {
    backgroundColor: redApp,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    width: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: `${whiteApp}`,
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  viewButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    width: "100%",
  },
});

export default TelaConfiguracao;
