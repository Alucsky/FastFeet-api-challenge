import { Delivery } from "../../enterprise/entities/delivery";

export interface DeliveryRepository {
  findById(deliveryId: string): Promise<Delivery | null>;
  create(delivery: Delivery): Promise<Delivery>;
   update(delivery: Delivery): Promise<Delivery>;
   delete(deliveryId: string): Promise<void>;
}
