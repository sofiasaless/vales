import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { ListaFuncionarios } from "../components/ListaFuncionarios";
import { useListarMensalidades } from "../hooks/useMensalidades";
import { useRestauranteConectado } from "../hooks/useRestaurante";
import { Alert } from "react-native";
import { RootStackParamList } from "../routes/StackRoutes";

SplashScreen.preventAutoHideAsync();

export const Funcionarios = () => {
  const [loaded, error] = useFonts({
    "JetBrains-Regular": require("../../assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrains-Bold": require("../../assets/fonts/JetBrainsMono-Bold.ttf"),
    "JetBrains-Medium": require("../../assets/fonts/JetBrainsMono-Medium.ttf"),
    "JetBrains-SemiBold": require("../../assets/fonts/JetBrainsMono-SemiBold.ttf"),
    "JetBrains-Italic": require("../../assets/fonts/JetBrainsMono-Italic.ttf"),
  });

  useFocusEffect(
    useCallback(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]),
  );

  if (!loaded && !error) {
    return null;
  }

  return (
    <Container>
      <Header title="Funcionários" />
      <ListaFuncionarios />
    </Container>
  );
};
