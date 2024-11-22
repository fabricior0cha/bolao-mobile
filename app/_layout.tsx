import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";
import "react-native-reanimated";

import { FontAwesome } from "@expo/vector-icons";
import { ContextProvider } from "@/components/Context";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [usuario, setUsuario] = useState(null);
  const Context = createContext({
    usuario,
    setUsuario,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      router.push("/login");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ContextProvider>
      <SafeAreaView style={styles.container}>
        <Stack>
          <Stack.Screen name="criar-conta" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
