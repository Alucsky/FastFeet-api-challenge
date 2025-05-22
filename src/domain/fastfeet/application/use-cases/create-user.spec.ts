import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";

let inMemoryUserRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(inMemoryUserRepository);
  });

  it("should be able to create an User", async () => {
    const result = await sut.execute({
      name: "John Doe",
      password: "123456",
      cpf: "12345678901",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    expect(result.value?.user).toMatchObject({
      name: "John Doe",
      password: "123456",
      cpf: "12345678901",
    });
  });
});
