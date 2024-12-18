import PoolCard from "@/components/PoolCard";
import { API_URL } from "@/constants/Api";
import { Jogo } from "@/models/Jogo";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function Gerenciar() {
  const [jogos, setJogos] = useState<Jogo[]>([]);

  const handleGetJogos = async () => {
    axios.get(`${API_URL}/jogos`).then((resp) => {
      setJogos(resp.data);
    });
  };

  const handleUpdateJogo = async (jogo: Jogo) => {
    axios
      .put(`${API_URL}/jogos`, {
        ...jogo,
      })
      .then(() => {
        Alert.alert("Jogo atualizado com sucesso!");
        handleGetJogos();
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetJogos();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {jogos.map((jogo) => (
        <PoolCard
          key={jogo.id}
          jogo={jogo}
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
