import { Either, left, right } from "@/core/either";
import { Recipient } from "../../enterprise/entities/recipient";
import { RecipientRepository } from "../repositories/recipient-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface EditRecipientUseCaseRequest {
  recipientId: string;
  name: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  state: string;
}

type EditRecipientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient;
  }
>;

export class EditRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId,
    name,
    street,
    number,
    neighborhood,
    city,
    postalCode,
    state,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(recipientId);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }
    
    recipient.name = name;
    recipient.street = street;
    recipient.number = number;
    recipient.neighborhood = neighborhood;
    recipient.city = city;
    recipient.postalCode = postalCode;
    recipient.state = state;

    await this.recipientRepository.update(recipient);

    return right({
      recipient,
    });
  }
}
