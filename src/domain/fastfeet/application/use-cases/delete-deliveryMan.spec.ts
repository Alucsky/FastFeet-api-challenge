import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-deliveryMan-repository";
import { DeleteDeliveryManUseCase } from "./delete-deliveryMan";
import { makeDeliveryMan } from "test/factories/make-deliveryMan";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let sut: DeleteDeliveryManUseCase;

describe("Delete deliveryMan", () => {
  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
    sut = new DeleteDeliveryManUseCase(inMemoryDeliveryManRepository);
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
    expect(inMemoryDeliveryManRepository.items).toHaveLength(0);
  });
});
