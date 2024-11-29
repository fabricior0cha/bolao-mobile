import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "./Button";
import { Cupom } from "@/models/Cupom";
import moment from "moment";

type Props = {
  cupom: Cupom;
  hasRewarded?: boolean;
  handleReward?: (idCupom: number) => void;
};
const logos: Record<string, any> = {
  MLV: require("../assets/lojas/mercado-livre.png"),
  AMZ: require("../assets/lojas/amazon.png"),
  SHP: require("../assets/lojas/shopee.png"),
  CBH: require("../assets/lojas/casas-bahia.png"),
  MGL: require("../assets/lojas/magalu.png"),
};

export default function CupomCard({
  cupom,
  handleReward,
  hasRewarded = false,
}: Props) {
  const [isRewarded, setIsRewarded] = useState(false);
  const [allowRewarded, setAllowRewarded] = useState(false);

  const handleCopyCode = () => {
    Alert.alert(
      "Código Copiado!",
      "O código foi copiado para a área de transferência."
    );
  };

  useEffect(() => {
    setIsRewarded(hasRewarded);
  }, [hasRewarded]);

  return (
    <View style={styles.card}>
      <View style={styles.topContainer}>
        <Image source={logos[cupom.loja.codigo]} style={styles.logo} />
        <View style={styles.infoContainer}>
          <Text style={styles.storeName}>{cupom.loja.nome}</Text>
          <Text style={styles.discount}>{cupom.desconto}% OFF</Text>
          <Text style={styles.validity}>
            Válido até {moment(cupom.dataVencimento).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {!isRewarded &&
          !allowRewarded &&
          moment().isBefore(cupom.dataVencimento) && (
            <Button
              type="primary"
              onPress={() => {
                setAllowRewarded(true);
              }}
            >
              Resgatar por {cupom.pontos} pontos
            </Button>
          )}
        {allowRewarded && (
          <>
            <Button
              type="secondary"
              onPress={() => {
                handleReward?.(cupom.id);
                setAllowRewarded(false);
              }}
            >
              Confirmar
            </Button>
            <Button
              type="danger"
              onPress={() => {
                setAllowRewarded(false);
              }}
            >
              Cancelar
            </Button>
          </>
        )}
      </View>
      {isRewarded && moment().isBefore(cupom.dataVencimento) && (
        <View style={styles.containerCupom}>
          <Text style={styles.text}>#ABC123</Text>
          <TouchableOpacity
            onPress={handleCopyCode}
            style={styles.iconContainer}
          >
            <MaterialIcons
              name="content-copy"
              size={24}
              color={Colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      )}
      {moment().isAfter(cupom.dataVencimento) && (
        <View style={styles.containerCupom}>
          <Text style={styles.text}>Cupom expirado!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.grey,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 5,
  },
  discount: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.background.secondary,
    marginBottom: 5,
  },
  validity: {
    fontSize: 12,
    color: "#888888",
  },
  containerCupom: {
    backgroundColor: "#3e3e40",
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  text: {
    color: Colors.text.primary,
    fontSize: 16,
    textTransform: "uppercase",
    marginLeft: "auto",
    marginRight: "auto",
  },
  iconContainer: {
    padding: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
});
