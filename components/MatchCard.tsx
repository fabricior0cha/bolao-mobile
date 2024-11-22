import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Button from "./Button";
import { Jogo } from "@/models/Jogo";
import { Emblemas } from "@/constants/Emblemas";
import Input from "./Input";
import moment from "moment";
import axios from "axios";
import { Bolao } from "@/models/Bolao";
import { useUsuarioContext } from "./Context";

interface Props {
  bolao: Bolao;
  handleCreatePalpite: ({
    idUsuario,
    idBolao,
    resultadoTimeUm,
    resultadoTimeDois,
  }: {
    idUsuario: number | undefined;
    idBolao: number;
    resultadoTimeUm: number;
    resultadoTimeDois: number;
  }) => void;
}
const MatchCard = ({ bolao, handleCreatePalpite }: Props) => {
  const { usuario } = useUsuarioContext();
  const [palpiteTimeUm, setPalpiteTimeUm] = useState("");
  const [palpiteTimeDois, setPalpiteTimeDois] = useState("");

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{bolao.titulo}</Text>
      <Text style={styles.date}>
        Jogo: {moment(new Date(bolao.jogo.data)).format("DD/MM/yyyy")}
      </Text>
      <Text style={styles.date}>Premio: R${bolao.premio}</Text>
      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          {bolao.jogo.timeUm.codigo ? (
            <Image
              source={Emblemas[bolao.jogo.timeUm.codigo]}
              style={styles.logo}
            />
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
          {bolao.jogo.timeDois.codigo ? (
            <Image
              source={Emblemas[bolao.jogo.timeDois.codigo]}
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
            idUsuario: usuario?.id,
            idBolao: bolao.id,
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
