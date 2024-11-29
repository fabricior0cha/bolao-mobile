import { useUsuarioContext } from "@/components/Context";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  const { usuario, participante, handleGetParticipante } = useUsuarioContext();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.username}>Ola, {usuario?.nome}!</Text>
      <Text style={styles.points}>Seus pontos: {participante?.pontos}+</Text>
    </View>
  );

  useEffect(() => {
    if (usuario?.tipo.codigo == "PAR") {
      handleGetParticipante();
    }
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.background.dark,
        },
        tabBarActiveTintColor: Colors.background.secondary,
      }}
    >
      <Tabs.Screen
        name="jogos"
        options={{
          title: "Jogos",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="soccer-ball-o" color={color} size={26} />
          ),
          header: renderHeader,
          href: usuario?.tipo.codigo == "PAR" ? "/jogos" : null,
        }}
      />
      <Tabs.Screen
        name="palpites"
        options={{
          title: "Meus palpites",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="money" color={color} size={26} />
          ),
          href: usuario?.tipo.codigo == "PAR" ? "/palpites" : null,
          header: renderHeader,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="criarBolao"
        options={{
          title: "Criar jogo",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-circle" color={color} size={26} />
          ),
          headerShown: false,
          href: usuario?.tipo.codigo == "ADM" ? "/criarBolao" : null,
        }}
      />
      <Tabs.Screen
        name="gerenciar"
        options={{
          title: "Gerenciar jogos",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="tablet" color={color} size={26} />
          ),
          href: usuario?.tipo.codigo == "ADM" ? "/gerenciar" : null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="cupons"
        options={{
          title: "Cupons",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="id-card-o" color={color} size={26} />
          ),
          href: usuario?.tipo.codigo == "PAR" ? "/cupons" : null,
          header: renderHeader,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.background.dark,
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    borderBottomColor: Colors.background.grey,
    borderBottomWidth: 1,
  },
  username: {
    fontSize: 20,
    color: Colors.text.primary,
    fontWeight: "bold",
  },
  points: {
    fontSize: 16,
    color: Colors.text.primary,
  },
});
