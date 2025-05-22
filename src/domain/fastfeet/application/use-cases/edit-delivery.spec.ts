import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeDelivery } from "test/factories/make-delivery";
import { EditDeliveryUseCase } from "./edit-delivery";
import { DeliveryStatus } from "../../enterprise/entities/value-objects/deliveryStatus";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: EditDeliveryUseCase;

describe("Edit delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new EditDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to Edit a delivery", async () => {
    const delivery = makeDelivery(
      {
        status: DeliveryStatus.IN_PROGRESS,
      },
      new UniqueEntityID("delivery-1")
    );

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.items).toHaveLength(1);

    const result = await sut.execute({
      deliveryId: "delivery-1",
      deliverymanId: "deliveryman-1",
      status: "delivered",
      pickedUpAt: new Date(),
      deliveredAt: new Date(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.items[0].status).toEqual(
      DeliveryStatus.DELIVERED
    );
  });
});
