import { api } from "../config/client";
import { Voucher } from "../model/employee.model";
import { GanhosIncentivo } from "../schema/incentivo.schema";
import { Vale } from "../schema/vale.shema";
import { BaseService } from "./base.service";

export interface CreateEmployeePayment {
  valor_pago: number;
  salario_atual: number;
  vales: Vale[] | Voucher[];
  incentivo: GanhosIncentivo[];
  assinatura?: string;
}

export class PaymentService extends BaseService {
  protected BASE_PATH: string = "pagamento";

  async pay(employeeId: string, payload: CreateEmployeePayment) {
    await api.post(this.buildUrl(["pagar", employeeId]), payload);
  }
}
