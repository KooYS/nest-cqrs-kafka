import { IQuery } from '@nestjs/cqrs';

export class FindUsersQuery implements IQuery {
  constructor(readonly offset: number, readonly limit: number) {}
}