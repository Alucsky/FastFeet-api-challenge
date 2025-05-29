import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { RecipientRepository } from "../repositories/recipient-repository";

interface DeleterecipientUseCaseRequest {
  recipientId: string;
}

type DeleterecipientUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
  ) {}

  async execute({
    recipientId,
  }: DeleterecipientUseCaseRequest): Promise<DeleterecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(recipientId);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    await this.recipientRepository.delete(recipientId);

    return right({});
  }
}
