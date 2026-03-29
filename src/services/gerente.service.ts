import { api } from "../config/client";
import {
  AutenticarGerenteDTO,
  AutenticateResponseBody,
} from "../schema/gerente.schema";
import { ServicoPadrao } from "./padrao.service";

export class GerenteService extends ServicoPadrao {
  protected BASE_PATH: string = "gerente";

  async autenticar(payload: AutenticarGerenteDTO) {
    const resultado = await api.post<AutenticateResponseBody>(
      this.buildUrl(["autenticar"]),
      payload,
    );
    return resultado.data;
  }
}
