import { Either, left, right } from "@/core/either";
import { DeliveryManRepository } from "../repositories/deliveryMan-repository";
import { Deliveryman } from "../../enterprise/entities/deliveryMan";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface GetDeliverymanUseCaseRequest {
  deliverymanId: string;
}

type GetDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryman: Deliveryman;
  }
>;

export class GetDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliveryManRepository,
  ) {}

  async execute({
    deliverymanId,
  }: GetDeliverymanUseCaseRequest): Promise<GetDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findById(
      deliverymanId
    );

    if (!deliveryman) {
      return left(new ResourceNotFoundError());
    }

    return right({
      deliveryman,
    });
  }
}
