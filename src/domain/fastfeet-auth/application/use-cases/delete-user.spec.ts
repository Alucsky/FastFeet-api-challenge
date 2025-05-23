import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { DeleteUserUseCase } from "./delete-user";
import { makeUser } from "test/factories/make-user";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryUserRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe("Delete User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(inMemoryUserRepository);
  });

  it("should be able to Delete an User", async () => {
    const user = makeUser(
      {
        name: "John Doe",
        password: "123456",
        cpf: "12345678901",
      },
      new UniqueEntityID("1")
    );

    await inMemoryUserRepository.create(user);
    expect(inMemoryUserRepository.items).toHaveLength(1);

    const result = await sut.execute({
      userId: user.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(0);
  });
});
