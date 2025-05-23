import { Either, left, right } from "@/core/either";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "../../enterprise/entities/user";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface GetUserUseCaseRequest {
  userId: string;
}

type GetUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User;
  }
>;

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    return right({
      user,
    });
  }
}
