import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gerenteFirestore } from "../firestore/gerente.firestore";
import { Gerente, GerenteUpdateDTO } from "../schema/gerente.schema";
import { GerenteService } from "../services/gerente.service";

export function useGerenteConectado() {
  return useQuery({
    queryKey: ["gerente_conectado"],
    queryFn: async () => {
      const string_res = await AsyncStorage.getItem("gerente");

      if (string_res) {
        const res = JSON.parse(string_res) as Gerente;
        return res;
      }
      return null;
    },
    refetchOnReconnect: true,
    refetchInterval: 30 * 60 * 1000,
  });
}

export function useListarGerentes(idRestaurante: string) {
  return useQuery({
    queryKey: ["gerentes"],
    queryFn: async () => {
      const res = await gerenteFirestore.listar(idRestaurante);
      return res;
    },
  });
}

const gerenteService = new GerenteService();

export function useAcoesGerente() {
  const queryClient = useQueryClient();

  const atualizarImagem = async (
    id_rest: string,
    gerente_atual: Gerente,
    img: string,
  ) => {
    gerenteFirestore.atualizar(id_rest, gerente_atual.id, { img_perfil: img });
    gerente_atual.img_perfil = img;
    await AsyncStorage.setItem("gerente", JSON.stringify(gerente_atual));
  };

  const atualizarFotoGerente = useMutation({
    mutationFn: ({
      props,
    }: {
      props: {
        id_rest: string;
        gerente_atual: Gerente;
        img: string;
      };
    }) => atualizarImagem(props.id_rest, props.gerente_atual, props.img),

    onSuccess: () => {
      console.info("foto do gerente atualizada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["gerente_conectado"],
      });
    },

    onError: (error) => {
      console.error("Erro ao atualizar gerente conectado ", error);
    },
  });

  const atualizar = useMutation({
    mutationFn: ({ props }: { props: GerenteUpdateDTO }) =>
      gerenteService.atualizar(props),

    onSuccess: () => {
      console.info("gerente atualizada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["gerentes"],
      });
    },

    onError: (error) => {
      console.error("Erro ao atualizar gerente ", error);
    },
  });

  return {
    atualizarFotoGerente,
    atualizar,
  };
}
