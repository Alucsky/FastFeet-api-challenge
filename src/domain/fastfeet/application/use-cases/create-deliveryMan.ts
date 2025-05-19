import { Either, right } from "@/core/either";
import { Deliveryman } from "../../enterprise/entities/deliveryMan";
import { DeliveryManRepository } from "../repositories/deliveryMan-repository";

interface CreateDeliveryManUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type CreateDeliveryManUseCaseResponse = Either<
  null,
  {
    deliveryMan: Deliveryman;
  }
>;

export class CreateDeliveryManUseCase {
  constructor(private DeliveryManRepository: DeliveryManRepository) {}

  async execute({
    name,
    cpf,
    password,
  }: CreateDeliveryManUseCaseRequest): Promise<CreateDeliveryManUseCaseResponse> {
    const deliveryMan = Deliveryman.create({
      name,
      cpf,
      password,
    });

    await this.DeliveryManRepository.create(deliveryMan);

    return right({
      deliveryMan,
    });
  }
}
