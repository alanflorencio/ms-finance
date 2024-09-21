import { Injectable } from '@nestjs/common';
import { PjbankService } from './pjbank.service';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private prismaService: PrismaService,
    private pjbankService: PjbankService,
  ) {}

  async createPaymentCreditCard(data: any) {
    console.log(data, data);
    const { tenantId, externalId } = data;

    const payment = await this.prismaService.payment.create({
      data: {
        tenantId,
        externalId,
        paymentType: 'CREDIT_CARD',
      },
    });

    try {
      const tenant = await this.prismaService.tenant.findFirst({
        where: { id: tenantId },
        include: { pjBank: true },
      });

      const sessionPjBank = {
        credencialCartao: tenant?.pjBank?.credencialCartao,
        xChave: tenant?.pjBank?.xChave,
        webhook: tenant?.pjBank?.webhook,
      };

      const response = await this.pjbankService.createPayment(
        sessionPjBank,
        data,
      );

      await this.prismaService.payment.update({
        where: { id: payment.id },
        data: {
          bankId: response.id,
          bankType: response.bankType,
          bankStatus: response.status,
        },
      });

      return response;
    } catch (error) {
      console.error(error, 'error');

      await this.prismaService.payment.update({
        where: { id: payment.id },
        data: {
          bankType: error.bankType,
        },
      });

      return error;
    }
  }
}
