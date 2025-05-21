import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { makeRecipient } from "test/factories/make-recipient";
import { makeUser } from "test/factories/make-user";
import { EditRecipientUseCase } from "./edit-recipient";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: EditRecipientUseCase;

describe("Edit Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new EditRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to Edit an Recipient", async () => {
    const user = makeUser({
      name: "seilaaaa",
    });

    const recipient = makeRecipient({
      userId: user.id,
      address: {
        city: "joinville",
        neighborhood: "bairro",
        number: "232",
        postalCode: "342342",
        state: "SC",
        street: "manuel correia",
      },
    });

    await inMemoryRecipientRepository.create(recipient);

    expect(inMemoryRecipientRepository.items).toHaveLength(1);

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
      city: "teste cidade",
      street: "teste rua",
      number: "232323",
      neighborhood: "teste bairro",
      postalCode: "342342",
      state: "SC",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientRepository.items).toHaveLength(1);
    expect(inMemoryRecipientRepository.items[0].address).toEqual({
      city: "teste cidade",
      neighborhood: "teste bairro",
      number: "232323",
      postalCode: "342342",
      state: "SC",
      street: "teste rua",
    });
  });
});
