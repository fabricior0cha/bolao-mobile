import PoolCard from "@/components/PoolCard";
import { Bolao } from "@/models/Bolao";
import { Jogo } from "@/models/Jogo";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function Gerenciar() {
  const [boloes, setBoloes] = useState<Bolao[]>([]);

  const handleGetBoloes = async () => {
    axios.get("http://localhost:8080/api/boloes").then((resp) => {
      setBoloes(resp.data);
    });
  };

  const handleUpdateJogo = async (jogo: Jogo) => {
    axios
      .put("http://localhost:8080/api/jogos", {
        ...jogo,
      })
      .then(() => {
        Alert.alert("Jogo atualizado com sucesso!");
        handleGetBoloes();
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetBoloes();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {boloes.map((bolao) => (
        <PoolCard
          key={bolao.id}
          bolao={bolao}
          handleUpdateJogo={handleUpdateJogo}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121214",
  },
});
export default Gerenciar;
