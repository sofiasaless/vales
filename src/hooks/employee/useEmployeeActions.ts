import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddIncentiveBonusOnEmployee, RemoveIncentiveBonusOnEmployee } from "./types";
import { FuncionarioService } from "../../services/funcionario.service";

const funcionarioService = new FuncionarioService();

export function useGetEmployee(employeeId: string) {
  return useQuery({
    queryKey: ["funcionarios",
      employeeId,
    ],
    queryFn: async () => {
      const result = await funcionarioService.getEmployeeById(employeeId);
      return result.data;
    },
    refetchOnReconnect: true,
    refetchInterval: 30 * 60 * 1000
  })
}

export function useEmployeeActions() {
  const queryClient = useQueryClient();

  const addIncentiveBonus = useMutation({
    mutationFn: ({ props }: { props: AddIncentiveBonusOnEmployee }) =>
      funcionarioService.addIncentiveBonus(props),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["funcionarios", true] });
      queryClient.invalidateQueries({ queryKey: ["funcionarios", false] });
      queryClient.invalidateQueries({ queryKey: ["funcionario"] });
    },

    onError: (error) => {
      console.error("Erro ao adicionar bônus no funcionário ", error);
    },
  });

  const removeIncentiveBonus = useMutation({
    mutationFn: ({ props }: { props: RemoveIncentiveBonusOnEmployee }) =>
      funcionarioService.removeIncentiveBonus(props),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["funcionarios", true] });
      queryClient.invalidateQueries({ queryKey: ["funcionarios", false] });
      queryClient.invalidateQueries({ queryKey: ["funcionario"] });
    },

    onError: (error) => {
      console.error("Erro ao remover bônus no funcionário ", error);
    },
  });

  return {
    addIncentiveBonus,
    removeIncentiveBonus,
  };
}
