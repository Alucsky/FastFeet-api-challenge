import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { RecipientRepository } from "../repositories/recipient-repository";

interface EditRecipientUseCaseRequest {
  recipientId: string;
  city: string;
  street: string;
  number: string;
  neighborhood: string;
  postalCode: string;
  state: string;
}

type EditRecipientUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class EditRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
  ) {}

  async execute({
    recipientId,
    city,
    street,
    number,
    neighborhood,
    postalCode,
    state,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(recipientId);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    recipient.address.city = city;
    recipient.address.street = street;
    recipient.address.number = number;
    recipient.address.neighborhood = neighborhood;
    recipient.address.postalCode = postalCode;
    recipient.address.state = state;

    await this.recipientRepository.update(recipient);

    return right({});
  }
}
