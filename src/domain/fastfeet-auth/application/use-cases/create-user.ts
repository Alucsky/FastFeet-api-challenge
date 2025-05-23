import { Either, right } from "@/core/either";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "../../enterprise/entities/user";

interface CreateUserUseCaseRequest {
  name: string;
  password: string;
  cpf: string;
}

type CreateUserUseCaseResponse = Either<
  null,
  {
    user: User;
  }
>;

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    cpf,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = User.create({ name, cpf, password });

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
