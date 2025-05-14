import { Entity } from "@/core/entities/entity";

export interface AdministratorProps {
  name: string;
  cpf: string;
  password: string;
}

export class Administrator extends Entity<AdministratorProps> {
  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  static create(props: AdministratorProps) {
    return new Administrator(props);
  }
}
