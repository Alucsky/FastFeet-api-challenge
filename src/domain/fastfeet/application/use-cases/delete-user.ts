import { Either, left, right } from "@/core/either";
import { Recipient } from "../../enterprise/entities/recipient";
import { RecipientRepository } from "../repositories/recipient-repository";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "../../enterprise/entities/user";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface DeleteUserUseCaseRequest {
  userId: string;
}

type DeleteUserUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    await this.usersRepository.delete(userId);

    return right({});
  }
}
