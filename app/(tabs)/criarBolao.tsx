import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { Time } from "@/models/Time";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

function CriarBolao() {
  const [titulo, setTitulo] = useState("");
  const [premio, setPremio] = useState("");
  const [timeUm, setTimeUm] = useState<Time | undefined>(undefined);
  const [timeDois, setTimeDois] = useState<Time | undefined>(undefined);
  const [dataJogo, setDataJogo] = useState<Date | undefined>(new Date());
  const [times, setTimes] = useState<Time[]>([]);

  const handleGetTimes = async () => {
    axios.get("http://localhost:8080/api/times").then((resp) => {
      setTimes(resp.data);
    });
  };

  const handleCreateBolao = async () => {
    axios
      .post("http://localhost:8080/api/boloes", {
        titulo: titulo,
        premio: premio,
        dataJogo: dataJogo,
        idTimeUm: timeUm?.id,
        idTimeDois: timeDois?.id,
      })
      .then(() => {
        Alert.alert("Bolão criado com sucesso!");
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      setTitulo("");
      handleGetTimes();
      setDataJogo(new Date());
      setPremio("");
      setTimeUm(undefined);
      setTimeDois(undefined);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input placeholder="Título" value={titulo} onChangeText={setTitulo} />
        <Input placeholder="Prêmio" value={premio} onChangeText={setPremio} />

        <Select
          label="Time um"
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
          options={times.map((time) => ({
            label: time.nome,
            value: time.id.toString(),
          }))}
          onValueChange={(value) => {
            setTimeDois(times.find((time) => time.id === parseInt(value)));
          }}
        />
        <DatePicker
          placeholder="Data de encerramento"
          value={dataJogo}
          onChange={(date) => setDataJogo(date)}
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
