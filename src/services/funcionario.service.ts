import { api } from "../config/client";
import { AddIncentiveBonusOnEmployee, RemoveIncentiveBonusOnEmployee } from "../hooks/employee/types";
import { EmployeeResponseBody } from "../model/employee.model";
import { Vale } from "../schema/vale.shema";
import { BaseService } from "./base.service";

export class FuncionarioService extends BaseService {
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

  async removeIncentiveBonus(payload: RemoveIncentiveBonusOnEmployee) {
    const { employeeId, ...body } = payload;
    return await api.put(
      this.buildUrl(["incentivo-bonus", "remover", employeeId]),
      body,
    );
  }

  async getEmployeeById(employeeId: string) {
    return await api.get<EmployeeResponseBody>(this.buildUrl(["encontrar", employeeId]));
  }
}
