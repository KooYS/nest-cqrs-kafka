import { Body, Controller, Get, Inject, OnModuleDestroy, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserBodyDto } from './interface/create-user.body.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController implements OnModuleInit, OnModuleDestroy{

    constructor(private readonly userService : UserService,  @Inject('any_name_i_want') private readonly client: ClientKafka) {}

    @Post()
    create(@Body() createUserBotyDto : CreateUserBodyDto){
        return this.userService.create(createUserBotyDto)
    }
    async onModuleInit() {
        ['user.test'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
        await this.client.connect();
    }

    async onModuleDestroy() {
        await this.client.close();
    }


    @Get()
    async findAll(){
        // await this.client.send('user.test', {foo:'생산자에서', data: new Date().toString()})
        return this.userService.findAll()
    }

}
