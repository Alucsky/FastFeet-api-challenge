import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Delivery,
  DeliveryProps,
} from "@/domain/fastfeet/enterprise/entities/delivery";
import { DeliveryStatus } from "@/domain/fastfeet/enterprise/entities/value-objects/deliveryStatus";
import { faker } from "@faker-js/faker";

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
      neighborhood: faker.word.words({ count: { min: 2, max: 5 } }),
      ...override,
    },
    id
  );

  return delivery;
}
