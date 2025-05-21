import { Either, left, right } from "@/core/either";
import { DeliveryManRepository } from "../repositories/deliveryMan-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { UsersRepository } from "../repositories/users-repository";

interface DeleteDeliverymanUseCaseRequest {
  deliverymanId: string;
}

type DeleteDeliverymanUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliveryManRepository,
    private usersRepository: UsersRepository
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
    await this.usersRepository.delete(deliveryman.userId.toString());

    return right({});
  }
}
