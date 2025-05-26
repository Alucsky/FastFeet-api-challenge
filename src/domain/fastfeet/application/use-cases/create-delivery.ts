import { Either, right } from "@/core/either";
import { DeliveryStatus } from "../../enterprise/entities/value-objects/deliveryStatus";
import { Delivery } from "../../enterprise/entities/delivery";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface CreateDeliveryUseCaseRequest {
  recipientId: string;
  deliverymanId: string | null;
  status: string;
  neighborhood: string;
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
    neighborhood,
  }: CreateDeliveryUseCaseRequest): Promise<CreateDeliveryUseCaseResponse> {
    const delivery = Delivery.create({
      recipientId: new UniqueEntityID(recipientId),
      deliverymanId: deliverymanId ? new UniqueEntityID(deliverymanId) : null,
      status: DeliveryStatus.fromStringToEnum(status),
      postedAt: new Date(),
      pickedUpAt: null,
      deliveredAt: null,
      neighborhood,
    });

    await this.deliveryRepository.create(delivery);

    return right({
      delivery,
    });
  }
}
