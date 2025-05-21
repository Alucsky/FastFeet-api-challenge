import { Either, right } from "@/core/either";
import { Recipient } from "../../enterprise/entities/recipient";
import { RecipientRepository } from "../repositories/recipient-repository";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "../../enterprise/entities/user";

interface CreateRecipientUseCaseRequest {
  name: string;
  password: string;
  cpf: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  state: string;
}

type CreateRecipientUseCaseResponse = Either<
  null,
  {
    recipient: Recipient;
  }
>;

export class CreateRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    cpf,
    password,
    street,
    number,
    neighborhood,
    city,
    postalCode,
    state,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const user = User.create({ name, cpf, password });

    await this.usersRepository.create(user);

    const recipient = Recipient.create({
      userId: user.id,
      address: {
        street,
        number,
        neighborhood,
        city,
        postalCode,
        state,
      },
    });

    await this.recipientRepository.create(recipient);

    return right({
      recipient,
    });
  }
}
