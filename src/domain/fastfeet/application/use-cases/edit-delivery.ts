import { Either, left, right } from "@/core/either";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { Delivery, DeliveryStatus } from "../../enterprise/entities/delivery";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface EditDeliveryUseCaseRequest {
  deliveryId: string;
  status: string;
  pickedUpAt: Date;
  deliveredAt: Date;
  deliverymanId: UniqueEntityID | null;
}

type EditDeliveryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery;
  }
>;

export class EditDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
    status,
    deliverymanId,
    pickedUpAt,
    deliveredAt,
  }: EditDeliveryUseCaseRequest): Promise<EditDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }

    delivery.status = status as DeliveryStatus;
    delivery.deliverymanId = deliverymanId;
    delivery.pickedUpAt = pickedUpAt;
    delivery.deliveredAt = deliveredAt;

    await this.deliveryRepository.update(delivery);

    return right({
      delivery,
    });
  }
}
