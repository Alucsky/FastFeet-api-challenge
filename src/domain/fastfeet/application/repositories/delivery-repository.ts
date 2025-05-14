import { Delivery } from "../../enterprise/entities/Delivery";

export interface DeliveryRepository {
  // findById(id: string): Promise<Delivery>;
  create(delivery: Delivery): Promise<Delivery>;
  // update(delivery: Delivery): Promise<Delivery>;
  // delete(deliveryId: string): Promise<void>;
}
