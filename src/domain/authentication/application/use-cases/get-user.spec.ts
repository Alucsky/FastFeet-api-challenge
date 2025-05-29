import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { GetUserUseCase } from "./get-user";

let inMemoryUserRepository: InMemoryUsersRepository;
let sut: GetUserUseCase;

describe("Get User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new GetUserUseCase(inMemoryUserRepository);
  });

  it("should be able to Get an User", async () => {
    const user = makeUser(
      {
        name: "John Doe",
        password: "123456",
        cpf: "12345678901",
      },
      new UniqueEntityID("1")
    );

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      userId: user.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    if (result.isRight()) expect(result.value?.user.password).toEqual("123456");
  });
});
