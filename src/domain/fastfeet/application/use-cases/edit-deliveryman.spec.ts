import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-deliveryMan-repository";
import { EditDeliverymanUseCase } from "./edit-deliveryman";
import { makeDeliveryMan } from "test/factories/make-deliveryMan";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let sut: EditDeliverymanUseCase;

describe.only("Edit Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
    sut = new EditDeliverymanUseCase(inMemoryDeliveryManRepository);
  });

  it("should be able to Edit a Deliveryman", async () => {
    const deliveryMan = makeDeliveryMan(
      {
        deliveriesIds: ["4", "7"],
      },
      new UniqueEntityID("1")
    );

    await inMemoryDeliveryManRepository.create(deliveryMan);

    expect(inMemoryDeliveryManRepository.items[0].deliveriesIds).toEqual([
      "4",
      "7",
    ]);

    const result = await sut.execute({
      deliverymanId: "1",
      deliveriesIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);

    expect(inMemoryDeliveryManRepository.items).toHaveLength(1);

    expect(inMemoryDeliveryManRepository.items[0].deliveriesIds).toEqual([
      "1",
      "2",
    ]);
  });
});
