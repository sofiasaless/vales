import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DateFilterProps, despesaFirestore } from "../firestore/despesa.firestore";
import { DespesaPostRequestBody } from "../schema/financa.schema";

export function useListarDespesas(idCategoria: string, filtro: DateFilterProps) {
  return useQuery({
    queryKey: [
      'despesas',
      idCategoria,
      filtro.dataInicio.toISOString(),
      filtro.dataFim.toISOString()
    ],
    queryFn: async () => {
      const res = await despesaFirestore.listar(idCategoria, filtro)
      return res
    }
  })
}

export function useListarDespesasDoMes(idRestaurante: string, filtro: DateFilterProps) {
  return useQuery({
    queryKey: [
      'despesas_mes',
      filtro.dataFim,
      filtro.dataInicio
    ],
    queryFn: async () => {
      const res = despesaFirestore.listarDeTodasCategorias(idRestaurante, filtro);
      return res;
    }
  })
}

export function useAcoesDespesa() {
  const queryClient = useQueryClient();

  const excluirDespesa = useMutation({
    mutationFn: ({props}: {props: {
      idDespesa: string,
    }}) => despesaFirestore.excluirDespesa(props.idDespesa),

    onSuccess: () => {
      console.info('Exlcusao de registro feita com sucesso')
      queryClient.invalidateQueries({queryKey: ["despesas"]}),
      queryClient.invalidateQueries({queryKey: ["despesas_mes"]})
    },

    onError: (error) => {
      console.error('Erro ao excluir registro de despesa ', error);
    },
  });

  const adicionarDespesa = useMutation({
    mutationFn: ({props}: {props: {
      idCategoria: string,
      body: DespesaPostRequestBody
    }}) => despesaFirestore.criar(props.idCategoria, props.body),

    onSuccess: () => {
      console.info('Adição de despesa feita com sucesso')
      queryClient.invalidateQueries({queryKey: ["despesas"]}),
      queryClient.invalidateQueries({queryKey: ["despesas_mes"]})
    },

    onError: (error) => {
      console.error('Erro ao adicionar registro de despesa ', error);
    },
  });

  return {
    excluirDespesa,
    adicionarDespesa
  }

}