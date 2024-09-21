import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(process.env.PORT) || 3000,
      },
    },
  );

  await app.listen();

  console.log('---------------------------------');
  console.log('');
  console.log('');
  console.log('');
  console.log('');
  console.log('');
  console.log('Microservice run on port ' + process.env.PORT || 3000);

  console.log('');
  console.log('');
  console.log('');
  console.log('');
}
bootstrap();
