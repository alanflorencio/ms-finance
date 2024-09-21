import { Body, Controller, Get, Post } from '@nestjs/common';
import { MyAppService } from './my-app.service';

@Controller()
export class MyAppController {
  constructor(private readonly myAppService: MyAppService) {}

  @Post()
  sendEvent(@Body() { message, data }: { message: string; data: object }) {
    return this.myAppService.sendEvent(message, data);
  }
}
