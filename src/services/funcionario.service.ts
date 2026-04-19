import { api } from "../config/client";
import { Vale } from "../schema/vale.shema";
import { ServicoPadrao } from "./padrao.service";

export class FuncionarioService extends ServicoPadrao {
  protected BASE_PATH: string = "funcionario";

  async adicionarVale(id: string, body: Vale) {
    return await api.put(this.buildUrl(["vale", "adicionar", id]), body);
  }

  async adicionarMultiplosVales(id: string, body: Vale[]) {
    return await api.put(
      this.buildUrl(["vale", "adicionar-multiplos", id]),
      body,
    );
  }
}
