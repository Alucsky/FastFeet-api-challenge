import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-deliveryMan-repository";
import { makeDeliveryMan } from "test/factories/make-deliveryMan";
import { EditDeliveryManUseCase } from "./edit-deliveryMan";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let sut: EditDeliveryManUseCase;

describe("Edit deliveryMan", () => {
  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
    sut = new EditDeliveryManUseCase(inMemoryDeliveryManRepository);
  });

  it("should be able to Edit a deliveryMan", async () => {
    const deliveryMan = makeDeliveryMan({
      name: "John Doe",
      cpf: "12345678901",
    });

    await inMemoryDeliveryManRepository.create(deliveryMan);

    expect(inMemoryDeliveryManRepository.items).toHaveLength(1);

    const result = await sut.execute({
      deliveryManId: deliveryMan.id.toString(),
      name: "Jane Doe",
      cpf: "98765432100",
      password: "654321",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryManRepository.items[0]).toMatchObject({
      props: expect.objectContaining({
        name: "Jane Doe",
        cpf: "98765432100",
        password: "654321",
      }),
    });
  });
});
