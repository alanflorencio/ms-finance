export type PjBankCreditCardPayment = {
  numero_cartao: string | undefined;
  nome_cartao: string | undefined;
  cpf_cartao: string | undefined;
  codigo_cvv: string | undefined;
  mes_vencimento: string | undefined;
  ano_vencimento: string | undefined;
  email_cartao: string | undefined;
  celular_cartao: string | undefined;
  valor: string;
  parcelas: string;
  descricao_pagamento: string;
  webhook: string;
};

export type PjBankCreditCard = {
  cardNumber: string;
  cardholderName: string;
  cardDocument: string;
  cvv: string;
  cardMonth: string;
  cardYear: string;
};

export type PjBankUser = {
  email: string;
  phone: string;
};

export type PjBankPayment = {
  creditCard: PjBankCreditCard;
  user: PjBankUser;
  value: number;
  installments?: number;
  description?: string;
};

export type PjBankSession = {
  credencialCartao: string;
  xChave: string;
  webhook: string;
};
