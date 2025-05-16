import { Either, right } from "@/core/either";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { Delivery, DeliveryStatus } from "../../enterprise/entities/delivery";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface CreateDeliveryUseCaseRequest {
  recipientId: UniqueEntityID;
  deliverymanId?: UniqueEntityID;
  status: DeliveryStatus;
  postedAt: Date;
}

type CreateDeliveryUseCaseResponse = Either<
  null,
  {
    delivery: Delivery;
  }
>;

export class CreateDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    recipientId,
    deliverymanId,
    status,
    postedAt,
  }: CreateDeliveryUseCaseRequest): Promise<CreateDeliveryUseCaseResponse> {
    const delivery = Delivery.create({
      recipientId,
      deliverymanId,
      status,
      postedAt,
    });

    await this.deliveryRepository.create(delivery);

    return right({
      delivery,
    });
  }
}
