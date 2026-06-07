import { api } from "../config/client";
import { BaseService } from "./base.service";

export class InvoiceService extends BaseService {
  protected BASE_PATH: string = "mensalidade";

  async sendPaymentProof(invoiceId: string, paymentProofUri: string) {
    console.info(invoiceId);

    const resul = await api.put(
      this.buildUrl(["enviar-pagamento", invoiceId]),
      {
        comprovante: paymentProofUri,
      },
    );

    console.info(resul.config.url);
    console.info(resul.request);
    console.info(resul.status);

    return resul;
  }
}
