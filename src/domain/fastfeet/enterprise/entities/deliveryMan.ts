import { Entity } from "@/core/entities/entity";

export interface DeliverymanProps {
  name: string;
  cpf: string;
  password: string;
}

export class Deliveryman extends Entity<DeliverymanProps> {
  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  static create(props: DeliverymanProps) {
    return new Deliveryman(props);
  }
}
