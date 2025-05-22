import { Either, left, right } from "@/core/either";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Delivery } from "../../enterprise/entities/delivery";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeliveryStatus } from "../../enterprise/entities/value-objects/deliveryStatus";

interface EditDeliveryUseCaseRequest {
  deliveryId: string;
  deliverymanId?: string | null;
  status?: string;
  pickedUpAt?: Date | null;
  deliveredAt?: Date | null;
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
    deliverymanId,
    status,
    pickedUpAt,
    deliveredAt,
  }: EditDeliveryUseCaseRequest): Promise<EditDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new ResourceNotFoundError());
    }

    delivery.deliverymanId = deliverymanId
      ? new UniqueEntityID(deliverymanId)
      : delivery.deliverymanId;

    delivery.status = status
      ? DeliveryStatus.fromStringToEnum(status)
      : delivery.status;

    delivery.pickedUpAt = pickedUpAt ? pickedUpAt : delivery.pickedUpAt;
    
    delivery.deliveredAt = deliveredAt ? deliveredAt : delivery.deliveredAt;

    await this.deliveryRepository.update(delivery);

    return right({
      delivery,
    });
  }
}
