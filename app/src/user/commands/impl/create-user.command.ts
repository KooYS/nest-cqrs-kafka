import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand{
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly age: number,
        public readonly phone: string,
    ) {}
}