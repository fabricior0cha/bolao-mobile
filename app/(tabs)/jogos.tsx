import MatchCard from "@/components/MatchCard";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Jogo } from "../../models/Jogo";
import axios from "axios";
import { Bolao } from "@/models/Bolao";
import { useFocusEffect } from "expo-router";
import { useUsuarioContext } from "@/components/Context";

function Boloes() {
  const { usuario } = useUsuarioContext();
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const handleGetJogos = async () => {
    axios
      .get(`http://localhost:8080/api/jogos?idParticipante=${1}`)
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
      .post("http://localhost:8080/api/palpites", {
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
      handleGetJogos();
    }, [])
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
