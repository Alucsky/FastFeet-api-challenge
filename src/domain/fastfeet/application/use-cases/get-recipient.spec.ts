import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { makeRecipient } from "test/factories/make-recipient";
import { GetRecipientUseCase } from "./get-recipient";
import { a } from "vitest/dist/chunks/suite.d.FvehnV49";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: GetRecipientUseCase;

describe("get Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new GetRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to get an Recipient", async () => {
    const recipient = makeRecipient({
      name: "John Doe",
      city: "São Paulo",
      state: "SP",
      street: "Rua Teste",
      number: "123",
      neighborhood: "Centro",
      postalCode: "12345678",
    });

    await inMemoryRecipientRepository.create(recipient);
    expect(inMemoryRecipientRepository.items).toHaveLength(1);

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    expect(result.value).toMatchObject({
      recipient: expect.objectContaining({
        name: "John Doe",
        city: "São Paulo",
        state: "SP",
        street: "Rua Teste",
        number: "123",
        neighborhood: "Centro",
        postalCode: "12345678",
      }),
    });
  });
});
