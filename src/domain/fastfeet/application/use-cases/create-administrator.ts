import { Either, right } from "@/core/either";
import { Administrator } from "../../enterprise/entities/administrator";
import { AdministratorRepository } from "../repositories/administrator-repository";

interface CreateAdministratorUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type CreateAdministratorUseCaseResponse = Either<
  null,
  {
    administrator: Administrator;
  }
>;

export class CreateAdministratorUseCase {
  constructor(private administratorRepository: AdministratorRepository) {}

  async execute({
    name,
    cpf,
    password,
  }: CreateAdministratorUseCaseRequest): Promise<CreateAdministratorUseCaseResponse> {
    const administrator = Administrator.create({
      name,
      cpf,
      password,
    });

    await this.administratorRepository.create(administrator);

    return right({
      administrator,
    });
  }
}
