import { Colors } from "@/constants/Colors";
import { Emblemas } from "@/constants/Emblemas";
import { Jogo } from "@/models/Jogo";
import moment from "moment";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { useUsuarioContext } from "./Context";
import Input from "./Input";

interface Props {
  jogo: Jogo;
  handleCreatePalpite: ({
    idParticipante,
    idJogo,
    resultadoTimeUm,
    resultadoTimeDois,
  }: {
    idParticipante: number | undefined;
    idJogo: number;
    resultadoTimeUm: number;
    resultadoTimeDois: number;
  }) => void;
}
const MatchCard = ({ jogo, handleCreatePalpite }: Props) => {
  const { participante } = useUsuarioContext();
  const [palpiteTimeUm, setPalpiteTimeUm] = useState("");
  const [palpiteTimeDois, setPalpiteTimeDois] = useState("");

  return (
    <View style={styles.card}>
      <Text style={styles.date}>
        {jogo.timeUm.nome} X {jogo.timeDois.nome}
      </Text>
      <Text style={styles.date}>
        Horário: {moment(new Date(jogo.horario)).format("DD/MM/yyyy HH:mm")}
      </Text>
      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          {jogo.timeUm.codigo ? (
            <Image source={Emblemas[jogo.timeUm.codigo]} style={styles.logo} />
          ) : (
            ""
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="0"
            value={palpiteTimeUm}
            onChangeText={setPalpiteTimeUm}
            maxLength={1}
          />
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="0"
            value={palpiteTimeDois}
            onChangeText={setPalpiteTimeDois}
            maxLength={1}
          />
        </View>
        <View style={styles.team}>
          {jogo.timeDois.codigo ? (
            <Image
              source={Emblemas[jogo.timeDois.codigo]}
              style={styles.logo}
            />
          ) : (
            ""
          )}
        </View>
      </View>

      <Button
        type="primary"
        onPress={() =>
          handleCreatePalpite({
            idParticipante: participante?.id,
            idJogo: jogo.id,
            resultadoTimeUm: parseInt(palpiteTimeUm),
            resultadoTimeDois: parseInt(palpiteTimeDois),
          })
        }
      >
        Palpitar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    width: 50,
    alignItems: "center",
  },
  card: {
    backgroundColor: Colors.background.grey,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 10,
    display: "flex",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 20,
  },
  teamsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  team: {
    alignItems: "center",
  },
  logo: {
    width: 65,
    height: 65,
    marginBottom: 10,
    resizeMode: "contain",
  },
  teamName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  vs: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginHorizontal: 10,
  },
});

export default MatchCard;
