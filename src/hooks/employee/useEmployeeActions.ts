import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddIncentiveBonusOnEmployee } from "./types";
import { FuncionarioService } from "../../services/funcionario.service";

const funcionarioService = new FuncionarioService();

export function useEmployeeActions() {
  const queryClient = useQueryClient();

  const addIncentiveBonus = useMutation({
    mutationFn: ({ props }: { props: AddIncentiveBonusOnEmployee }) => funcionarioService.addIncentiveBonus(props),

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["funcionarios", true]})
      queryClient.invalidateQueries({queryKey: ["funcionarios", false]})
      queryClient.invalidateQueries({queryKey: ["funcionario"]})
    },

    onError: (error) => {
      console.error('Erro ao adicionar bônus no funcionário ', error)
    }
  })

  return {
    addIncentiveBonus,
  }
}