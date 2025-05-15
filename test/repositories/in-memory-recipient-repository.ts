import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { RecipientRepository } from "@/domain/fastfeet/application/repositories/recipient-repository";
import { Recipient } from "@/domain/fastfeet/enterprise/entities/recipient";

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = [];

  async create(recipient: Recipient) {
    this.items.push(recipient);

    return recipient;
  }

  async findById(id: string) {
    const recipient = this.items.find((item) => item.id.toString() === id);

    if (!recipient) {
      return null;
    }

    return recipient;
  }
}
