import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as qs from 'qs';
import { PjBankPayment, PjBankSession } from '../types/pjbank.type';
import * as moment from 'moment';

@Injectable()
export class PjbankService {
  constructor(private readonly httpService: HttpService) {}

  async createPayment(session: PjBankSession, body: PjBankPayment) {
    const { credencialCartao, xChave, webhook } = session;
    const { creditCard, user, value, installments, description } = body;

    const dataRaw = qs.stringify({
      numero_cartao: creditCard?.cardNumber,
      nome_cartao: creditCard?.cardholderName,
      cpf_cartao: creditCard?.cardDocument,
      codigo_cvv: creditCard?.cvv,
      mes_vencimento: creditCard?.cardMonth,
      ano_vencimento: creditCard?.cardYear,
      email_cartao: user?.email,
      celular_cartao: user?.phone,
      valor: Number(value).toFixed(2),
      parcelas: String(installments || '1'),
      descricao_pagamento: description || '',
      webhook: webhook,
    });

    try {
      const { data }: any = await firstValueFrom(
        this.httpService.post<any>(
          process.env.PJBANK_URL +
            `/recebimentos/${credencialCartao}/transacoes`,
          dataRaw,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-CHAVE': xChave,
            },
          },
        ),
      );
      const status = Number(data?.autorizada) ? 'CONFIRMED' : 'ERROR';

      return {
        id: data?.tid as string,
        bankType: 'PJBANK' as 'PJBANK',
        status,
        paymentDate: status === 'CONFIRMED' ? new Date() : null,
        installments: data.dados_parcela.map((i) => ({
          installment: i.nm_parcela,
          creditDate: moment(i.previsao_credito, 'MM/DD/YYYY')
            .add(1, 'day')
            .toDate(),
        })),
      };
    } catch (error) {
      console.log('pj-bank-erro', error);

      return {
        bankType: 'PJBANK' as 'PJBANK',
        error: true,
      };
    }
  }
}
