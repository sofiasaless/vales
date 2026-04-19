import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/StackRoutes";
import { useRestauranteConectado } from "../../../hooks/useRestaurante";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const DEFAULT_ITEM_ICON_SIZE = 20;
const DEFAULT_ITEM_ICON_COLOR = "#8f9bb3";

export function usePerfilController() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { data: rest_conectado } = useRestauranteConectado();

  const menuOptionsItems: MenuItem[] = [
    {
      title: "Finanças",
      icon: (
        <MaterialCommunityIcons
          name="finance"
          size={DEFAULT_ITEM_ICON_SIZE}
          color={DEFAULT_ITEM_ICON_COLOR}
        />
      ),
      onPress: () => {
        navigation.navigate("Financas", { idRest: rest_conectado?.id! });
      },
    },
    {
      title: "Cárdapio",
      icon: (
        <MaterialIcons
          name="dining"
          size={DEFAULT_ITEM_ICON_SIZE}
          color={DEFAULT_ITEM_ICON_COLOR}
        />
      ),
      onPress: () => {
        navigation.navigate("GerenciaCardapio");
      },
    },
    {
      title: "Mensalidades",
      icon: (
        <MaterialIcons
          name="calendar-month"
          size={DEFAULT_ITEM_ICON_SIZE}
          color={DEFAULT_ITEM_ICON_COLOR}
        />
      ),
      onPress: () => {
        navigation.navigate("Mensalidades", {
          idRest: rest_conectado?.id!,
        });
      },
    },
    {
      title: "Incentivos",
      icon: (
        <MaterialCommunityIcons
          name="star-shooting"
          size={DEFAULT_ITEM_ICON_SIZE}
          color={DEFAULT_ITEM_ICON_COLOR}
        />
      ),
      onPress: () => {
        navigation.navigate("Incentivos", { idRest: rest_conectado?.id! });
      },
    },
    {
      title: "Gerentes e Auxiliares",
      icon: (
        <MaterialIcons
          name="people"
          size={DEFAULT_ITEM_ICON_SIZE}
          color={DEFAULT_ITEM_ICON_COLOR}
        />
      ),
      onPress: () => {
        navigation.navigate("GerenciaGerentes", {
          idRest: rest_conectado?.id!,
        });
      },
    },
    {
      title: "Configurações",
      icon: (
        <MaterialIcons
          name="settings"
          size={DEFAULT_ITEM_ICON_SIZE}
          color={DEFAULT_ITEM_ICON_COLOR}
        />
      ),
      onPress: () => {
        navigation.navigate("Configuracao");
      },
    },
  ];

  return {
    menuOptionsItems,
  };
}
