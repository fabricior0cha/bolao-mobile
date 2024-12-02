import { useUsuarioContext } from "@/components/Context";
import GuessCard from "@/components/GuessCard";
import { API_URL } from "@/constants/Api";
import { Palpite } from "@/models/Palpite";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

function Palpites() {
  const { usuario, participante } = useUsuarioContext();
  const [palpites, setPalpites] = React.useState<Palpite[]>([]);

  const handleDeletePalpite = (id: number) => {
    axios.delete(`${API_URL}/palpites?id=${id}`).then(() => {
      Alert.alert("Palpite deletado com sucesso!");
      handleGetPalpites();
    });
  };

  const handleGetPalpites = async () => {
    axios
      .get(`${API_URL}/palpites?idParticipante=${participante?.id}`)
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
      .put(`${API_URL}/palpites`, {
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
