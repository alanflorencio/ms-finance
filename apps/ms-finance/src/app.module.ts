import { Module } from '@nestjs/common';

import { DatabaseModule } from './modules/database/database.module';
import { PaymentModule } from './modules/payment/payment.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [DatabaseModule, PaymentModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
