import Button from "@/components/Button";
import { useUsuarioContext } from "@/components/Context";
import CupomCard from "@/components/CupomCard";
import Input from "@/components/Input";
import { Cupom } from "@/models/Cupom";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function Perfil() {
  const { usuario, participante } = useUsuarioContext();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cupons, setCupons] = useState<Cupom[]>([]);

  const handleGetCupons = async () => {
    axios
      .get(
        `http://localhost:8080/api/resgates?idParticipante=${participante?.id}`
      )
      .then((resp) => {
        setCupons(resp.data);
      });
  };

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
      if (usuario?.tipo.codigo == "PAR") {
        handleGetCupons();
      }
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
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
      {usuario?.tipo.codigo == "PAR" && (
        <View style={styles.cupomContainer}>
          <Text style={styles.text}>Meus cupons:</Text>
          {cupons.map((cupom) => (
            <CupomCard key={cupom.id} cupom={cupom} hasRewarded />
          ))}
        </View>
      )}
    </ScrollView>
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
  },
  cupomContainer: {
    marginTop: 20,
    display: "flex",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Perfil;
