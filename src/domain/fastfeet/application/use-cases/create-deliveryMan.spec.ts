import { CreateDeliveryManUseCase } from "./create-deliveryMan";
import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-deliveryMan-repository";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let sut: CreateDeliveryManUseCase;

describe("Create deliveryMan", () => {
  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
    sut = new CreateDeliveryManUseCase(inMemoryDeliveryManRepository);
  });

  it("should be able to create a deliveryMan", async () => {
    const result = await sut.execute({
      name: "John Doe",
      cpf: "12345678901",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);

    expect(result.value?.deliveryMan).toEqual(
      expect.objectContaining({
        name: "John Doe",
        cpf: "12345678901",
        password: "123456",
      })
    );

    expect(inMemoryDeliveryManRepository.items).toHaveLength(1);
  });
});
