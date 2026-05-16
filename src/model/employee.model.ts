import { BaseModelAtributtes } from "./base.model";

export enum EmployeeTypes {
  PERMANENT = "FIXO",
  DAILY = "DIARISTA",
}

export type Voucher = {
  id: string;
  quantidade: number;
  descricao: string;
  data_adicao: Date;
  preco_unit: number;
  produto_ref?: string | null;
  criadoPor?: any;
};

export type IncentiveBonus = {
  id: string;
  valor: number;
  descricao?: string;
  incentivo_ref?: string;
  data: string;
};

export interface EmployeeResponseBody extends BaseModelAtributtes {
  nome: string;
  salario: number;
  cpf?: string;
  cargo: string;
  tipo: EmployeeTypes;
  dias_trabalhados_semanal?: number;
  foto_url?: string;
  data_nascimento?: Date | null;
  data_admissao: Date;
  vales: Voucher[];
  incentivo: IncentiveBonus[];
  primeiro_dia_pagamento: number;
  segundo_dia_pagamento: number;
  restaurante_ref: string;
  data_cadastro: Date;
  contrato?: any;
}