import { useUsuarioContext } from "@/components/Context";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  const { usuario } = useUsuarioContext();

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
        name="boloes"
        options={{
          title: "Bolões",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="soccer-ball-o" color={color} size={26} />
          ),
          headerShown: false,
          href: usuario?.tipo.codigo == "PAR" ? "/boloes" : null,
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
          headerShown: false,
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
          title: "Criar bolão",
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
          title: "Gerenciar bolões",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="tablet" color={color} size={26} />
          ),
          href: usuario?.tipo.codigo == "ADM" ? "/gerenciar" : null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
