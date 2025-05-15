import { Either, left, right } from "@/core/either";
import { Administrator } from "../../enterprise/entities/administrator";
import { AdministratorRepository } from "../repositories/administrator-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

interface EditAdministratorUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
  administratorId: string;
}

type EditAdministratorUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    administrator: Administrator;
  }
>;

export class EditAdministratorUseCase {
  constructor(private administratorRepository: AdministratorRepository) {}

  async execute({
    name,
    cpf,
    password,
    administratorId,
  }: EditAdministratorUseCaseRequest): Promise<EditAdministratorUseCaseResponse> {
    const administrator = await this.administratorRepository.findById(
      administratorId
    );

    if (!administrator) {
      return left(new ResourceNotFoundError());
    }

    if (administratorId !== administrator.id.toString()) {
      return left(new NotAllowedError());
    }
    administrator.cpf = cpf;
    administrator.name = name;
    administrator.password = password;

    await this.administratorRepository.update(administrator);

    return right({
      administrator,
    });
  }
}
