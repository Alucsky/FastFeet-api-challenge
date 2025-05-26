import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { CreateDeliveryUseCase } from "./create-delivery";
import { DeliveryStatus } from "../../enterprise/entities/value-objects/deliveryStatus";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: CreateDeliveryUseCase;

describe("Create delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new CreateDeliveryUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to create a delivery", async () => {
    const result = await sut.execute({
      recipientId: "1",
      deliverymanId: "1",
      status: "pending",
      neighborhood: "neighborhood",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.items).toHaveLength(1);
    expect(inMemoryDeliveryRepository.items[0].status).toBe(
      DeliveryStatus.PENDING
    );
    expect(inMemoryDeliveryRepository.items[0].deliverymanId).toBeInstanceOf(
      UniqueEntityID
    );
  });

  it("should be able to create a delivery without deliveryman ", async () => {
    const result = await sut.execute({
      recipientId: "1",
      deliverymanId: null,
      status: "pending",
      neighborhood: "neighborhood",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryRepository.items).toHaveLength(1);
    expect(inMemoryDeliveryRepository.items[0].status).toBe(
      DeliveryStatus.PENDING
    );
    expect(inMemoryDeliveryRepository.items[0].deliverymanId).toBe(null);
  });
});
