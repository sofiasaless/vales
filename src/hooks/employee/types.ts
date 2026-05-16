export interface AddIncentiveBonusOnEmployee {
  employeeId: string,
  valor: number,
  descricao?: string
}

export interface RemoveIncentiveBonusOnEmployee extends AddIncentiveBonusOnEmployee {
  id: string,
  data?: string,
}