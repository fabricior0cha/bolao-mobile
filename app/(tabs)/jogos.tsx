import { useUsuarioContext } from "@/components/Context";
import MatchCard from "@/components/MatchCard";
import { API_URL } from "@/constants/Api";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Jogo } from "../../models/Jogo";

function Boloes() {
  const { participante } = useUsuarioContext();
  const [jogos, setJogos] = useState<Jogo[]>([]);

  const handleGetJogos = async () => {
    axios
      .get(`${API_URL}/jogos?idParticipante=${participante?.id}`)
      .then((resp) => {
        setJogos(resp.data);
      });
  };

  const handleCreatePalpite = ({
    idParticipante,
    idJogo,
    resultadoTimeUm,
    resultadoTimeDois,
  }: {
    idParticipante: number | undefined;
    idJogo: number;
    resultadoTimeUm: number;
    resultadoTimeDois: number;
  }) => {
    axios
      .post(`${API_URL}/palpites`, {
        idParticipante,
        idJogo,
        resultadoTimeUm,
        resultadoTimeDois,
      })
      .then(() => {
        handleGetJogos();
        Alert.alert("Palpite criado com sucesso!");
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      if (participante?.id) handleGetJogos();
    }, [participante])
  );

  return (
    <ScrollView style={styles.container}>
      {jogos.map((jogo) => (
        <MatchCard
          key={jogo.id}
          jogo={jogo}
          handleCreatePalpite={handleCreatePalpite}
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

export default Boloes;
