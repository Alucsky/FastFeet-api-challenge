import { makeDelivery } from "test/factories/make-delivery";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { GetDeliveryUseCase } from "./get-delivery";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: GetDeliveryUseCase;

describe("Get delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new GetDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to get a delivery", async () => {
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

    expect(result.value).toMatchObject({
      delivery: expect.objectContaining({
        recipientId: new UniqueEntityID("recipient-id"),
        deliverymanId: new UniqueEntityID("deliveryman-id"),
      }),
    });
  });
});
