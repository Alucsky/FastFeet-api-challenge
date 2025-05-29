import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { makeRecipient } from "test/factories/make-recipient";
import { DeleteRecipientUseCase } from "./delete-recipient";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeUser } from "test/factories/make-user";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: DeleteRecipientUseCase;

describe("Delete Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteRecipientUseCase(
      inMemoryRecipientRepository,
    );
  });

  it("should be able to delete an Recipient", async () => {
    const user = makeUser({
      name: "seilaaaa",
    });

    const recipient = makeRecipient({
      userId: user.id,
    });

    await inMemoryRecipientRepository.create(recipient);
    console.log(recipient);

    expect(inMemoryRecipientRepository.items).toHaveLength(1);

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientRepository.items).toHaveLength(0);
  });
});
