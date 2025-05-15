import { Administrator } from "../../enterprise/entities/administrator";

export interface AdministratorRepository {
  findById(id: string): Promise<Administrator | null>;
  findByCpf(cpf: string): Promise<Administrator | null>;
  create(administrator: Administrator): Promise<Administrator>;
  update(administrator: Administrator): Promise<Administrator>;
  delete(administratorId: string): Promise<void>;
}
