import { Either, left, right } from "@/core/either";
import { DeliveryManRepository } from "../repositories/deliveryMan-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface DeleteDeliverymanUseCaseRequest {
  deliverymanId: string;
}

type DeleteDeliverymanUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliveryManRepository,
  ) {}

  async execute({
    deliverymanId,
  }: DeleteDeliverymanUseCaseRequest): Promise<DeleteDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findById(
      deliverymanId
    );

    if (!deliveryman) {
      return left(new ResourceNotFoundError());
    }

    await this.deliverymanRepository.delete(deliverymanId);

    return right({});
  }
}
