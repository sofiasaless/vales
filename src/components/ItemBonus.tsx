import { Card, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

import { GanhosIncentivo } from "../schema/incentivo.schema";
import { customTheme } from "../theme/custom.theme";
import { LixeiraItem } from "./LixeiraItem";
import { formatDateTime } from "../util/formatadores.util";

interface VoucherItemCardProps {
  item: GanhosIncentivo;
  showControls?: boolean;
  onExclude?: (v: GanhosIncentivo) => void;
}

export const ItemBonus: React.FC<VoucherItemCardProps> = ({
  item,
  showControls,
  onExclude,
}) => {
  const theme = useTheme();
  const totalValue = item.valor;

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: "#cc8b1b4d",
          borderWidth: 1,
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

          <Text
            category="c2"
            style={{ color: customTheme["text-hint-color"] }}
            numberOfLines={1}
          >
            {item.data &&
              `Adc. em ${formatDateTime(new Date(item.data))}`
            }
          </Text>
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
