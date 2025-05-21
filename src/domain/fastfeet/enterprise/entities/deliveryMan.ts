import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface DeliverymanProps {
  userId: UniqueEntityID;
  deliveriesIds: string[];
}

export class Deliveryman extends Entity<DeliverymanProps> {
  get userId() {
    return this.props.userId;
  }
  get deliveriesIds() {
    return this.props.deliveriesIds;
  }

  set deliveriesIds(deliveriesIds: string[]) {
    this.props.deliveriesIds = deliveriesIds;
  }

  static create(props: DeliverymanProps, id?: UniqueEntityID) {
    return new Deliveryman(props, id);
  }
}
