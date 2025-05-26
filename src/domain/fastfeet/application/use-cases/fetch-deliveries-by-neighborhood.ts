import { Either, left, right } from "@/core/either";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Delivery } from "../../enterprise/entities/delivery";

interface FetchDeliveriesByNeighborhoodUseCaseRequest {
  neighborhood: string;
}

type FetchDeliveriesByNeighborhoodUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveries: Delivery[];
  }
>;

export class FetchDeliveriesByNeighborhoodUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    neighborhood,
  }: FetchDeliveriesByNeighborhoodUseCaseRequest): Promise<FetchDeliveriesByNeighborhoodUseCaseResponse> {
    const deliveries =
      await this.deliveryRepository.findManyDeliveriesByneighborhood(
        neighborhood
      );

    if (!deliveries) {
      return left(new ResourceNotFoundError());
    }

    return right({
      deliveries,
    });
  }
}
