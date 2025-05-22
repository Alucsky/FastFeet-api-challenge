import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-deliveryMan-repository";
import { CreateDeliverymanUseCase } from "./create-deliveryman";

let inMemoryUserRepository: InMemoryUsersRepository;
let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let sut: CreateDeliverymanUseCase;

describe("Create Deliveryman", () => {
  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new CreateDeliverymanUseCase(
      inMemoryDeliveryManRepository,
      inMemoryUserRepository
    );
  });

  it("should be able to create a Deliveryman", async () => {
    const result = await sut.execute({
      name: "Samuel",
      password: "123456",
      cpf: "12345678901",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryManRepository.items).toHaveLength(1);

  
  });
});
