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
      userId: new UniqueEntityID(),
      deliveriesIds: [],
      ...override,
    },
    id
  );

  return deliveryMan;
}
