import { useState } from "react";
import { funcionarioFirestore } from "../firestore/funcionario.firestore";
import { Vale } from "../schema/vale.shema";
import {
  errorHookResponse,
  successHookResponse,
} from "../types/hookResponse.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { converterTimestamp } from "../util/formatadores.util";
import { FuncionarioService } from "../services/funcionario.service";
import { Voucher } from "../model/employee.model";

const funcionarioService = new FuncionarioService();
export function useListarVales(idFuncionario: string) {
  return useQuery({
    queryKey: ["vales", idFuncionario],
    queryFn: async () => {
      const res = await funcionarioFirestore.encontrarPorId(idFuncionario);

      const valesOrdenados = res.vales.sort((a, b) => {
        const data1 = converterTimestamp(a.data_adicao);
        const data2 = converterTimestamp(b.data_adicao);

        return data1.getTime() - data2.getTime();
      });

      return valesOrdenados;
    },
    refetchInterval: 30 * 60 * 1000,
  });
}

export function useVales() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const adicionarVale = useMutation({
    mutationFn: ({
      props,
    }: {
      props: {
        id: string;
        vale: Vale;
      };
    }) => funcionarioService.adicionarVale(props.id, props.vale),

    onSuccess: () => {
      console.info("Vale adicionado com sucesso!");
      // queryClient.invalidateQueries({
      //   queryKey: ["vales", ],
      // });
    },

    onError: (error) => {
      console.error("Erro adicionar vale ao funcionário ", error);
    },
  });

  const adicionarVales = useMutation({
    mutationFn: ({
      props,
    }: {
      props: {
        id: string;
        vales: Vale[];
      };
    }) => funcionarioService.adicionarMultiplosVales(props.id, props.vales),

    onSuccess: () => {
      console.info("Vales adicionados com sucesso!");
      // queryClient.invalidateQueries({
      //   queryKey: ["vales"],
      // });
    },

    onError: (error) => {
      console.error("Erro adicionar vales ao funcionário ", error);
    },
  });

  const removerVale = async (id: string, vale: Vale | Voucher) => {
    setIsLoading(true);
    try {
      await funcionarioFirestore.removerVale(id, vale);
      return true;
    } catch (error: any) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoadingVales, setIsLoadingVales] = useState(false);
  const [vales, setVales] = useState<Vale[]>();
  const listarVales = async (id: string) => {
    setIsLoadingVales(true);
    try {
      const res = await funcionarioFirestore.encontrarPorId(id);
      setVales(res.vales);
      return res.vales;
    } catch (error) {
      setVales(undefined);
    } finally {
      setIsLoadingVales(false);
    }
  };

  return {
    isLoading,
    adicionarVale,
    adicionarVales,
    removerVale,
    listarVales,
    vales,
    isLoadingVales,
  };
}
