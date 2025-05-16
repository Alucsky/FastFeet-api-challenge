import { Either, left, right } from "@/core/either";
import { AdministratorRepository } from "../repositories/administrator-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface DeleteAdministratorUseCaseRequest {
  administratorId: string;
}

type DeleteAdministratorUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteAdministratorUseCase {
  constructor(private administratorRepository: AdministratorRepository) {}

  async execute({
    administratorId,
  }: DeleteAdministratorUseCaseRequest): Promise<DeleteAdministratorUseCaseResponse> {
    const administrator = await this.administratorRepository.findById(
      administratorId
    );

    if (!administrator) {
      return left(new ResourceNotFoundError());
    }

    await this.administratorRepository.delete(administratorId);

    return right({});
  }
}
