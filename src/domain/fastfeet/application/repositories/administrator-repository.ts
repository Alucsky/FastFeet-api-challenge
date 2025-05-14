import { Administrator } from "../../enterprise/entities/Administrator";

export interface AdministratorRepository {
  findById(id: string): Promise<Administrator>;
  create(administrator: Administrator): Promise<Administrator>;
  update(administrator: Administrator): Promise<Administrator>;
  delete(administratorId: string): Promise<void>;
}
