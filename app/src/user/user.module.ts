import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserSchema } from './schema/user.schema';
import { User as _User } from './entities/user.entity';
import { UserService } from './user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { FindUsersHandler } from './queries/handlers/find-users.handler';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports : [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], "main_database"),
    TypeOrmModule.forFeature([_User]),
    CqrsModule,
    ClientsModule.register([
      {
        name: 'any_name_i_want',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'any_client_id_i_want',
            brokers: ['localhost:29091'],
          },
          consumer: {
            groupId: 'an_unique_string_id',
          },
        },
      },
    ]),
    ],
  providers: [UserService,
  CreateUserHandler,
  FindUsersHandler],
  controllers: [UserController]
})
export class UserModule {}
