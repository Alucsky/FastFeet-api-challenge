import { Either, right } from "@/core/either";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "../../enterprise/entities/user";
import { DeliveryManRepository } from "../repositories/deliveryMan-repository";
import { Deliveryman } from "../../enterprise/entities/deliveryMan";

interface CreateDeliverymanUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type CreateDeliverymanUseCaseResponse = Either<
  null,
  {
    deliveryman: Deliveryman;
  }
>;

export class CreateDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliveryManRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: CreateDeliverymanUseCaseRequest): Promise<CreateDeliverymanUseCaseResponse> {
    const user = User.create({ name, cpf, password });

    await this.usersRepository.create(user);

    const deliveryman = Deliveryman.create({
      userId: user.id.toString(),
    });

    await this.deliverymanRepository.create(deliveryman);

    return right({
      deliveryman,
    });
  }
}
