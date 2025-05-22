import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeleteDeliveryUseCase } from "./delete-delivery";
import { makeDelivery } from "test/factories/make-delivery";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: DeleteDeliveryUseCase;

describe("Delete delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new DeleteDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to Delete a delivery", async () => {
    const delivery = makeDelivery({}, new UniqueEntityID("delivery-1"));

    await inMemoryDeliveryRepository.create(delivery);

    expect(inMemoryDeliveryRepository.items).toHaveLength(1);

    const result = await sut.execute({
      deliveryId: "delivery-1",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.items).toHaveLength(0);
  });
});
