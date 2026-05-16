import { Card, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

import { Vale } from "../schema/vale.shema";
import { customTheme } from "../theme/custom.theme";
import { converterTimestamp, formatDateTime } from "../util/formatadores.util";
import { LixeiraItem } from "./LixeiraItem";
import { Voucher } from "../model/employee.model";

interface VoucherItemCardProps {
  item: Vale | Voucher;
  showControls?: boolean;
  dangerStyle?: boolean;
  onExclude?: (v: Vale | Voucher) => void;
}

export const ItemVale: React.FC<VoucherItemCardProps> = ({
  item,
  showControls,
  dangerStyle,
  onExclude,
}) => {
  const theme = useTheme();
  const totalValue = item.preco_unit * item.quantidade;

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: dangerStyle
            ? "#d9554636"
            : `${theme["color-basic-600"]}80`,
          borderWidth: dangerStyle ? 0 : 1,
        },
      ]}
      disabled
    >
      <View style={styles.content}>
        {/* Info */}
        <View style={styles.info}>
          <Text category="s2" numberOfLines={1}>
            {item.descricao}
          </Text>

          <Text appearance="hint" category="c2">
            {item.quantidade}x{" "}
            <Text category="s2">{item.preco_unit.toFixed(2)}</Text>
          </Text>

          <Text
            category="c2"
            style={{ color: customTheme["text-hint-color"] }}
            numberOfLines={1}
          >
            Adc. em {formatDateTime(item.data_adicao)}
          </Text>

          {item.criadoPor && (
            <Text
              category="c2"
              style={{ color: customTheme["text-hint-color"] }}
              numberOfLines={1}
            >
              Criado por: {item.criadoPor.nome}
            </Text>
          )}
        </View>

        {/* Right side */}
        <View style={styles.right}>
          <Text category="s2">R$ {totalValue.toFixed(2)}</Text>

          {showControls && <LixeiraItem action={() => onExclude!(item)} />}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    borderRadius: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  total: {
    marginRight: 8,
  },
  removeButton: {
    borderRadius: 999,
    padding: 7,
    backgroundColor: customTheme["background-transparent-danger"],
  },
});
