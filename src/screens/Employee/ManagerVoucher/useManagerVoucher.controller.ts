import { useEffect, useState } from "react";
import { Alert } from "react-native";

import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEventoAlteracoesContext } from "../../../context/EventoAlteracaoContext";
import { useFuncionarios } from "../../../hooks/useFuncionarios";
import { useGerenteConectado } from "../../../hooks/useGerente";
import { useListarVales, useVales } from "../../../hooks/useVales";
import { RootStackParamList } from "../../../routes/StackRoutes";
import { Vale, ValeDinheiroPostRequestBody } from "../../../schema/vale.shema";
import { alert } from "../../../util/alertfeedback.util";
import { Voucher } from "../../../model/employee.model";
import { useSettingsContext } from "../../../context/SettingsContext";

type RouteParams = {
  idFunc: string;
};

const emptyVale: ValeDinheiroPostRequestBody = {
  descricao: "",
  preco_unit: 0,
};

export function useManagerVoucherController() {
  const { showAddBonus } = useSettingsContext();
  const { data: gerente } = useGerenteConectado();

  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { idFunc } = route.params as RouteParams;

  const [formVale, setFormVale] =
    useState<ValeDinheiroPostRequestBody>(emptyVale);

  const [cashError, setCashError] = useState("");

  const { encontrarPorId, isLoadingF, funcionarioFoco } = useFuncionarios();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAddBonusVisible, setModalAddBonusVisible] = useState(false);
  const handleOpenModalAddBonus = () => setModalAddBonusVisible(true);
  const handleCloseModalAddBonus = () => setModalAddBonusVisible(false);

  const {
    adicionarVale,
    isLoading: carregando,
    removerVale,
    isLoadingVales,
  } = useVales();

  const { data: vales, refetch } = useListarVales(idFunc);

  const [precoTexto, setPrecoTexto] = useState("");

  const handleRemoveItem = async (valeToRemove: Vale | Voucher) => {
    Alert.alert(
      `Confirmar remoção`,
      `Tem certeza que quer remover "${valeToRemove.descricao}"?`,
      [
        {
          text: "Cancelar",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            await removerVale(idFunc, valeToRemove);
            refetch();
          },
        },
      ],
    );
  };

  const handleAddCashVoucher = async () => {
    if (formVale.preco_unit <= 0) {
      setCashError("Informe um valor válido");
      return;
    }

    if (formVale.descricao === "") {
      setCashError("Informe uma descrição válida");
      return;
    }

    await adicionarVale.mutateAsync({
      props: {
        id: idFunc,
        vale: {
          id: Math.random().toString(),
          data_adicao: new Date(),
          quantidade: 1,
          criadoPor: gerente || undefined,
          ...formVale,
        },
      },
    });

    setModalVisible(false);
    setFormVale(emptyVale);
    setCashError("");
    setPrecoTexto("");
  };

  const { novaAdicaoVale } = useEventoAlteracoesContext();

  useEffect(() => {
    encontrarPorId(idFunc);
    refetch();
  }, [idFunc, novaAdicaoVale]);

  useEffect(() => {
    if (adicionarVale.isPending) return;
    if (adicionarVale.isSuccess) {
      refetch();
    }
    if (adicionarVale.isError) {
      alert(
        "Ocorreu um erro ao adicionar o vale",
        adicionarVale.error?.message,
      );
    }
  }, [adicionarVale.isPending]);

  return {
    funcionarioFoco,
    isLoadingF,
    setModalVisible,
    gerente,
    navigation,
    idFunc,
    vales,
    isLoadingVales,
    handleRemoveItem,
    modalVisible,
    setPrecoTexto,
    setFormVale,
    cashError,
    formVale,
    handleAddCashVoucher,
    precoTexto,
    handleOpenModalAddBonus,
    handleCloseModalAddBonus,
    modalAddBonusVisible,
    showAddBonus,
  };
}
