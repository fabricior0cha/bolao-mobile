import MatchCard from "@/components/MatchCard";
import React, { useCallback, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Jogo } from "../../models/Jogo";
import axios from "axios";
import { Bolao } from "@/models/Bolao";
import { useFocusEffect } from "expo-router";
import { useUsuarioContext } from "@/components/Context";

function Boloes() {
  const { usuario } = useUsuarioContext();
  const [boloes, setBoloes] = React.useState<Bolao[]>([]);
  const handleGetJogos = async () => {
    axios
      .get(`http://localhost:8080/api/boloes?idUsuario=${usuario?.id}`)
      .then((resp) => {
        setBoloes(resp.data);
      });
  };

  const handleCreatePalpite = ({
    idUsuario,
    idBolao,
    resultadoTimeUm,
    resultadoTimeDois,
  }: {
    idUsuario: number | undefined;
    idBolao: number;
    resultadoTimeUm: number;
    resultadoTimeDois: number;
  }) => {
    axios
      .post("http://localhost:8080/api/palpites", {
        idUsuario: idUsuario,
        idBolao: idBolao,
        resultadoTimeUm: resultadoTimeUm,
        resultadoTimeDois: resultadoTimeDois,
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
      {boloes.map((bolao) => (
        <MatchCard
          key={bolao.id}
          bolao={bolao}
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
