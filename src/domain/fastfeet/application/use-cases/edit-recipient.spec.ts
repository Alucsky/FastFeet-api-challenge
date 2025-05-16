import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { makeRecipient } from "test/factories/make-recipient";
import { EditRecipientUseCase } from "./edit-recipient";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: EditRecipientUseCase;

describe("Edit Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new EditRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to edit an Recipient", async () => {
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
      name: "Jane Doe",
      city: "Rio de Janeiro",
      state: "RJ",
      street: "Rua Teste 2",
      number: "456",
      neighborhood: "Centro",
      postalCode: "87654321",
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    expect(result.value).toMatchObject({
      recipient: expect.objectContaining({
        name: "Jane Doe",
     
      }),
    });
    expect(inMemoryRecipientRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "Jane Doe",
        city: "Rio de Janeiro",
        state: "RJ",
        street: "Rua Teste 2",
        number: "456",
        neighborhood: "Centro",
        postalCode: "87654321",
      })
    );
  });
});
