import { Entity } from "@/core/entities/entity";

export interface RecipientProps {
  name: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  state: string;
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name;
  }

  get street() {
    return this.props.street;
  }

  get number() {
    return this.props.number;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get city() {
    return this.props.city;
  }

  get postalCode() {
    return this.props.postalCode;
  }

  get state() {
    return this.props.state;
  }

  static create(props: RecipientProps) {
    return new Recipient(props);
  }
}
