import { useState } from "react";
import { parseMoedaBR } from "../../../../util/formatadores.util";
import { useEmployeeActions } from "../../../../hooks/employee/useEmployeeActions";
import { Alert } from "react-native";

interface FormAddIncentiveBonus {
  valor: string;
  descricao: string;
}

export function useAddIncentiveBonusModalController() {
  const [form, setForm] = useState<FormAddIncentiveBonus>({
    descricao: "",
    valor: "",
  });

  const [cashError, setCashError] = useState("");

  const { addIncentiveBonus } = useEmployeeActions();

  const handleAddIncentiveBonus = async (employeeId: string) => {
    try {
      const parsedValue = parseMoedaBR(form.valor);
      if (parsedValue && isNaN(parsedValue)) {
        setCashError("Informe um valor válido");
        return
      }
  
      if (!parsedValue) {
        setCashError("Valor é obrigatório");
        return
      }
  
      await addIncentiveBonus.mutateAsync({
        props: {
          employeeId,
          valor: parsedValue,
          descricao: form.descricao,
        }
      })
      
      Alert.alert('Sucesso ao adicionar bônus')
    } catch (error) {
      Alert.alert('Ocorreu um erro ao adicionar o bônus')
    }
  }

  return {
    setForm,
    form,
    cashError,
    handleAddIncentiveBonus,
    isPending: addIncentiveBonus.isPending,
  };
}
