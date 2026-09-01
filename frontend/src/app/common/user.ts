import { UserType } from './user-type';

export class User {
  constructor(
    public id?: number,
    public firstName: string = '',
    public lastName: string = '',
    public userType: UserType = new UserType()
  ) {}
}
