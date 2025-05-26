import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeliveryStatus } from "./value-objects/deliveryStatus";

export interface DeliveryProps {
  recipientId: UniqueEntityID;
  deliverymanId: UniqueEntityID | null;
  neighborhood: string;
  status: DeliveryStatus;
  postedAt: Date;
  pickedUpAt: Date | null;
  deliveredAt: Date | null;
}

export class Delivery extends Entity<DeliveryProps> {
  get recipientId() {
    return this.props.recipientId;
  }

  get deliverymanId() {
    return this.props.deliverymanId;
  }
  get neighborhood() {
    return this.props.neighborhood;
  }
  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }
  set deliverymanId(deliverymanId: UniqueEntityID | null) {
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
    return this.props.pickedUpAt;
  }
  set pickedUpAt(pickedUpAt: Date | null) {
    this.props.pickedUpAt = pickedUpAt;
  }

  get deliveredAt() {
    return this.props.deliveredAt;
  }
  set deliveredAt(deliveredAt: Date | null) {
    this.props.deliveredAt = deliveredAt;
  }

  static create(props: DeliveryProps, id?: UniqueEntityID) {
    return new Delivery(props, id);
  }
}
