import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface AdministratorProps {
  name: string;
  cpf: string;
  password: string;
}

export class Administrator extends Entity<AdministratorProps> {
  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }

  get cpf() {
    return this.props.cpf;
  }
  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get password() {
    return this.props.password;
  }
  set password(password: string) {
    this.props.password = password;
  }

  static create(props: AdministratorProps, id?: UniqueEntityID) {
    return new Administrator(props, id);
  }
}
