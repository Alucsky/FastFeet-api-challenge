import { Either, left, right } from "@/core/either";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "../../enterprise/entities/user";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface EditUserUseCaseRequest {
  userId: string;
  name: string;
  cpf: string;
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User;
  }
>;

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    cpf,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    user.name = name ?? user.name;
    user.cpf = cpf ?? user.cpf;

    await this.usersRepository.update(user);

    return right({
      user,
    });
  }
}
