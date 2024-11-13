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

export default function CriarContaScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCreateAccount = async () => {
    axios
      .post("http://192.168.1.103:8080/api/usuarios", {
        nome,
        email,
        senha,
      })
      .then(() => {
        Alert.alert("Cadastro realizado com sucesso!");
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input placeholder="Nome" value={nome} onChangeText={setNome} />
      <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button onPress={handleCreateAccount}>Criar conta</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121214",
    // justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: "#ffffff",
    borderColor: "#007bff",
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextSecondary: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
