import { Either, left, right } from "@/core/either";
import { Administrator } from "../../enterprise/entities/administrator";
import { AdministratorRepository } from "../repositories/administrator-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface GetAdministratorUseCaseRequest {
  cpf: string;
}

type GetAdministratorUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    administrator: Administrator;
  }
>;

export class GetAdministratorUseCase {
  constructor(private administratorRepository: AdministratorRepository) {}

  async execute({
    cpf,
  }: GetAdministratorUseCaseRequest): Promise<GetAdministratorUseCaseResponse> {
    const administrator = await this.administratorRepository.findByCpf(cpf);

    if (!administrator) {
      return left(new ResourceNotFoundError());
    }

    return right({
      administrator,
    });
  }
}
