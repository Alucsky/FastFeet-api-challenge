import { InMemoryAdministratorsRepository } from "test/repositories/in-memory-administrators-repository";
import { makeAdministrator } from "test/factories/make-administrator";
import { GetAdministratorUseCase } from "./get-administrator";

let inMemoryAdministratorRepository: InMemoryAdministratorsRepository;
let sut: GetAdministratorUseCase;

describe("Get Administrator", () => {
  beforeEach(() => {
    inMemoryAdministratorRepository = new InMemoryAdministratorsRepository();
    sut = new GetAdministratorUseCase(inMemoryAdministratorRepository);
  });

  it("should be able to get an administrator", async () => {
    const administrator = makeAdministrator({
      cpf: "12345678901",
    });

    await inMemoryAdministratorRepository.create(administrator);

    const result = await sut.execute({
      cpf: administrator.cpf,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toMatchObject({
      administrator: expect.objectContaining({
        cpf: "12345678901",
        name: administrator.name,
      }),
    });
  });
});
