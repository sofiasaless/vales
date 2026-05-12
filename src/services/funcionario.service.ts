import { api } from "../config/client";
import { AddIncentiveBonusOnEmployee } from "../hooks/employee/types";
import { Vale } from "../schema/vale.shema";
import { ServicoPadrao } from "./padrao.service";

export class FuncionarioService extends ServicoPadrao {
  protected BASE_PATH: string = "funcionario";

  async adicionarVale(id: string, body: Vale) {
    return await api.put(this.buildUrl(["vale", "adicionar", id]), {
      vale: body,
    });
  }

  async adicionarMultiplosVales(id: string, body: Vale[]) {
    return await api.put(this.buildUrl(["vale", "adicionar-multiplos", id]), {
      vales: body,
    });
  }

  async addIncentiveBonus(payload: AddIncentiveBonusOnEmployee) {
    const { employeeId, ...body } = payload;
    return await api.put(
      this.buildUrl(["incentivo-bonus", "adicionar", employeeId]),
      body,
    );
  }
}
