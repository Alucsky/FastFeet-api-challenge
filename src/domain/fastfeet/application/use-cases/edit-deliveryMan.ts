import { Either, left, right } from "@/core/either";
import { DeliveryManRepository } from "../repositories/deliveryMan-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface EditDeliveryManUseCaseRequest {
  deliveryManId: string;
  name: string;
  cpf: string;
  password: string;
}

type EditDeliveryManUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class EditDeliveryManUseCase {
  constructor(private DeliveryManRepository: DeliveryManRepository) {}

  async execute({
    deliveryManId,
    name,
    cpf,
    password,
  }: EditDeliveryManUseCaseRequest): Promise<EditDeliveryManUseCaseResponse> {
    const deliveryMan = await this.DeliveryManRepository.findById(
      deliveryManId
    );

    if (!deliveryMan) {
      return left(new ResourceNotFoundError());
    }

    deliveryMan.cpf = cpf;
    deliveryMan.name = name;
    deliveryMan.password = password;

    await this.DeliveryManRepository.update(deliveryMan);

    return right({
      deliveryMan,
    });
  }
}
