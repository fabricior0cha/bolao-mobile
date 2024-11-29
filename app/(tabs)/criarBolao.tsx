import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { formatDateTime } from "@/constants/FormatData";
import { Time } from "@/models/Time";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

function CriarBolao() {
  const [timeUm, setTimeUm] = useState<Time | undefined>(undefined);
  const [timeDois, setTimeDois] = useState<Time | undefined>(undefined);
  const [horario, setHorario] = useState<Date | undefined>(new Date());
  const [times, setTimes] = useState<Time[]>([]);

  const handleGetTimes = async () => {
    axios.get("http://localhost:8080/api/times").then((resp) => {
      setTimes(resp.data);
    });
  };

  const handleCreateBolao = async () => {
    axios
      .post("http://localhost:8080/api/jogos", {
        horario: formatDateTime(horario),
        timeUm: timeUm,
        timeDois: timeDois,
      })
      .then(() => {
        Alert.alert("Jogo criado com sucesso!");
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetTimes();
      setHorario(new Date());
      setTimeUm(undefined);
      setTimeDois(undefined);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Select
          label="Time um"
          value={timeUm?.id.toString()}
          options={times.map((time) => ({
            label: time.nome,
            value: time.id.toString(),
          }))}
          onValueChange={(value) => {
            setTimeUm(times.find((time) => time.id === parseInt(value)));
          }}
        />
        <Select
          label="Time dois"
          value={timeDois?.id.toString()}
          options={times.map((time) => ({
            label: time.nome,
            value: time.id.toString(),
          }))}
          onValueChange={(value) => {
            setTimeDois(times.find((time) => time.id === parseInt(value)));
          }}
        />
        <DatePicker
          placeholder="Horário do jogo"
          value={horario}
          onChange={(date) => setHorario(date)}
        />
        <Button type="primary" onPress={handleCreateBolao}>
          Criar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121214",
    display: "flex",
    gap: 15,
  },
  form: {
    display: "flex",
    gap: 15,
    padding: 20,
  },
});
export default CriarBolao;
