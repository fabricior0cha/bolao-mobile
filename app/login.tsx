import Button from "@/components/Button";
import Input from "@/components/Input";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    router.push("/criar-conta");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bolao.png")}
        style={{ width: 320, height: 250, alignSelf: "center" }}
      />
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button type="primary">Login</Button>
      <Button type="secondary" onPress={handleSignUp}>
        Criar conta
      </Button>
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
    // justifyContent: "center",
  },
});
