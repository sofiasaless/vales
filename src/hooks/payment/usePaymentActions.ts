import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateEmployeePayment,
  PaymentService,
} from "../../services/payment.service";

const paymentService = new PaymentService();

export function usePaymentActions() {
  const queryClient = useQueryClient();

  const payEmployee = useMutation({
    mutationFn: ({
      employeeId,
      body,
    }: {
      employeeId: string;
      body: CreateEmployeePayment;
    }) => paymentService.pay(employeeId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["funcionarios", true] });
      queryClient.invalidateQueries({ queryKey: ["funcionarios", false] });
      queryClient.invalidateQueries({ queryKey: ["pagamentos"] });
      queryClient.invalidateQueries({ queryKey: ["pagamento"] });
    },

    onError: (error) => {
      console.error(
        "Erro ao realizar pagamento do funcionário ",
        error.message,
        error.stack,
        error.name,
        error.cause,
      );
    },
  });

  return {
    payEmployee,
  };
}
