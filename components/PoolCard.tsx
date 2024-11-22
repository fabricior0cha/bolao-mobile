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
import { Palpite } from "@/models/Palpite";

interface Props {
  bolao: Bolao;
  handleUpdateJogo: (jogo: Jogo) => void;
}

const PoolCard = ({ bolao, handleUpdateJogo }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [resultadoTimeUm, setResultadoTimeUm] = useState("");
  const [resultadoTimeDois, setResultadoTimeDois] = useState("");

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{bolao.titulo}</Text>
      <Text style={styles.date}>
        Jogo: {moment(bolao.jogo.data).format("DD/MM/yyyy")}
      </Text>

      <Text style={styles.date}>Premio do bolão: R${bolao.premio}</Text>
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
          {isEdit ? (
            <Input
              placeholder="0"
              value={resultadoTimeUm}
              onChangeText={setResultadoTimeUm}
              maxLength={1}
            />
          ) : (
            <Text style={styles.date}>{bolao.jogo.totalTimeUm ?? "-"}</Text>
          )}
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={styles.inputContainer}>
          {isEdit ? (
            <Input
              placeholder="0"
              value={resultadoTimeDois}
              onChangeText={setResultadoTimeDois}
              maxLength={1}
            />
          ) : (
            <Text style={styles.date}>{bolao.jogo.totalTimeDois ?? "-"}</Text>
          )}
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

      {bolao.jogo.totalTimeUm >= 0 && bolao.jogo.totalTimeDois >= 0 ? (
        <Text style={styles.date}>Bolão encerrado</Text>
      ) : (
        <View style={styles.buttonContainer}>
          {isEdit ? (
            <>
              <Button
                type="primary"
                onPress={() => {
                  handleUpdateJogo({
                    ...bolao.jogo,
                    totalTimeUm: parseInt(resultadoTimeUm),
                    totalTimeDois: parseInt(resultadoTimeDois),
                  });
                  setIsEdit(false);
                  setResultadoTimeUm("");
                  setResultadoTimeDois("");
                }}
              >
                Confirmar
              </Button>
              <Button type="danger" onPress={() => setIsEdit(false)}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button type="danger" onPress={() => setIsEdit(true)}>
                Encerrar bolão
              </Button>
            </>
          )}
        </View>
      )}
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
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
});

export default PoolCard;
