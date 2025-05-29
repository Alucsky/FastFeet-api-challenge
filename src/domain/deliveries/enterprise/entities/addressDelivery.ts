import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface AddressDeliveryProps {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  state: string;
}

export class AddressDelivery extends Entity<AddressDeliveryProps> {
  constructor(props: AddressDeliveryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: AddressDeliveryProps, id?: UniqueEntityID) {
    return new AddressDelivery(props, id);
  }

  get street() {
    return this.props.street;
  }
  set street(street: string) {
    this.props.street = street;
  }

  get number() {
    return this.props.number;
  }
  set number(number: string) {
    this.props.number = number;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }
  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  get city() {
    return this.props.city;
  }
  set city(city: string) {
    this.props.city = city;
  }

  get postalCode() {
    return this.props.postalCode;
  }
  set postalCode(postalCode: string) {
    this.props.postalCode = postalCode;
  }

  get state() {
    return this.props.state;
  }
  set state(state: string) {
    this.props.state = state;
  }
}
