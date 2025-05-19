import { Deliveryman } from "../../enterprise/entities/deliveryMan";

export interface DeliveryManRepository {
  findById(id: string): Promise<Deliveryman | null>;
  create(deliveryMan: Deliveryman): Promise<Deliveryman>;
  update(deliveryMan: Deliveryman): Promise<Deliveryman>;
  delete(deliveryManId: string): Promise<void>;
}
