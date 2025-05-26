import { InMemoryDeliveryRepository } from "test/repositories/in-memory-delivery-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeDelivery } from "test/factories/make-delivery";
import { FetchDeliveriesByNeighborhoodUseCase } from "./fetch-deliveries-by-neighborhood";

let inMemoryDeliveryRepository: InMemoryDeliveryRepository;
let sut: FetchDeliveriesByNeighborhoodUseCase;

describe("Fetch delivery by neighborhood delivery", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository();
    sut = new FetchDeliveriesByNeighborhoodUseCase(inMemoryDeliveryRepository);
  });

  it("should be able to Fetch delivery by neighborhood", async () => {
    const delivery1 = makeDelivery(
      {
        neighborhood: "neighborhood-1",
      },
      new UniqueEntityID("delivery-1")
    );
    const delivery2 = makeDelivery(
      {
        neighborhood: "neighborhood-1",
      },
      new UniqueEntityID("delivery-2")
    );
    const delivery3 = makeDelivery(
      {
        neighborhood: "neighborhood-2",
      },
      new UniqueEntityID("delivery-3")
    );

    await inMemoryDeliveryRepository.create(delivery1);
    await inMemoryDeliveryRepository.create(delivery2);
    await inMemoryDeliveryRepository.create(delivery3);

    const result1 = await sut.execute({
      neighborhood: "neighborhood-1",
    });
    const result2 = await sut.execute({
      neighborhood: "neighborhood-2",
    });

    expect(result1.isRight()).toBe(true);
    if (result1.isRight()) {
      expect(result1.value.deliveries.length).toEqual(2);
    }

    expect(result2.isRight()).toBe(true);
    if (result2.isRight()) {
      expect(result2.value.deliveries.length).toEqual(1);
    }
  });
});
