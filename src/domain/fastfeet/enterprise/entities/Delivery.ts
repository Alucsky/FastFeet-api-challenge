import { Entity } from "@/core/entities/entity";


enum DeliveryStatus {
  PENDING,
  PICKED_UP,
  DELIVERED,
}

export interface DeliveryProps {
  recipientId: string;
  deliverymanId?: string;
  status: DeliveryStatus;
  postedAt: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;
}

export class Delivery extends Entity<DeliveryProps> {
  get recipientId() {
    return this.props.recipientId;
  }

  get deliverymanId() {
    return this.props.deliverymanId;
  }

  get status() {
    return this.props.status;
  }

  get postedAt() {
    return this.props.postedAt;
  }

  get pickedUpAt() {
    return this.props.pickedUpAt;
  }

  get deliveredAt() {
    return this.props.deliveredAt;
  }

  static create(props: DeliveryProps) {
    return new Delivery(props);
  }
}