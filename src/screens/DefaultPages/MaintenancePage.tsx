import { Layout, Text } from "@ui-kitten/components";

export function MaintenancePage() {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>🚧 Funcionalidade em manutenção 🚧</Text>
      <Text appearance="hint" category="s2">
        Disponível em breve!
      </Text>
    </Layout>
  );
}
