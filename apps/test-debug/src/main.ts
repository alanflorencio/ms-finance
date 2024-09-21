import { NestFactory } from '@nestjs/core';
import { MyAppModule } from './my-app.module';

async function bootstrap() {
  const app = await NestFactory.create(MyAppModule);
  await app.listen(4000);

  console.log('---------------------------------');
  console.log('');
  console.log('');
  console.log('');
  console.log('');
  console.log('');

  console.log('Appp run on port 4000');

  console.log('');
  console.log('');
  console.log('');
  console.log('');
}
bootstrap();
