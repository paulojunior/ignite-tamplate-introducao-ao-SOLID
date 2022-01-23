import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    var newUser = new User();

    newUser.name = name;
    newUser.email  = email;
    newUser.created_at = new Date;

    this.users.push(newUser);
    
    return newUser;
  }

  findById(id: string): User | undefined {
    var user = this.users.find(u => (u.id == id));
    return user;
  }

  findByEmail(email: string): User | undefined {
    var user = this.users.find(u => (u.email == email));
    return user;
  }

  turnAdmin(receivedUser: User): User {
    var user = this.users.find(u => (u.id = receivedUser.id));

    if (user) {
      user.admin = true;
      user.updated_at = new Date;
    }

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
