import { PaymentService } from './services/payment.service';
import { PaymentController } from './payment.controller';
import { Module } from '@nestjs/common';
import { PjbankService } from './services/pjbank.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PaymentController],
  providers: [PaymentService, PjbankService],
})
export class PaymentModule {}
