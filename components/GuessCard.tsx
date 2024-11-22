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
  palpite: Palpite;
  handleDeletePalpite: (id: number) => void;
  handleUpdatePalpite: (
    palpite: Palpite,
    resultadoTimeUm: number,
    resultadoTimeDois: number
  ) => void;
}

const GuessCard = ({
  palpite,
  handleDeletePalpite,
  handleUpdatePalpite,
}: Props) => {
  const [palpiteTimeUm, setPalpiteTimeUm] = useState("");
  const [palpiteTimeDois, setPalpiteTimeDois] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{palpite.bolao.titulo}</Text>
      <Text style={styles.date}>
        Jogo: {moment(palpite.bolao.jogo.data).format("DD/MM/yyyy")}
      </Text>

      <Text style={styles.date}>Premio do bolão: R${palpite.bolao.premio}</Text>
      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          {palpite.bolao.jogo.timeUm.codigo ? (
            <Image
              source={Emblemas[palpite.bolao.jogo.timeUm.codigo]}
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
              value={palpiteTimeUm}
              onChangeText={setPalpiteTimeUm}
              maxLength={1}
            />
          ) : (
            <Text style={styles.date}>{palpite.resultadoTimeUm}</Text>
          )}
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={styles.inputContainer}>
          {isEdit ? (
            <Input
              placeholder="0"
              value={palpiteTimeDois}
              onChangeText={setPalpiteTimeDois}
              maxLength={1}
            />
          ) : (
            <Text style={styles.date}>{palpite.resultadoTimeDois}</Text>
          )}
        </View>
        <View style={styles.team}>
          {palpite.bolao.jogo.timeDois.codigo ? (
            <Image
              source={Emblemas[palpite.bolao.jogo.timeDois.codigo]}
              style={styles.logo}
            />
          ) : (
            ""
          )}
        </View>
      </View>

      {palpite.bolao.jogo.totalTimeUm >= 0 &&
      palpite.bolao.jogo.totalTimeDois >= 0 ? (
        <>
          <Text style={styles.date}>
            Jogo encerrado ({palpite.bolao.jogo.totalTimeUm} x{" "}
            {palpite.bolao.jogo.totalTimeDois})
          </Text>
          <Text style={styles.date}>
            {palpite.participante.vencedor
              ? "Palpite correto! Retire seu prêmio"
              : "Palpite incorreto! Tente novamente"}
          </Text>
        </>
      ) : (
        <View style={styles.buttonContainer}>
          {isEdit ? (
            <>
              <Button
                type="primary"
                onPress={() => {
                  handleUpdatePalpite(
                    palpite,
                    parseInt(palpiteTimeUm),
                    parseInt(palpiteTimeDois)
                  );
                  setIsEdit(false);
                  setPalpiteTimeUm("");
                  setPalpiteTimeDois("");
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
              <Button type="secondary" onPress={() => setIsEdit(true)}>
                Alterar
              </Button>
              <Button
                type="danger"
                onPress={() => handleDeletePalpite(palpite.participante.id)}
              >
                REMOVER
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

export default GuessCard;
