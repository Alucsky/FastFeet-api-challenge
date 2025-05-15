import { InMemoryAdministratorsRepository } from "test/repositories/in-memory-administrators-repository";
import { DeleteAdministratorUseCase } from "./delete-administrator";
import { makeAdministrator } from "test/factories/make-administrator";

let inMemoryAdministratorRepository: InMemoryAdministratorsRepository;
let sut: DeleteAdministratorUseCase;

describe("Create Administrator", () => {
  beforeEach(() => {
    inMemoryAdministratorRepository = new InMemoryAdministratorsRepository();
    sut = new DeleteAdministratorUseCase(inMemoryAdministratorRepository);
  });

  it("should be able to create a administrator", async () => {
    const administrator = makeAdministrator({
      password: "123456",
    });

    await inMemoryAdministratorRepository.create(administrator);

    expect(inMemoryAdministratorRepository.items).toHaveLength(1);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAdministratorRepository.items).toHaveLength(0);
  });
});
