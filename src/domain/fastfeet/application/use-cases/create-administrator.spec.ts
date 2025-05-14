import { InMemoryAdministratorsRepository } from "test/repositories/in-memory-administrators-repository";
import { CreateAdministratorUseCase } from "./create-administrator";

let inMemoryAdministratorRepository: InMemoryAdministratorsRepository;
let sut: CreateAdministratorUseCase;

describe("Create Administrator", () => {
  beforeEach(() => {
    inMemoryAdministratorRepository = new InMemoryAdministratorsRepository();
    sut = new CreateAdministratorUseCase(inMemoryAdministratorRepository);
  });

  it("should be able to create a administrator", async () => {
    const result = await sut.execute({
      name: "John Doe",
      cpf: "12345678901",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.administrator).toEqual(
      expect.objectContaining({
        name: "John Doe",
        cpf: "12345678901",
        password: "123456",
      })
    );
  });
});
