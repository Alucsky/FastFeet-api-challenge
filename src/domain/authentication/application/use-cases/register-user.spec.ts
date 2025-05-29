import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { RegisterUserUseCase } from "./register-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;

let sut: RegisterUserUseCase;

describe("Register User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();

    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher);
  });

  it("should be able to register a new User", async () => {
    const result = await sut.execute({
      name: "John Doe",
      cpf: "12345678900",
      password: "123456",
      userTypeString: "deliveryman",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    });
  });

  it("should hash User password upon registration", async () => {
    const result = await sut.execute({
      name: "John Doe",
      cpf: "12345678900",
      password: "123456",
      userTypeString: "deliveryman",
    });

    const hashedPassword = await fakeHasher.hash("123456");

    expect(result.isRight()).toBe(true);
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword);
  });
});
