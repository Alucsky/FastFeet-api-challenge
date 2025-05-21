import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface DeliverymanProps {
  userId: string;
  
}

export class Deliveryman extends Entity<DeliverymanProps> {
  static create(props: DeliverymanProps, id?: UniqueEntityID) {
    return new Deliveryman(props, id);
  }
}
