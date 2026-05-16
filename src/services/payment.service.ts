import { api } from "../config/client";
import { GanhosIncentivo } from "../schema/incentivo.schema";
import { Vale } from "../schema/vale.shema";
import { BaseService } from "./base.service";

export interface CreateEmployeePayment {
  valor_pago: number;
  salario_atual: number;
  vales: Vale[];
  incentivo: GanhosIncentivo[];
  assinatura?: string;
}

export class PaymentService extends BaseService {
  protected BASE_PATH: string = "pagamento";

  async pay(employeeId: string, payload: CreateEmployeePayment) {
    await api.post(this.buildUrl(["pagar", employeeId]), payload);
  }
}