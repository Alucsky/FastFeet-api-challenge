import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { makeUser } from "test/factories/make-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      encrypter
    );
  });

  it("should be able to authenticate a user", async () => {
    const user = makeUser({
      cpf: "12345678900",
      password: await fakeHasher.hash("123456"),
    });

    inMemoryUsersRepository.items.push(user);

    const result = await sut.execute({
      cpf: "12345678900",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
