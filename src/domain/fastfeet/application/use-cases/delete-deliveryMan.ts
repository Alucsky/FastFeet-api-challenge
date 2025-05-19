import { Either, left, right } from "@/core/either";
import { Deliveryman } from "../../enterprise/entities/deliveryMan";
import { DeliveryManRepository } from "../repositories/deliveryMan-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface DeleteDeliveryManUseCaseRequest {
  deliveryManId: string;
}

type DeleteDeliveryManUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteDeliveryManUseCase {
  constructor(private DeliveryManRepository: DeliveryManRepository) {}

  async execute({
    deliveryManId,
  }: DeleteDeliveryManUseCaseRequest): Promise<DeleteDeliveryManUseCaseResponse> {
    const deliveryMan = await this.DeliveryManRepository.findById(
      deliveryManId
    );

    if (!deliveryMan) {
      return left(new ResourceNotFoundError());
    }

    await this.DeliveryManRepository.delete(deliveryManId);

    return right({});
  }
}
