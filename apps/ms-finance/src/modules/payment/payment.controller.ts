import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PaymentService } from './services/payment.service';

@Controller()
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @EventPattern('create_payment_creditcard')
  createPaymentCreditCard(data: any): any {
    return this.paymentService.createPaymentCreditCard(data);
  }
}
