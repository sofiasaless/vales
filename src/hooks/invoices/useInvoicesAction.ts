import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InvoiceService } from "../../services/invoice.service";

const invoiceService = new InvoiceService();

export function useInvoicesAction() {
  const queryClient = useQueryClient();

  const sendPayment = useMutation({
    mutationFn: ({
      invoiceId,
      paymentProofUri,
    }: {
      invoiceId: string;
      paymentProofUri: string;
    }) => invoiceService.sendPaymentProof(invoiceId, paymentProofUri),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mensalidades"] })
    },

    onError: (error) => {
      console.error(
        "Erro ao enviar o comprovante ",
        error.message,
        error.stack,
        error.name,
        error.cause,
      );
    },
  });

  return {
    sendPayment,
  };
}
