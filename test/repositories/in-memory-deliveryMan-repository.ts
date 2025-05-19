import { DeliveryManRepository } from "@/domain/fastfeet/application/repositories/deliveryMan-repository";
import { Deliveryman } from "@/domain/fastfeet/enterprise/entities/deliveryMan";

export class InMemoryDeliveryManRepository implements DeliveryManRepository {
  public items: Deliveryman[] = [];

  async create(deliveryMan: Deliveryman): Promise<Deliveryman> {
    this.items.push(deliveryMan);
    return deliveryMan;
  }
  async findById(id: string): Promise<Deliveryman | null> {
    const deliveryMan = this.items.find((item) => item.id.toString() === id);

    if (!deliveryMan) {
      return null;
    }
    return deliveryMan;
  }
  async delete(deliveryManId: string): Promise<void> {
    const deliveryManIndex = this.items.findIndex(
      (item) => item.id.toString() === deliveryManId
    );
    if (deliveryManIndex !== -1) {
      this.items.splice(deliveryManIndex, 1);
    }
  }
  async update(deliveryMan: Deliveryman): Promise<Deliveryman> {
    const deliveryManIndex = this.items.findIndex(
      (item) => item.id.toString() === deliveryMan.id.toString()
    );
    if (deliveryManIndex !== -1) {
      this.items[deliveryManIndex] = deliveryMan;
    }
    return deliveryMan;
  }
}
