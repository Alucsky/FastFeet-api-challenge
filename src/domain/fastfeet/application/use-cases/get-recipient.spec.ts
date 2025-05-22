import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { makeRecipient } from "test/factories/make-recipient";
import { GetRecipientUseCase } from "./get-recipient";
import { makeUser } from "test/factories/make-user";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: GetRecipientUseCase;

describe("get Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new GetRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to get an Recipient", async () => {
    const user = makeUser({
      name: "Samuel",
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
    });

    expect(result.isRight()).toBe(true);

    expect(result.value).toMatchObject({
      recipient: {
        address: {
          city: "joinville",
          neighborhood: "bairro",
          number: "232",
          postalCode: "342342",
          state: "SC",
          street: "manuel correia",
        },
      },
    });
  });
});
