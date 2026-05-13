import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  Button,
  Layout
} from '@ui-kitten/components';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { SignaturePad, SignaturePadRef } from '../../../../components/SignaturePad';
import { usePaymentActions } from '../../../../hooks/payment/usePaymentActions';
import { RootStackParamList } from '../../../../routes/StackRoutes';
import { Funcionario } from '../../../../schema/funcionario.schema';
import { uploadAssinaturaCloudinary } from '../../../../services/cloudnary.serivce';
import { alert } from '../../../../util/alertfeedback.util';
import { calcularTotalParaPagar } from '../../../../util/calculos.util';
import { formatarDataVales } from '../../../../util/datas.util';

export const PaymentSignature = () => {
  const route = useRoute();
  const { funcObj } = route.params as { funcObj: Funcionario };
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  const signatureRef = useRef<SignaturePadRef>(null);
  const [assinaturaBase64, setAssinaturaBase64] = useState<string | null>(null);

  const salvarAssinatura = (base64: string) => {
    setAssinaturaBase64(base64);
    Alert.alert("Assinatura capturada!");
  };

  const { payEmployee } = usePaymentActions();

  const [isLoading, setIsLoading] = useState(false)
  const gerarECompartilharPDF = async () => {
    try {
      setIsLoading(true)
      if (!assinaturaBase64) {
        Alert.alert("Erro", "Nenhuma assinatura encontrada");
        return;
      }

      const cloudnary_url = await uploadAssinaturaCloudinary(assinaturaBase64);

      await payEmployee.mutateAsync({
        employeeId: funcObj.id,
        body: {
          incentivo: funcObj.incentivo,
          vales: formatarDataVales(funcObj.vales),
          valor_pago: calcularTotalParaPagar(funcObj),
          salario_atual: funcObj.salario,
          assinatura: cloudnary_url.secure_url,
        }
      })
    } catch (error: any) {
      console.error('Ocorreu um erro ao confirmar pagamento do funcionário', error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (payEmployee.isPending) return;

    if (payEmployee.status === 'error') {
      alert('Ocorreu um erro ao confirmar pagamento do funcionário ', payEmployee.error.message);
      return;
    }
    if (payEmployee.status === 'success') {
      navigator.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });
      return;
    }
  }, [payEmployee.isPending, payEmployee.status])

  return (
    <Layout style={styles.container}>
      <SignaturePad ref={signatureRef} onSave={salvarAssinatura} />

      <View style={styles.buttons}>
        <View style={styles.controlButtons}>
          <Button
            style={{ flex: 1 }}
            status='warning'
            appearance='outline'
            onPress={() => signatureRef.current?.limpar()}
          >Limpar assinatura</Button>

          <Button
            style={{ flex: 1 }}
            status='info'
            appearance='outline'
            onPress={() => signatureRef.current?.salvar()}
          >Salvar assinatura</Button>
        </View>

        <Button
          onPress={gerarECompartilharPDF}
          disabled={!assinaturaBase64 || isLoading}
          accessoryLeft={<MaterialIcons name="payment" size={18} color={'black'} />}
        >{(isLoading) ? 'Confirmando...' : 'Confirmar pagamento'}</Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    padding: 15,
    gap: 10
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 10
  }
});