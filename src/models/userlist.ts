import { User } from './user';

export class UserList {
  public users: Record<string, User>;

  constructor() {
    this.users = {};
  }

  AddUserById(id: string) {
    if (this.users[id] == undefined) {
      this.users[id] = new User(id);
    }
  }

  RemoveUser(id: string) {
    this.users[id] = undefined;
  }

  GetUser(id: string): User {
    return this.users[id];
  }
}
