import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import {
  Deliveryman,
  DeliverymanProps,
} from "@/domain/deliveries/enterprise/entities/deliveryman";

export function makeDeliveryman(
  override: Partial<DeliverymanProps> = {},
  id?: UniqueEntityID
) {
  const deliveryman = Deliveryman.create(
    {
      name: faker.person.firstName(),
      cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      ...override,
    },
    id
  );

  return deliveryman;
}
