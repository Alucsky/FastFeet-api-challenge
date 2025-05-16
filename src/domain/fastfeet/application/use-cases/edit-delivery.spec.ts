import { makeDelivery } from "test/factories/make-delivery";
import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditDeliveryUseCase } from "./edit-delivery";
import { Delivery, DeliveryStatus } from "../../enterprise/entities/delivery";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: EditDeliveryUseCase;

describe("Edit delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new EditDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to edit a delivery", async () => {
    const Delivery = makeDelivery({
      recipientId: new UniqueEntityID("recipient-id"),
      deliverymanId: new UniqueEntityID("deliveryman-id"),
      status: DeliveryStatus.PENDING,
      postedAt: new Date(),
      pickedUpAt: null,
      deliveredAt: null,
    });

    await inMemoryDeliveryRepository.create(Delivery);

    expect(inMemoryDeliveryRepository.items).toHaveLength(1);

    const result = await sut.execute({
      deliveryId: Delivery.id.toString(),
      status: DeliveryStatus.PICKED_UP,
      deliverymanId: new UniqueEntityID("new-deliveryman-id"),
      pickedUpAt: new Date(),
      deliveredAt: new Date(),
    });

    expect(result.isRight()).toBe(true);

    expect(inMemoryDeliveryRepository.items[0]).toMatchObject({
      props: expect.objectContaining({
        status: DeliveryStatus.PICKED_UP,
        deliverymanId: expect.objectContaining({ value: "new-deliveryman-id" }),
        pickedUpAt: expect.any(Date),
      }),
    });
  });
});
