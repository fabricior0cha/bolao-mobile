import Button from "@/components/Button";
import Input from "@/components/Input";
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
  ToastAndroid,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { API_URL } from "@/constants/Api";

export default function CriarContaScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    router.push("/login");
  };

  const handleCreateAccount = async () => {
    axios
      .post(`${API_URL}/api/usuarios`, {
        nome,
        email,
        senha,
      })
      .then(() => {
        Alert.alert(
          "Conta criada com sucesso! Faça login para acessar sua conta."
        );
        router.push("/login");
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bolao.png")}
        style={{
          width: 320,
          height: 250,
          alignSelf: "center",
        }}
      />
      <View style={styles.form}>
        <Input placeholder="Nome" value={nome} onChangeText={setNome} />
        <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <Button onPress={handleCreateAccount} type="primary">
          Criar conta
        </Button>

        <Button onPress={handleLogin} type="secondary">
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121214",
  },
  form: {
    display: "flex",
    gap: 15,
    padding: 20,
  },
});
