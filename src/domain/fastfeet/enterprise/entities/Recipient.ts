import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

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
  set name(name: string) {
    this.props.name = name;
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
  static create(props: RecipientProps, id?: UniqueEntityID) {
    return new Recipient(props, id);
  }
}
