import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import {
  Recipient,
  RecipientProps,
} from "@/domain/delivery/enterprise/entities/recipient";

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID
) {
  const recipient = Recipient.create(
    {
      userId: new UniqueEntityID(),
      address: {
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        neighborhood: faker.person.firstName(),
        // Using firstName as a placeholder for neighborhood
        // since faker doesn't have a specific method for neighborhoods
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        state: faker.location.state(),
      },
      ...override,
    },
    id
  );

  return recipient;
}
