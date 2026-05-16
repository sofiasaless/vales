import { useEffect, useState } from "react";

import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  useEmployeeActions,
  useGetEmployee,
} from "../../../../hooks/employee/useEmployeeActions";
import { usePaymentActions } from "../../../../hooks/payment/usePaymentActions";
import { EmployeeTypes } from "../../../../model/employee.model";
import { RootStackParamList } from "../../../../routes/StackRoutes";
import { Funcionario } from "../../../../schema/funcionario.schema";
import { alert } from "../../../../util/alertfeedback.util";
import { calcularTotalParaPagar } from "../../../../util/calculos.util";
import { formatarDataVales } from "../../../../util/datas.util";
import { RemoveIncentiveBonusOnEmployee } from "../../../../hooks/employee/types";
import { Alert } from "react-native";

interface RouteParams {
  funcObj: Funcionario;
}

export function usePaymentResumeController() {
  const route = useRoute();
  const { funcObj } = route.params as RouteParams;
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    data: employee,
    isLoading: isLoadingEmployee,
    refetch,
  } = useGetEmployee(funcObj.id);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleOpenConfirmModal = () => setShowConfirmModal(true);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  const getBaseSalario = () => {
    let txt =
      employee?.tipo === EmployeeTypes.PERMANENT
        ? `(Salário Base) R$ `
        : `(Diária Base) R$ `;
    return (txt += funcObj.salario.toFixed(2));
  };

  const incentivos = () => {
    if (!employee) return 0;
    if (employee?.incentivo.length === 0) return 0;
    return employee?.incentivo?.reduce((acc, inc) => {
      return acc + inc.valor;
    }, 0);
  };

  const { payEmployee } = usePaymentActions();

  const handleConfirmPayment = async () => {
    await payEmployee.mutateAsync({
      body: {
        incentivo: employee?.incentivo || [],
        vales: formatarDataVales(employee?.vales || []),
        valor_pago: calcularTotalParaPagar(funcObj),
        salario_atual: employee?.salario || 0,
      },
      employeeId: employee?.id || "",
    });
  };

  useEffect(() => {
    if (payEmployee.isPending) return;

    if (payEmployee.status === "error") {
      alert(
        "Ocorreu um erro ao pagar o funcionário",
        payEmployee.error.message,
      );
      return;
    }
    if (payEmployee.status === "success") {
      setShowConfirmModal(false);
      navigator.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
      return;
    }
  }, [payEmployee.isPending, payEmployee.status]);

  const { removeIncentiveBonus } = useEmployeeActions();

  const handleRemoveIncentiveBonus = async (
    body: RemoveIncentiveBonusOnEmployee,
  ) => {
    Alert.alert(
      `Tem certeza que deseja remover o bônus "${body.descricao}"?`,
      "Não será possível recuperá-lo após a remoção.",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await removeIncentiveBonus.mutateAsync({
                props: {
                  ...body,
                },
              });
              await refetch();
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
    );
  };

  useEffect(() => {
    if (removeIncentiveBonus.isPending) return;

    if (removeIncentiveBonus.status === "success") {
      Alert.alert("Sucesso ao remover incentivo/bônus do funcionário!");
    }
    if (removeIncentiveBonus.status === "error") {
      Alert.alert("Ocorreu um remover incentivo/bônus.");
    }
  }, [removeIncentiveBonus.isPending, removeIncentiveBonus.status]);

  return {
    employee,
    getBaseSalario,
    funcObj,
    incentivos,
    navigator,
    showConfirmModal,
    handleCloseConfirmModal,
    handleOpenConfirmModal,
    handleConfirmPayment,
    payEmployee,
    isLoadingEmployee,
    handleRemoveIncentiveBonus,
  };
}
