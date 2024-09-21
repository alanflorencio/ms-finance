import { Module } from '@nestjs/common';
import { MyAppController } from './my-app.controller';
import { MyAppService } from './my-app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MS_FINANCE',
        transport: Transport.TCP,
        options: { port: 3000 },
      },
    ]),
  ],
  controllers: [MyAppController],
  providers: [MyAppService],
})
export class MyAppModule {}
