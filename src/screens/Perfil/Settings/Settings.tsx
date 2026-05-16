import { Divider, Layout, Text, Toggle, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSettingsContext } from "../../../context/SettingsContext";
import { useSettingController } from "./useSettings.controller";

export default function Settings() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const { settingsItems } = useSettingController();

  return (
    <Layout style={styles.container}>
      <View style={styles.content}>
        {settingsItems.map((si) => (
          <>
            <View style={styles.option}>
              <Text category="s2" style={{ flexWrap: "wrap", width: "55%" }}>
                {si.description}
              </Text>
              <Toggle checked={si.checked} onChange={si.handleToggle} />
            </View>
            <Divider
              style={{
                backgroundColor: theme["color-basic-100"],
                opacity: 0.3,
              }}
            />
          </>
        ))}
      </View>
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
    option: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
