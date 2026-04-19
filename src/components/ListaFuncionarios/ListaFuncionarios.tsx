import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Input, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { FlatList, View } from "react-native";
import { customTheme } from "../../theme/custom.theme";
import { CardGradient } from "../CardGradient";
import { Carregando } from "../Carregando";
import { DinheiroDisplay } from "../DinheiroDisplay";
import { FuncionarioCard } from "../FuncionarioCard";
import { IncentivoAtivoCard } from "../IncentivoAtivoCard";
import { useListaFuncionariosController } from "./useListaFuncionarios.controller";

export const ListaFuncionarios = () => {
  const {
    funcionarios,
    isLoading,
    styles,
    theme,
    setSearch,
    filteredEmployees,
    valesAbertos,
    funcComVales,
    incentivo_ativo,
    showSearchEmployeeBar,
  } = useListaFuncionariosController();

  const EmptyState = () => (
    <View style={styles.empty}>
      <AntDesign
        name="usergroup-delete"
        size={46}
        color={theme["text-hint-color"]}
      />
      <Text appearance="hint" style={styles.emptyText}>
        Nenhum funcionário cadastrado
      </Text>
      <Text category="c1" appearance="hint">
        Toque em "Cadastrar" para adicionar
      </Text>
    </View>
  );

  return (
    <Layout level="1" style={styles.screen}>
      {incentivo_ativo && (
        <View style={[{ marginBottom: 10 }, styles.controleUsuario]}>
          <IncentivoAtivoCard incentivo={incentivo_ativo} />
        </View>
      )}

      <View style={[styles.summaryGrid, styles.controleUsuario]}>
        {/* Total Employees */}
        <CardGradient styles={styles.summaryCard}>
          <View style={styles.row}>
            <Feather name="users" size={16} color={theme["text-hint-color"]} />
            <Text category="c1" appearance="hint">
              Total
            </Text>
          </View>

          <Text category="h5" style={styles.value}>
            {funcionarios?.length || 0}
          </Text>

          <Text category="c1" appearance="hint">
            funcionários
          </Text>
        </CardGradient>

        {/* Open Vouchers */}
        <CardGradient styles={styles.summaryCard}>
          <View style={styles.row}>
            <FontAwesome6
              name="arrow-trend-up"
              size={16}
              color={customTheme["color-primary-600"]}
            />
            <Text category="c1" status="primary">
              Vales Abertos
            </Text>
          </View>

          <DinheiroDisplay
            value={valesAbertos || 0}
            variant="positive"
            size="md"
          />

          <Text category="c1" appearance="hint" style={styles.mt4}>
            {funcComVales} funcionário(s) com vales
          </Text>
        </CardGradient>
      </View>

      <Input
        style={{ display: showSearchEmployeeBar ? "flex" : "none" }}
        size="tiny"
        status="primary"
        placeholder="Pesquisar..."
        onChangeText={setSearch}
        accessoryLeft={
          <Feather
            name="search"
            size={20}
            color={customTheme["color-primary-500"]}
          />
        }
      />

      {isLoading ? (
        <Carregando />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredEmployees}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.employeeItem}>
              <FuncionarioCard employee={item} />
            </View>
          )}
          ListEmptyComponent={<EmptyState />}
        />
      )}
    </Layout>
  );
};
