import { useRoute } from "@react-navigation/native";
import { useTheme } from "@ui-kitten/components";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { useListarMensalidades } from "../../hooks/useMensalidades";
import { Mensalidade } from "../../schema/mensalidade.schema";
import { uploadImage } from "../../services/cloudnary.serivce";
import { useInvoicesAction } from "../../hooks/invoices/useInvoicesAction";
import { alert } from "../../util/alertfeedback.util";

export function useInvoicesController() {
  const route = useRoute();
  const { idRest } = route.params as { idRest: string };

  const { data: mensalidades } = useListarMensalidades(idRest);

  const theme = useTheme();

  const [selected, setSelected] = useState<Mensalidade | null>(null);
  const [copied, setCopied] = useState(false);

  const { sendPayment } = useInvoicesAction();

  const statusConfig = {
    PAGO: {
      label: "Pago",
      icon: "checkmark-circle",
      bg: theme["color-success-100"],
      text: theme["color-success-700"],
    },
    PENDENTE: {
      label: "Pendente",
      icon: "time",
      bg: theme["color-warning-100"],
      text: theme["color-warning-700"],
    },
    VENCIDO: {
      label: "Vencido",
      icon: "alert-circle",
      bg: theme["color-danger-100"],
      text: theme["color-danger-700"],
    },
    ANÁLISE: {
      label: "Em análise",
      icon: "time",
      bg: theme["color-info-100"],
      text: theme["color-info-700"],
    },
  };

  const formatadoLongo = (data: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(data);
  };

  const formatadoCurto = (data: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    })
      .format(data)
      .toUpperCase();
  };

  const handleCopyPix = async (pix: string) => {
    await Clipboard.setStringAsync(pix);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [paymentProof, setPaymentProof] = useState<string | null>(
    selected?.comprovante || null,
  );
  const handleSetPaymentProof = (uri: string) => setPaymentProof(uri);

  const [isSending, setIsSending] = useState(false);
  const handleSendPaymentProof = async () => {
    try {
      setIsSending(true);
      if (paymentProof) {
        console.info({ selected });
        const uriFromCloudinary = await uploadImage(paymentProof);
        await sendPayment.mutateAsync({
          invoiceId: selected?.id || "",
          paymentProofUri: uriFromCloudinary,
        });
        alert("Comprovante enviado com sucesso!");
      }
    } catch (error) {
      alert("Erro ao enviar o comprovante!");
    } finally {
      setIsSending(false);
    }
  };

  const handleCloseModal = () => {
    console.info({ selected });
    setPaymentProof(null);
    setSelected(null);
  };

  useEffect(() => {
    if (selected?.comprovante) setPaymentProof(selected.comprovante);
  }, [selected]);

  return {
    theme,
    mensalidades,
    setSelected,
    selected,
    statusConfig,
    formatadoLongo,
    formatadoCurto,
    handleCopyPix,
    copied,
    paymentProof,
    handleSendPaymentProof,
    handleSetPaymentProof,
    handleCloseModal,
    isSending,
  };
}
