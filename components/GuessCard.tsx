import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
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
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop(); // Para a animação quando o componente desmontar
  }, [opacity]);

  return (
    <View style={styles.card}>
      <Text style={styles.date}>
        {palpite.jogo.timeUm.nome} X {palpite.jogo.timeDois.nome}
      </Text>
      <Text style={styles.date}>
        Horário:{" "}
        {moment(new Date(palpite.jogo.horario)).format("DD/MM/yyyy HH:mm")}
      </Text>

      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          {palpite.jogo.timeUm.codigo ? (
            <Image
              source={Emblemas[palpite.jogo.timeUm.codigo]}
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
          {palpite.jogo.timeDois.codigo ? (
            <Image
              source={Emblemas[palpite.jogo.timeDois.codigo]}
              style={styles.logo}
            />
          ) : (
            ""
          )}
        </View>
      </View>

      {moment().isBetween(
        moment(palpite.jogo.horario).subtract(15, "minutes"),
        moment(palpite.jogo.horario).add(90, "minutes")
      ) && (
        <View style={styles.inProgressContainer}>
          <Animated.View style={[styles.dot, { opacity }]} />
          <Text style={styles.text}>Jogo em andamento</Text>
        </View>
      )}

      {moment().isAfter(moment(palpite.jogo.horario).add(90, "minutes")) &&
        palpite.jogo.totalTimeUm == null &&
        palpite.jogo.totalTimeDois == null && (
          <Text style={styles.text}>Jogo finalizado! Aguarde o resultado.</Text>
        )}

      {palpite.jogo.totalTimeUm != null &&
        palpite.jogo.totalTimeDois != null && (
          <Text style={styles.text}>
            Resultado final: {palpite.jogo.totalTimeUm} X{" "}
            {palpite.jogo.totalTimeDois}
          </Text>
        )}

      {moment().isAfter(moment(palpite.jogo.horario).add(90, "minutes")) &&
        palpite.jogo.totalTimeUm != null &&
        palpite.jogo.totalTimeDois != null &&
        (palpite.resultadoTimeUm === palpite.jogo.totalTimeUm &&
        palpite.resultadoTimeDois === palpite.jogo.totalTimeDois ? (
          <Info>Você acertou o palpite! +45 pontos</Info>
        ) : (palpite.resultadoTimeUm > palpite.resultadoTimeDois &&
            palpite.jogo.totalTimeUm > palpite.jogo.totalTimeDois) ||
          (palpite.resultadoTimeUm < palpite.resultadoTimeDois &&
            palpite.jogo.totalTimeUm < palpite.jogo.totalTimeDois) ||
          (palpite.resultadoTimeUm === palpite.resultadoTimeDois &&
            palpite.jogo.totalTimeUm === palpite.jogo.totalTimeDois) ? (
          <Info>Você acertou o vencedor! +15 pontos</Info>
        ) : (
          <Info>Você errou o palpite! +0 pontos</Info>
        ))}

      {moment().isBefore(
        moment(palpite.jogo.horario).subtract(15, "minutes")
      ) && (
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
                onPress={() => handleDeletePalpite(palpite.id)}
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
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.primary,
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
  inProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    marginRight: 5,
  },
});

export default GuessCard;
