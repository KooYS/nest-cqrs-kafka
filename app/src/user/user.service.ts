import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { CreateUserBodyDto } from './interface/create-user.body.dto';
import { FindUsersQuery } from './queries/impl/find-users.query';

@Injectable()
export class UserService {


    constructor(private commandBus: CommandBus, private queryBus : QueryBus) {}

    async create(createUserBotyDto : CreateUserBodyDto) {
        return this.commandBus.execute(
            new CreateUserCommand(createUserBotyDto.name,
                createUserBotyDto.email,
                createUserBotyDto.age, 
                createUserBotyDto.phone)
        );
    }

    async findAll() {
        return this.queryBus.execute(
            new FindUsersQuery(0,100)
        );
    }

}
