import { useUsuarioContext } from "@/components/Context";
import CupomCard from "@/components/CupomCard";
import { Cupom } from "@/models/Cupom";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

function Cupons() {
  const { participante, handleGetParticipante } = useUsuarioContext();
  const [cupons, setCupons] = useState<Cupom[]>([]);

  const handleGetCupons = async () => {
    axios
      .get(
        `http://localhost:8080/api/cupons?idParticipante=${participante?.id}`
      )
      .then((resp) => {
        setCupons(resp.data);
      });
  };

  const handleReward = async (idCupom: number) => {
    axios
      .post("http://localhost:8080/api/cupons", {
        idParticipante: participante?.id,
        idCupom,
      })
      .then(() => {
        handleGetCupons();
        handleGetParticipante();
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetCupons();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {cupons.map((cupom) => (
        <CupomCard key={cupom.id} cupom={cupom} handleReward={handleReward} />
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

export default Cupons;
