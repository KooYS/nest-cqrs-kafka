import { Controller, Get } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user.test')
    readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
        console.log("in", message)
        const originalMessage = context.getMessage();
        const response =
        `Receiving a new message from topic: user.test: ` +
        JSON.stringify(originalMessage.value);
        console.log(response);
        return response;
  }
}
