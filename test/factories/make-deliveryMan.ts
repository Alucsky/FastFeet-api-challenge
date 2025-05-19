import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import {
  Deliveryman,
  DeliverymanProps,
} from "@/domain/fastfeet/enterprise/entities/deliveryMan";

export function makeDeliveryMan(
  override: Partial<DeliverymanProps> = {},
  id?: UniqueEntityID
) {
  const deliveryMan = Deliveryman.create(
    {
      name: faker.person.fullName(),
      cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return deliveryMan;
}
