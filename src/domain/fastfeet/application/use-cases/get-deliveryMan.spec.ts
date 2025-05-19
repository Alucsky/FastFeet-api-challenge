import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-deliveryMan-repository";
import { makeDeliveryMan } from "test/factories/make-deliveryMan";
import { GetDeliveryManUseCase } from "./get-deliveryMan";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let sut: GetDeliveryManUseCase;

describe("Delete deliveryMan", () => {
  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
    sut = new GetDeliveryManUseCase(inMemoryDeliveryManRepository);
  });

  it("should be able to Delete a deliveryMan", async () => {
    const deliveryMan = makeDeliveryMan({
      name: "John Doe",
      cpf: "12345678901",
    });

    await inMemoryDeliveryManRepository.create(deliveryMan);

    expect(inMemoryDeliveryManRepository.items).toHaveLength(1);

    const result = await sut.execute({
      deliveryManId: deliveryMan.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toMatchObject({
      deliveryMan: expect.objectContaining({
        name: "John Doe",
        cpf: "12345678901",
      }),
    });
  });
});
