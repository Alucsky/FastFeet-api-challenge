import { Deliveryman } from "../../enterprise/entities/deliveryMan";

export interface DeliveryManRepository {
  // findById(id: string): Promise<DeliveryMan>;
  create(deliveryMan: Deliveryman): Promise<Deliveryman>;
  //  update(deliveryMan: DeliveryMan): Promise<DeliveryMan>;
  //  delete(deliveryManId: string): Promise<void>;
}
