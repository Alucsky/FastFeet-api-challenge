import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export enum DeliveryStatus {
  PENDING = "pending",
  PICKED_UP = "picked_up",
  DELIVERED = "delivered",
}

export interface DeliveryProps {
  recipientId: UniqueEntityID;
  deliverymanId?: UniqueEntityID | null;
  status: DeliveryStatus;
  postedAt: Date;
  pickedUpAt?: Date | null;
  deliveredAt?: Date | null;
}

export class Delivery extends Entity<DeliveryProps> {
  get recipientId() {
    return this.props.recipientId;
  }

  get deliverymanId() {
    return this.props.deliverymanId;
  }
  set deliverymanId(deliverymanId: UniqueEntityID | null | undefined) {
    this.props.deliverymanId = deliverymanId;
  }

  get status() {
    return this.props.status;
  }
  set status(status: DeliveryStatus) {
    this.props.status = status;
  }

  get postedAt() {
    return this.props.postedAt;
  }
  set postedAt(postedAt: Date) {
    this.props.postedAt = postedAt;
  }

  get pickedUpAt() {
    return this.props.pickedUpAt ?? new Date(0);
  }
  set pickedUpAt(pickedUpAt: Date) {
    this.props.pickedUpAt = pickedUpAt;
  }

  get deliveredAt() {
    return this.props.deliveredAt ?? new Date(0);
  }
  set deliveredAt(deliveredAt: Date) {
    this.props.deliveredAt = deliveredAt;
  }

  static create(props: DeliveryProps, id?: UniqueEntityID) {
    return new Delivery(props, id);
  }
}
