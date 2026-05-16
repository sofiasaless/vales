import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { CategoriaFinancas } from "../schema/financa.schema";
import {
  Funcionario,
  FuncionarioPostRequestBody,
} from "../schema/funcionario.schema";
import { Incentivo } from "../schema/incentivo.schema";
import Cardapio from "../screens/Cardapio";
import { Config } from "../screens/Config";
import { Contratacao } from "../screens/Contratacao";
import { DetalhesFuncionario } from "../screens/DetalhesFuncionario";
import { EditarFuncionario } from "../screens/EditarFuncionario";
import Financas from "../screens/Financas";
import FinancasDetalhe from "../screens/FinancasDetalhe";
import { GerenciaCardapio } from "../screens/GerenciaCardapio";
import GerenciarGerentes from "../screens/GerenciarGerentes";
import { GerenciaVales } from "../screens/Employee/ManagerVoucher/ManagerVoucher";
import { HistoricoPagamentos } from "../screens/HIstoricoPagamentos";
import { Incentivos } from "../screens/Incentivos";
import { LoginGerente } from "../screens/LoginGerente";
import Mensalidades from "../screens/Mensalidades";
import RegistroVendaIncentivo from "../screens/RegistroVendaIncentivo";
import RelatorioFinancas from "../screens/RelatorioFinancas";
import { customTheme } from "../theme/custom.theme";
import { BottomTabsRoutes } from "./BottomRoutes";
import { AssinaturaContrato } from "../screens/AssinaturaContrato";
import Settings from "../screens/Perfil/Settings/Settings";
import { PaymentResume } from "../screens/Employee/Payment/PaymentResume/PaymentResume";
import { PaymentSignature } from "../screens/Employee/Payment/PaymentSignature/PaymentSignature";
import { MaintenancePage } from "../screens/DefaultPages/MaintenancePage";

export type RootStackParamList = {
  Tabs: undefined;
  Vale: { idFunc: string };
  Funcionario: undefined;
  Cadastro: undefined;
  Contratacao: { funcObj: FuncionarioPostRequestBody };
  ResumoPagamento: { funcObj: Funcionario };
  Assinatura: { funcObj: Funcionario };
  GerenciaCardapio: undefined;
  Detalhes: { idFunc: string };
  Historico: { funcObj: Funcionario };
  Mensalidades: { idRest: string };
  Cardapio: { idFunc: string };
  EditarFuncionario: { funcObj: Funcionario };
  LoginRestaurante: undefined;
  LoginGerente: undefined;
  Config: undefined;
  Financas: { idRest: string };
  FinancasDetalhes: { categoriaObj: CategoriaFinancas };
  Incentivos: { idRest: string };
  RegistroVendaIncentivo: { incentObj: Incentivo };
  FinancasRelatorio: { idRest: string };
  GerenciaGerentes: { idRest: string };
  AssinaturaContrato: { funcObj: FuncionarioPostRequestBody };
  Configuracao: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

enableScreens();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginGerente"
        component={LoginGerente}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Tabs"
        component={BottomTabsRoutes}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Vale"
        component={GerenciaVales}
        options={optionsHeader("Gerênciar vales")}
      />

      <Stack.Screen
        name="ResumoPagamento"
        component={PaymentResume}
        options={optionsHeader("Resumo pagamento")}
      />

      <Stack.Screen
        name="Assinatura"
        component={PaymentSignature}
        options={optionsHeader("Assinatura do funcionário")}
      />

      <Stack.Screen
        name="Detalhes"
        component={DetalhesFuncionario}
        options={optionsHeader("Detalhes")}
      />

      <Stack.Screen
        name="EditarFuncionario"
        component={EditarFuncionario}
        options={optionsHeader("Editar funcionário")}
      />

      <Stack.Screen
        name="Historico"
        component={HistoricoPagamentos}
        options={optionsHeader("Histórico de pagamentos")}
      />

      <Stack.Screen
        name="Mensalidades"
        component={Mensalidades}
        options={optionsHeader("Mensalidades")}
      />

      <Stack.Screen
        name="Cardapio"
        component={Cardapio}
        options={optionsHeader("Cardápio")}
      />

      <Stack.Screen
        name="GerenciaCardapio"
        component={GerenciaCardapio}
        options={optionsHeader("Gerenciar itens do cardápio")}
      />

      <Stack.Screen
        name="Financas"
        component={Financas}
        options={optionsHeader("Gerenciar finanças do restaurante")}
      />

      <Stack.Screen
        name="FinancasDetalhes"
        component={FinancasDetalhe}
        options={optionsHeader("Despesas por categoria")}
      />

      <Stack.Screen
        name="FinancasRelatorio"
        component={RelatorioFinancas}
        options={optionsHeader("Relatório geral de finanças")}
      />

      <Stack.Screen
        name="Incentivos"
        component={MaintenancePage}
        options={optionsHeader("Incentivos aos funcionários")}
      />

      <Stack.Screen
        name="RegistroVendaIncentivo"
        component={RegistroVendaIncentivo}
        options={optionsHeader("Registrar venda no incentivo")}
      />

      <Stack.Screen
        name="GerenciaGerentes"
        component={GerenciarGerentes}
        options={optionsHeader("Gerentes e auxiliares")}
      />

      <Stack.Screen
        name="Contratacao"
        component={Contratacao}
        options={optionsHeader("Contrato do funcionário")}
      />

      <Stack.Screen
        name="AssinaturaContrato"
        component={AssinaturaContrato}
        options={optionsHeader("Assinatura do funcionário")}
      />

      <Stack.Screen
        name="Configuracao"
        component={Settings}
        options={optionsHeader("Configurações")}
      />

      <Stack.Screen
        name="Config"
        component={Config}
        options={optionsHeader("aas")}
      />
    </Stack.Navigator>
  );
}

const optionsHeader = (title: string): StackNavigationOptions => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: customTheme["background-basic-color-1"],
    },
    headerTintColor: customTheme["text-basic-color"],
  };
};
