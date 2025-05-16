import { makeDelivery } from "test/factories/make-delivery";
import { DeliveryStatus } from "../../enterprise/entities/delivery";
import { CreateDeliveryUseCase } from "./create-delivery";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeleteDeliveryUseCase } from "./delete-delivery";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: DeleteDeliveryUseCase;

describe("delete delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new DeleteDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to delete a delivery", async () => {
    const Delivery = makeDelivery({
      recipientId: new UniqueEntityID("recipient-id"),
      deliverymanId: new UniqueEntityID("deliveryman-id"),
    });

    await inMemoryDeliveryRepository.create(Delivery);

    expect(inMemoryDeliveryRepository.items).toHaveLength(1);

    const result = await sut.execute({
      deliveryId: Delivery.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.items).toHaveLength(0);
  });
});
