import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/schema/user.schema";
import { Repository } from "typeorm";
import { CreateUserCommand } from "../impl/create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async execute(command: CreateUserCommand) {
    const {name, email, age, phone } = command;
    const user = this.user.create(command)
    this.user.save(user)
  }
}
