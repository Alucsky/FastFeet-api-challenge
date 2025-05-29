import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "@/core/entities/entity";

export interface RecipientProps {
  name: string;
  cpf: string;
  address: string; //mudar depoisss
}

export class Recipient extends Entity<RecipientProps> {
  constructor(props: RecipientProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    return new Recipient(props, id);
  }
}
