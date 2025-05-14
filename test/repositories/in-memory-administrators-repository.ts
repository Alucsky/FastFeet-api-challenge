import { AdministratorRepository } from "@/domain/fastfeet/application/repositories/administrator-repository";
import { Administrator } from "@/domain/fastfeet/enterprise/entities/administrator";

export class InMemoryAdministratorsRepository
  implements AdministratorRepository
{
  public items: Administrator[] = [];

  async create(administrator: Administrator) {
    this.items.push(administrator);

    return administrator;
  }
  async findById(id: string) {
    const administrator = this.items.find((item) => item.id.toString() === id);

    if (!administrator) {
      return null;
    }

    return administrator;
  }
  async delete(administratorId: string) {
    const administratorIndex = this.items.findIndex(
      (item) => item.id.toString() === administratorId
    );

    if (administratorIndex !== -1) {
      this.items.splice(administratorIndex, 1);
    }
  }
}
