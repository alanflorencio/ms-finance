import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MyAppService {
  constructor(@Inject('MS_FINANCE') private client: ClientProxy) {}

  async sendEvent(message: string, data: object) {
    const response = await firstValueFrom(
      this.client.send(message, data || {}),
    );

    return response;
  }
}
