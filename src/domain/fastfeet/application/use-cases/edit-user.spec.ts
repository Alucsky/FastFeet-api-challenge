import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditUserUseCase } from "./edit-user";

let inMemoryUserRepository: InMemoryUsersRepository;
let sut: EditUserUseCase;

describe("Edit User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new EditUserUseCase(inMemoryUserRepository);
  });

  it("should be able to Edit an User", async () => {
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
      userId: "1",
      name: "Samuel Doe",
      cpf: "12345678901",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    if (result.isRight()) {
      console.log(result.value.user);
      expect(result.value.user).toMatchObject({
        name: "Samuel Doe",
        password: "123456",
        cpf: "12345678901",
      });
    }
  });
});
