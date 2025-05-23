import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { CreateRecipientUseCase } from "./create-recipient";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";

let inMemoryUserRepository: InMemoryUsersRepository;
let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: CreateRecipientUseCase;

describe("Create Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new CreateRecipientUseCase(inMemoryRecipientRepository);
  });

  it("should be able to create an Recipient", async () => {
    const user = makeUser({
      name: "Samuel",
      password: "123456",
      cpf: "12345678901",
    });

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      userId: user.id.toString(),
      street: "Rua Teste",
      number: "123",
      neighborhood: "Centro",
      city: "São Paulo",
      postalCode: "12345678",
      state: "SP",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientRepository.items).toHaveLength(1);
    expect(result.value?.recipient.address).toMatchObject({
      street: "Rua Teste",
      number: "123",
      neighborhood: "Centro",
      city: "São Paulo",
      postalCode: "12345678",
      state: "SP",
    });
  });
});
