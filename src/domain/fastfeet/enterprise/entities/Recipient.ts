import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { UserProps } from "./user";
import { Entity } from "@/core/entities/entity";

interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  state: string;
}

export interface RecipientProps {
  userId: UniqueEntityID;
  address: Address;
}

export class Recipient extends Entity<RecipientProps> {
  constructor(props: RecipientProps, id?: UniqueEntityID) {
    super(props, id);
  }
  get userId() {
    return this.props.userId;
  }

  get address() {
    return this.props.address;
  }
  set address(address: Address) {
    this.props.address = address;
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    return new Recipient(props, id);
  }
}
