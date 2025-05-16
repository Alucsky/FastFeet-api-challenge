import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Delivery,
  DeliveryProps,
  DeliveryStatus,
} from "@/domain/fastfeet/enterprise/entities/delivery";

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueEntityID
) {
  const delivery = Delivery.create(
    {
      recipientId: new UniqueEntityID(),
      deliverymanId: new UniqueEntityID(),
      status: DeliveryStatus.PENDING,
      postedAt: new Date(),
      pickedUpAt: null,
      deliveredAt: null,
      ...override,
    },
    id
  );

  return delivery;
}
