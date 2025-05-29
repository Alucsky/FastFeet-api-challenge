import { Either, right } from "@/core/either";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Deliveryman } from "../../enterprise/entities/deliveryman";
import { DeliverymanWithPassword } from "../../enterprise/entities/value-objects/deliveryman-with-password";
import { HashGenerator } from "@/domain/authentication/application/cryptography/hash-generator";

interface CreateDeliverymanUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type CreateDeliverymanUseCaseResponse = Either<
  null,
  {
    deliveryman: Deliveryman;
  }
>;

export class CreateDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: CreateDeliverymanUseCaseRequest): Promise<CreateDeliverymanUseCaseResponse> {
    const passwordHash = await this.hashGenerator.hash(password);

    const deliverymanWithPassword = DeliverymanWithPassword.create({
      name,
      cpf,
      password: passwordHash,
      id: new UniqueEntityID(),
    });

    const deliveryman = await this.deliverymanRepository.create(
      deliverymanWithPassword
    );

    return right({
      deliveryman,
    });
  }
}
