import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-deliveryMan-repository";
import { makeDeliveryMan } from "test/factories/make-deliveryMan";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeleteDeliverymanUseCase } from "./delete-deliveryman";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: DeleteDeliverymanUseCase;

describe("Delete Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteDeliverymanUseCase(
      inMemoryDeliveryManRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to Delete a Deliveryman", async () => {
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
      deliverymanId: "2",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryManRepository.items).toHaveLength(0);
    expect(inMemoryUsersRepository.items).toHaveLength(0);
  });
});
