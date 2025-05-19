import { Either, left, right } from "@/core/either";
import { DeliveryManRepository } from "../repositories/deliveryMan-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Deliveryman } from "../../enterprise/entities/deliveryMan";

interface GetDeliveryManUseCaseRequest {
  deliveryManId: string;
}

type GetDeliveryManUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryMan: Deliveryman;
  }
>;

export class GetDeliveryManUseCase {
  constructor(private DeliveryManRepository: DeliveryManRepository) {}

  async execute({
    deliveryManId,
  }: GetDeliveryManUseCaseRequest): Promise<GetDeliveryManUseCaseResponse> {
    const deliveryMan = await this.DeliveryManRepository.findById(
      deliveryManId
    );

    if (!deliveryMan) {
      return left(new ResourceNotFoundError());
    }

    return right({
      deliveryMan,
    });
  }
}
