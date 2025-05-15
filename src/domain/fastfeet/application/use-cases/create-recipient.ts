import { Either, right } from "@/core/either";
import { Administrator } from "../../enterprise/entities/administrator";
import { AdministratorRepository } from "../repositories/administrator-repository";
import { Recipient } from "../../enterprise/entities/recipient";
import { RecipientRepository } from "../repositories/recipient-repository";

interface CreateRecipientUseCaseRequest {
  name: string;
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
    name,
    street,
    number,
    neighborhood,
    city,
    postalCode,
    state,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      name,
      street,
      number,
      neighborhood,
      city,
      postalCode,
      state,
    });

    await this.recipientRepository.create(recipient);

    return right({
      recipient,
    });
  }
}
