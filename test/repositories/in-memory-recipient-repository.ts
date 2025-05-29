import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository";
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";

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
  async delete(recipientId: string) {
    const recipientIndex = this.items.findIndex(
      (item) => item.id.toString() === recipientId
    );

    if (recipientIndex !== -1) {
      this.items.splice(recipientIndex, 1);
    }
  }
  async update(recipient: Recipient) {
    const recipientIndex = this.items.findIndex(
      (item) => item.id.toString() === recipient.id.toString()
    );
    if (recipientIndex !== -1) {
      this.items[recipientIndex] = recipient;
    }
    return recipient;
  }
}
