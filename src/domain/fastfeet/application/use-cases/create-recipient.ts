import { Either, right } from "@/core/either";
import { Recipient } from "../../enterprise/entities/recipient";
import { RecipientRepository } from "../repositories/recipient-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface CreateRecipientUseCaseRequest {
  userId: string;
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
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    street,
    number,
    neighborhood,
    city,
    postalCode,
    state,
    userId,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      userId: new UniqueEntityID(userId),
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
