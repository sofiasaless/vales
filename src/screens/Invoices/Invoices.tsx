import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CardGradient } from "../../components/CardGradient";
import { DinheiroDisplay } from "../../components/DinheiroDisplay";
import { customTheme } from "../../theme/custom.theme";
import { converterTimestamp } from "../../util/formatadores.util";
import { useInvoicesController } from "./useInvoices.controller";
import { AvatarUpload } from "../../components/AvatarUpload";

export default function Invoices() {
  const {
    theme,
    copied,
    formatadoCurto,
    formatadoLongo,
    handleCopyPix,
    mensalidades,
    selected,
    setSelected,
    statusConfig,
    handleSendPaymentProof,
    paymentProof,
    handleSetPaymentProof,
    handleCloseModal,
    isSending,
  } = useInvoicesController();

  const styles = createStyles(theme);

  return (
    <Layout style={styles.container}>
      <View style={styles.content}>
        {mensalidades?.map((sub) => {
          const status = statusConfig[sub.status];

          return (
            <TouchableOpacity
              key={sub.id}
              activeOpacity={0.8}
              onPress={() => setSelected(sub)}
            >
              <CardGradient styles={styles.card}>
                <View style={styles.row}>
                  <View style={styles.flex}>
                    <Text category="s1">
                      Mensalidade -{" "}
                      {converterTimestamp(sub.data_vencimento)
                        .toLocaleDateString()
                        .substring(3, 10)}
                    </Text>

                    <View style={styles.dateRow}>
                      <Ionicons
                        name="calendar-outline"
                        size={14}
                        color={customTheme["text-hint-color"]}
                      />
                      <Text appearance="hint" category="c1">
                        Vence em{" "}
                        {formatadoLongo(
                          converterTimestamp(sub.data_vencimento),
                        )}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.right}>
                    <DinheiroDisplay value={sub.valor} size="md" />

                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: status.bg },
                      ]}
                    >
                      <Ionicons
                        name={status.icon as any}
                        size={12}
                        color={status.text}
                      />
                      <Text category="c2" style={{ color: status.text }}>
                        {status.label}
                      </Text>
                    </View>
                  </View>
                </View>
              </CardGradient>
            </TouchableOpacity>
          );
        })}
      </View>

      {selected && (
        <Modal
          backdropStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          visible={!!selected}
          onBackdropPress={() => setSelected(null)}
        >
          <Card style={{ width: 300, maxWidth: 300, minWidth: 200 }}>
            <Text category="h6">
              {formatadoCurto(converterTimestamp(selected.data_vencimento))}
            </Text>
            <Text appearance="hint" category="c1">
              Detalhes do pagamento
            </Text>

            {/* VALOR */}
            <View style={styles.block}>
              <Text appearance="hint" category="c1">
                Valor
              </Text>
              <DinheiroDisplay
                value={selected.valor}
                variant="positive"
                size="md"
              />
            </View>

            {/* VENCIMENTO */}
            <View style={styles.block}>
              <View style={styles.iconRow}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={customTheme["text-hint-color"]}
                />
                <Text appearance="hint" category="c1">
                  Data de vencimento
                </Text>
              </View>
              <Text category="s1">
                {converterTimestamp(
                  selected.data_vencimento,
                ).toLocaleDateString()}
              </Text>
            </View>

            {/* PIX */}
            <View style={styles.block}>
              <Text appearance="hint" category="c1">
                Chave PIX
              </Text>

              <View style={styles.pixRow}>
                <Text style={styles.pixKey}>{selected.link}</Text>

                <Button
                  appearance="outline"
                  size="small"
                  onPress={() => handleCopyPix(selected.link)}
                >
                  <Ionicons
                    name={copied ? "checkmark" : "copy-outline"}
                    size={16}
                    color={
                      copied
                        ? theme["color-success-600"]
                        : theme["color-primary-600"]
                    }
                  />
                </Button>
              </View>
            </View>

            <View style={styles.block}>
              <AvatarUpload
                value={paymentProof ?? undefined}
                onChange={handleSetPaymentProof}
                textLabel="Selecionar comprovante"
                titleLabel="Comprovante"
                avatarFormat="card"
                imageFormat="3x4"
              />
            </View>

            <View style={styles.buttonsView}>
              {selected.status != "PAGO" && (
                <Button
                  status="warning"
                  size="small"
                  accessoryLeft={
                    <Entypo name="documents" size={16} color="black" />
                  }
                  onPress={handleSendPaymentProof}
                  disabled={
                    isSending ||
                    selected.status == 'ANÁLISE'
                  }
                >
                  Enviar comprovante
                </Button>
              )}

              <Button appearance="outline" onPress={handleCloseModal}>
                Fechar
              </Button>
            </View>
          </Card>
        </Modal>
      )}
    </Layout>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: 16,
      gap: 12,
    },
    card: {
      padding: 16,
      borderWidth: 0.8,
      borderRadius: 12,
      borderColor: customTheme["text-disabled-color"],
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },
    flex: {
      flex: 1,
    },
    right: {
      alignItems: "flex-end",
      gap: 8,
    },
    dateRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 4,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 999,
    },
    backdrop: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modal: {
      width: 320,
      borderRadius: 16,
      gap: 12,
    },
    block: {
      backgroundColor: customTheme["background-alternative-color-1"],
      borderRadius: 14,
      padding: 12,
      gap: 6,
      marginBlock: 8,
    },
    iconRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    pixRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    pixKey: {
      flex: 1,
      fontFamily: "monospace",
      fontSize: 12,
    },
    buttonsView: {
      gap: 10,
    },
  });
