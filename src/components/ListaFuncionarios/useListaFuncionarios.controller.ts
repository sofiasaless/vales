import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useSettingsContext } from "../../context/SettingsContext";
import { useListarMensalidades } from "../../hooks/useMensalidades";
import { useIncentivoAtivo } from "../../hooks/useIncentivo";
import { calcularTotalVales } from "../../util/calculos.util";
import { useFuncionariosRestaurante } from "../../hooks/useFuncionarios";
import { useTheme } from "@ui-kitten/components";
import { useGerenteConectado } from "../../hooks/useGerente";
import { Gerente } from "../../schema/gerente.schema";
import { useRestauranteId } from "../../hooks/useRestaurante";
import { RootStackParamList } from "../../routes/StackRoutes";

export function useListaFuncionariosController() {
  const { data: gerente } = useGerenteConectado();
  const styles = style(gerente);

  const theme = useTheme();

  const { data: res, isLoading: carregandoRes } = useRestauranteId();

  const {
    data: funcionarios,
    isLoading,
    refetch,
  } = useFuncionariosRestaurante(res?.uid || "");

  const {
    data: incentivo_ativo,
    isLoading: carregandoIncentivoAtivo,
    refetch: recarregarIncentivo,
  } = useIncentivoAtivo(res?.uid || "");

  const valesAbertos = useMemo(() => {
    return funcionarios?.reduce((acc, func) => {
      return acc + calcularTotalVales(func.vales);
    }, 0);
  }, [funcionarios]);

  const funcComVales = useMemo(() => {
    return funcionarios?.reduce((acc, func) => {
      if (func.vales.length > 0) {
        return acc + 1;
      }
      return acc + 0;
    }, 0);
  }, [funcionarios]);

  useFocusEffect(
    useCallback(() => {
      if (carregandoRes) return;
      refetch();
      recarregarIncentivo();
    }, [carregandoRes]),
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { data: mensalidades, isLoading: isLoadingMensalidades } =
    useListarMensalidades(res?.uid!, isLoading);

  const { showSearchEmployeeBar } = useSettingsContext();
  const [search, setSearch] = useState<string>("");

  const filteredEmployees = useMemo(() => {
    if (!funcionarios || search.trim() === "") {
      return funcionarios;
    }

    const texto = search.toLowerCase();

    return funcionarios.filter((item) =>
      item.nome.toLowerCase().includes(texto),
    );
  }, [funcionarios, search]);

  useFocusEffect(
    useCallback(() => {
      if (isLoadingMensalidades) return;
      if (mensalidades) {
        if (mensalidades.at(0)?.status === "VENCIDO") {
          Alert.alert(
            "Mensalidade Vencida",
            "A mensalidade atual está vencida. Verifique a seção de mensalidades e efetue o pagamento para continuar usando o aplicativo completo!",
            [
              {
                text: "Verificar",
                onPress: () =>
                  navigation.navigate("Mensalidades", {
                    idRest: res?.uid!,
                  }),
              },
            ],
          );
        }
      }
    }, [isLoadingMensalidades, mensalidades]),
  );

  return {
    funcionarios,
    isLoading,
    styles,
    valesAbertos,
    funcComVales,
    showSearchEmployeeBar,
    incentivo_ativo,
    theme,
    filteredEmployees,
    search,
    setSearch,
  };
}

const style = (gerente: Gerente | null | undefined) => {
  return StyleSheet.create({
    controleUsuario: {
      display: gerente
        ? gerente.tipo === "AUXILIAR"
          ? "none"
          : "flex"
        : "flex",
    },
    screen: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      gap: 12,
    },

    /* Summary cards */
    summaryGrid: {
      flexDirection: "row",
      gap: 12,
    },

    summaryCard: {
      flex: 1,
      borderRadius: 14,
      padding: 16,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 4,
    },

    value: {
      marginVertical: 4,
    },

    mt4: {
      marginTop: 4,
    },

    /* Employee grid */
    list: {
      paddingBottom: 24,
    },

    column: {
      gap: 12,
    },

    employeeItem: {
      flex: 1,
      marginBottom: 12,
    },

    empty: {
      alignItems: "center",
      marginTop: 48,
    },
    emptyText: {
      marginTop: 12,
      marginBottom: 4,
    },
  });
};
