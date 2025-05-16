import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeliveryStatus } from "../../enterprise/entities/delivery";
import { CreateDeliveryUseCase } from "./create-delivery";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: CreateDeliveryUseCase;

describe("Create delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new CreateDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to create a delivery", async () => {
    const result = await sut.execute({
      recipientId: new UniqueEntityID("recipient-id"),
      deliverymanId: new UniqueEntityID("deliveryman-id"),
      status: DeliveryStatus.PENDING,
      postedAt: new Date(),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.delivery).toEqual(
      expect.objectContaining({
        recipientId: new UniqueEntityID("recipient-id"),
        deliverymanId: new UniqueEntityID("deliveryman-id"),
        status: DeliveryStatus.PENDING,
        postedAt: expect.any(Date),
      })
    );
  });
});
