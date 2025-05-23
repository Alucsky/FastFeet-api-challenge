import { Either, left, right } from "@/core/either";
import { DeliveryManRepository } from "../repositories/deliveryMan-repository";
import { Deliveryman } from "../../enterprise/entities/deliveryMan";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface EditDeliverymanUseCaseRequest {
  deliverymanId: string;
  deliveriesIds: string[];
}

type EditDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryman: Deliveryman;
  }
>;

export class EditDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliveryManRepository) {}

  async execute({
    deliverymanId,
    deliveriesIds,
  }: EditDeliverymanUseCaseRequest): Promise<EditDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findById(
      deliverymanId
    );

    if (!deliveryman) {
      return left(new ResourceNotFoundError());
    }
    
    deliveryman.deliveriesIds = deliveriesIds;

    await this.deliverymanRepository.update(deliveryman);

    return right({
      deliveryman,
    });
  }
}
