import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Administrator,
  AdministratorProps,
} from "@/domain/fastfeet/enterprise/entities/administrator";

export function makeAdministrator(
  override: Partial<AdministratorProps> = {},
  id?: UniqueEntityID
) {
  const administrator = Administrator.create(
    {
      name: faker.person.fullName(),
      cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return administrator;
}
