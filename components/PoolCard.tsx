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
import Info from "./Info";

interface Props {
  jogo: Jogo;
  handleUpdateJogo: (jogo: Jogo) => void;
}

const PoolCard = ({ jogo, handleUpdateJogo }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [resultadoTimeUm, setResultadoTimeUm] = useState("");
  const [resultadoTimeDois, setResultadoTimeDois] = useState("");

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
          {isEdit ? (
            <Input
              placeholder="0"
              value={resultadoTimeUm}
              onChangeText={setResultadoTimeUm}
              maxLength={1}
            />
          ) : (
            <Text style={styles.date}>{jogo.totalTimeUm ?? "-"}</Text>
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
            <Text style={styles.date}>{jogo.totalTimeDois ?? "-"}</Text>
          )}
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

      {/* Jogo ainda não começou, ainda não chegou 15 minutos antes da hora */}
      {moment().isBefore(moment(jogo.horario).subtract(15, "minutes")) && (
        <View>
          <Info>Jogo ainda não começou, aguarde para encerrar!</Info>
        </View>
      )}

      {/* Jogo em andamento, ainda não passou 100 minutos do jogo */}

      {moment().isBetween(
        moment(jogo.horario).subtract(15, "minutes"),
        moment(jogo.horario).add(100, "minutes")
      ) && (
        <View>
          <Info>Jogo em andamento no momento, aguarde para encerrar!</Info>
        </View>
      )}

      {/* Passou 100 minutos do jogo habilitar encerramento */}
      {moment().isAfter(moment(jogo.horario).add(100, "minutes")) &&
        jogo.totalTimeUm == null &&
        jogo.totalTimeDois == null && (
          <View style={styles.buttonContainer}>
            {isEdit ? (
              <>
                <Button
                  type="primary"
                  onPress={() => {
                    handleUpdateJogo({
                      ...jogo,
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
                  Encerrar
                </Button>
              </>
            )}
          </View>
        )}

      {/* Jogo finalizado e possui resultado */}
      {moment().isAfter(moment(jogo.horario).add(100, "minutes")) &&
        jogo.totalTimeUm != null &&
        jogo.totalTimeDois != null && <Info>Jogo já encerrado!</Info>}
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
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  text: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PoolCard;
