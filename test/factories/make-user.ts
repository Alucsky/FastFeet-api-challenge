import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  User,
  UserProps,
} from "@/domain/fastfeet-auth/enterprise/entities/user";
import { UserType } from "@/domain/fastfeet-auth/enterprise/entities/value-objects/userType";

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      password: faker.internet.password(),
      userType: UserType.ADMIN,
      ...override,
    },
    id
  );

  return user;
}
