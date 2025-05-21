import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { CreateRecipientUseCase } from "./create-recipient";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";

let inMemoryUserRepository: InMemoryUsersRepository;
let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: CreateRecipientUseCase;

describe.only("Create Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new CreateRecipientUseCase(
      inMemoryRecipientRepository,
      inMemoryUserRepository
    );
  });

  it("should be able to create an Recipient", async () => {
    const result = await sut.execute({
      name: "John Doe",
      password: "123456",
      cpf: "12345678901",
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
