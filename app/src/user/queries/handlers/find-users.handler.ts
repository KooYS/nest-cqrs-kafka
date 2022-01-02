import { Inject, InternalServerErrorException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Client, ClientKafka, Ctx, KafkaContext, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { FindUsersQuery } from '../impl/find-users.query';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler implements IQueryHandler<FindUsersQuery> {
    
      
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('any_name_i_want') private readonly client: ClientKafka,
    ) {}


    async execute(query: FindUsersQuery) {
        this.client.emit('user.test', {foo:'kookoo1'})
        return await this.userModel.find().skip(query.offset).limit(query.limit).exec()
    }
}