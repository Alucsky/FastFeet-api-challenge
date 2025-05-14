import { AdministratorRepository } from "@/domain/fastfeet/application/repositories/administrator-repository";
import { Administrator } from "@/domain/fastfeet/enterprise/entities/administrator";

export class InMemoryAdministratorsRepository
  implements AdministratorRepository
{
  public items: Administrator[] = [];

  async create(administrator: Administrator): Promise<Administrator> {
    this.items.push(administrator);

    return administrator;
  }
}
