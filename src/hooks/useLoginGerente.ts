import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { GerenteFirestore } from "../firestore/gerente.firestore";
import { AutenticarGerenteDTO, Gerente } from "../schema/gerente.schema";
import { GerenteService } from "../services/gerente.service";
import { errorHookResponse } from "../types/hookResponse.type";
import { usePushNotifications } from "./usePushNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const gerenteService = new GerenteService();

export function useLoginGerente() {
  const queryClient = useQueryClient();
  usePushNotifications();

  const gerenteFirestore = new GerenteFirestore();

  const autenticar = useMutation({
    mutationFn: ({ form }: { form: AutenticarGerenteDTO }) =>
      gerenteService.autenticar(form),

    onSuccess: async (data) => {
      const sucessResult = data?.usuario
      if (sucessResult) await AsyncStorage.setItem("gerente", JSON.stringify(sucessResult));
    },

    onError: (error) => {
      console.error("Erro ao autenticar gerente conectado ", error.message);
    },
  });

  const [gerentes, setGerentes] = useState<Gerente[]>();
  const [isLoadingGerentes, setIsLoadingGerentes] = useState(false);
  const listarGerentes = async (idRestaurante: string) => {
    try {
      setIsLoadingGerentes(true);
      const res = await gerenteFirestore.listar(idRestaurante);
      setGerentes(res);
    } catch (error) {
      return errorHookResponse(error);
    } finally {
      setIsLoadingGerentes(false);
    }
  };

  return {
    gerentes,
    isLoadingGerentes,
    listarGerentes,
    autenticar,
  };
}
