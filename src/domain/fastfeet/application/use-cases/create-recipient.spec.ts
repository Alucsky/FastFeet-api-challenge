import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { CreateRecipientUseCase } from "./create-recipient";
import { makeRecipient } from "test/factories/make-recipient";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: CreateRecipientUseCase;

describe("Create Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new CreateRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to create an Recipient", async () => {
    const recipient = makeRecipient({
      name: "John Doe",
      city: "São Paulo",
      state: "SP",
      street: "Rua Teste",
      number: "123",
      neighborhood: "Centro",
      postalCode: "12345678",
    });

    const result = await sut.execute(recipient);

    expect(result.isRight()).toBe(true);
    expect(result.value?.recipient).toEqual(
      expect.objectContaining({
        name: "John Doe",
        city: "São Paulo",
        state: "SP",
        street: "Rua Teste",
        number: "123",
        neighborhood: "Centro",
        postalCode: "12345678",
      })
    );
  });
});
