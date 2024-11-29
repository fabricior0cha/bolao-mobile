import { useUsuarioContext } from "@/components/Context";
import GuessCard from "@/components/GuessCard";
import { Palpite } from "@/models/Palpite";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

function Palpites() {
  const { usuario } = useUsuarioContext();
  const [palpites, setPalpites] = React.useState<Palpite[]>([]);

  const handleDeletePalpite = (id: number) => {
    axios.delete(`http://localhost:8080/api/palpites?id=${id}`).then(() => {
      Alert.alert("Palpite deletado com sucesso!");
      handleGetPalpites();
    });
  };

  const handleGetPalpites = async () => {
    axios
      .get(`http://localhost:8080/api/palpites?idParticipante=${1}`)
      .then((resp) => {
        setPalpites(resp.data);
      });
  };

  const handleUpdatePalpite = (
    palpite: Palpite,
    resultadoTimeUm: number,
    resultadoTimeDois: number
  ) => {
    axios
      .put("http://localhost:8080/api/palpites", {
        id: palpite.id,
        idParticipante: palpite.participante.id,
        idJogo: palpite.jogo.id,
        resultadoTimeUm: resultadoTimeUm,
        resultadoTimeDois: resultadoTimeDois,
      })
      .then(() => {
        Alert.alert("Palpite atualizado com sucesso!");
        handleGetPalpites();
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetPalpites();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {palpites.map((palpite) => (
        <GuessCard
          key={palpite.id}
          palpite={palpite}
          handleDeletePalpite={handleDeletePalpite}
          handleUpdatePalpite={handleUpdatePalpite}
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
export default Palpites;
