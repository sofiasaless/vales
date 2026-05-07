import { api } from "../config/client";
import {
  AutenticarGerenteDTO,
  AutenticateResponseBody,
  GerentePostRequestBody,
  GerenteUpdateDTO,
} from "../schema/gerente.schema";
import { ServicoPadrao } from "./padrao.service";

export class GerenteService extends ServicoPadrao {
  protected BASE_PATH: string = "gerente";

  async autenticar(payload: AutenticarGerenteDTO) {
    console.info('rota usada ',api.defaults.baseURL)
    console.info('rota usada ',this.buildUrl(["autenticar"]))
    const resultado = await api.post<AutenticateResponseBody>(
      this.buildUrl(["autenticar"]),
      payload,
    );
    return resultado.data;
  }

  async atualizar(payload: GerenteUpdateDTO) {
    const { id, ...body } = payload;
    await api.put(this.buildUrl(["atualizar", id]), body);
  }

  async criarGerente(payload: GerentePostRequestBody) {
    await api.post(this.buildUrl(["criar"]), payload);
  }
}
