import Button from "@/components/Button";
import { useUsuarioContext } from "@/components/Context";
import Input from "@/components/Input";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

function Perfil() {
  const { usuario } = useUsuarioContext();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleGetUsuario = async () => {
    axios
      .get(`http://localhost:8080/api/usuarios/${usuario?.id}`)
      .then((resp) => {
        setNome(resp.data.nome);
        setEmail(resp.data.email);
        setSenha(resp.data.senha ?? "");
      });
  };

  const handleUpdateUsuario = async () => {
    axios
      .put(`http://localhost:8080/api/usuarios`, {
        id: usuario?.id,
        nome,
        email,
        senha,
      })
      .then(() => {
        Alert.alert("Usuário atualizado com sucesso!");
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetUsuario();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input placeholder="Nome" value={nome} onChangeText={setNome} />
        <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <Button type="secondary" onPress={handleUpdateUsuario}>
          Alterar
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
    display: "flex",
    gap: 15,
  },
  form: {
    display: "flex",
    gap: 15,
    padding: 20,
  },
});

export default Perfil;
