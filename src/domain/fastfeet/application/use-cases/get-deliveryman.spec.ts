import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-deliveryMan-repository";
import { makeUser } from "test/factories/make-user";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeDeliveryMan } from "test/factories/make-deliveryMan";
import { GetDeliverymanUseCase } from "./get-deliveryman";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let sut: GetDeliverymanUseCase;

describe.only("get Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetDeliverymanUseCase(inMemoryDeliveryManRepository);
  });

  it("should be able to get a Deliveryman", async () => {
    const user = makeUser(
      {
        name: "Samuelll",
      },
      new UniqueEntityID("1")
    );
    const deliveryMan = makeDeliveryMan(
      {
        userId: user.id,
        deliveriesIds: ["4", "7"],
      },
      new UniqueEntityID("2")
    );

    await inMemoryUsersRepository.create(user);
    await inMemoryDeliveryManRepository.create(deliveryMan);

    expect(inMemoryDeliveryManRepository.items).toHaveLength(1);
    expect(inMemoryUsersRepository.items).toHaveLength(1);

    const result = await sut.execute({
      deliverymanId: deliveryMan.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value?.deliveryman.deliveriesIds).toEqual(["4", "7"]);
    }
  });
});
