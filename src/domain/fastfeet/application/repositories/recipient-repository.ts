import { Recipient } from "../../enterprise/entities/recipient";

export interface RecipientRepository {
  // findById(id: string): Promise<Recipient>;
  create(recipient: Recipient): Promise<Recipient>;
  // update(recipient: Recipient): Promise<Recipient>;
  // delete(recipientId: string): Promise<void>;
}
