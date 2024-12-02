import Button from "@/components/Button";
import { useUsuarioContext } from "@/components/Context";
import Input from "@/components/Input";
import { API_URL } from "@/constants/Api";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { setUsuario } = useUsuarioContext();

  const handleLogin = () => {
    axios
      .post(`${API_URL}/login`, {
        email,
        senha,
      })
      .then((resp) => {
        setUsuario(resp.data);
        resp.data.tipo.codigo == "PAR"
          ? router.push("/jogos")
          : router.push("/gerenciar");
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  const handleCriarConta = () => {
    router.push("/criar-conta");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bolao.png")}
        style={{ width: 320, height: 250, alignSelf: "center" }}
      />
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button type="primary" onPress={handleLogin}>
        Login
      </Button>
      <Button type="secondary" onPress={handleCriarConta}>
        Criar conta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121214",
    display: "flex",
    gap: 15,
  },
});
