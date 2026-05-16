import { Button, Input, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { AppModal } from "../../../../components/AppModal";
import { useAddIncentiveBonusModalController } from "./useAddIncentiveBonusModal.controller";

interface AddIncentiveBonusModalProps {
  employeeId: string;
  modalVisible: boolean;
  onClose: VoidFunction;
}

export const AddIncentiveBonusModal: React.FC<AddIncentiveBonusModalProps> = ({
  employeeId,
  modalVisible,
  onClose,
}) => {
  const { form, setForm, cashError, handleAddIncentiveBonus, isPending } =
    useAddIncentiveBonusModalController({ onClose });

  return (
    <AppModal onClose={onClose} visible={modalVisible}>
      <Text category="h6" style={styles.modalTitle}>
        Preencha abaixo para adicionar bônus
      </Text>

      <Input
        label="Valor (R$)"
        size="small"
        placeholder="0,00"
        value={form.valor}
        keyboardType="decimal-pad"
        onChangeText={(text) => {
          setForm((prev) => ({
            ...prev,
            valor: text,
          }));
        }}
        status={cashError ? "danger" : "basic"}
        style={styles.input}
      />

      <Input
        label="Descrição"
        size="small"
        placeholder="Ex: Diária extra"
        value={form.descricao}
        onChangeText={(text) => {
          setForm((prev) => ({
            ...prev,
            descricao: text,
          }));
        }}
        style={styles.input}
      />

      <View style={styles.modalActions}>
        <Button size="small" appearance="outline" onPress={onClose}>
          Cancelar
        </Button>
        <Button
          onPress={() => handleAddIncentiveBonus(employeeId)}
          size="small"
          disabled={isPending}
        >
          Confirmar
        </Button>
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 16,
  },

  deleteText: {
    marginVertical: 12,
  },
  input: {
    marginTop: 8,
  },
  errorText: {
    marginTop: 4,
  },
});
