import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { makeRecipient } from "test/factories/make-recipient";
import { DeleteRecipientUseCase } from "./delete-recipient";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: DeleteRecipientUseCase;

describe("Delete Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new DeleteRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to delete an Recipient", async () => {
    const recipient = makeRecipient();

    await inMemoryRecipientRepository.create(recipient);

    expect(inMemoryRecipientRepository.items).toHaveLength(1);

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientRepository.items).toHaveLength(0);
  });
});
