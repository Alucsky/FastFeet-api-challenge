import { InMemoryAdministratorsRepository } from "test/repositories/in-memory-administrators-repository";
import { makeAdministrator } from "test/factories/make-administrator";
import { EditAdministratorUseCase } from "./edit-administrator";

let inMemoryAdministratorRepository: InMemoryAdministratorsRepository;
let sut: EditAdministratorUseCase;

describe("Edit Administrator", () => {
  beforeEach(() => {
    inMemoryAdministratorRepository = new InMemoryAdministratorsRepository();
    sut = new EditAdministratorUseCase(inMemoryAdministratorRepository);
  });

  it("should be able to edit an administrator", async () => {
    const administrator = makeAdministrator({
      name: "John Doe",
      cpf: "12345678901",
      password: "123456",
    });

    await inMemoryAdministratorRepository.create(administrator);

    expect(inMemoryAdministratorRepository.items).toHaveLength(1);
    expect(inMemoryAdministratorRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "John Doe",
        cpf: "12345678901",
        password: "123456",
      })
    );

    const result = await sut.execute({
      name: "Jane Doe",
      cpf: "98765432100",
      password: "654321",
      administratorId: administrator.id.toString(),
    });

    expect(inMemoryAdministratorRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "Jane Doe",
        cpf: "98765432100",
        password: "654321",
      })
    );

    expect(result.isRight()).toBe(true);
  });

 
});
