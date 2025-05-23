import { Either, right } from "@/core/either";
import { DeliveryManRepository } from "../repositories/deliveryMan-repository";
import { Deliveryman } from "../../enterprise/entities/deliveryMan";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface CreateDeliverymanUseCaseRequest {
  userId: string;
}

type CreateDeliverymanUseCaseResponse = Either<
  null,
  {
    deliveryman: Deliveryman;
  }
>;

export class CreateDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliveryManRepository) {}

  async execute({
    userId,
  }: CreateDeliverymanUseCaseRequest): Promise<CreateDeliverymanUseCaseResponse> {
    const deliveryman = Deliveryman.create({
      userId: new UniqueEntityID(userId),
      deliveriesIds: [],
    });

    await this.deliverymanRepository.create(deliveryman);

    return right({
      deliveryman,
    });
  }
}
