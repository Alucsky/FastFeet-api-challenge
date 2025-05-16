import { DeliveryRepository } from "@/domain/fastfeet/application/repositories/delivery-repository";
import { Delivery } from "@/domain/fastfeet/enterprise/entities/delivery";

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public items: Delivery[] = [];

  async findById(deliveryId: string) {
    const delivery = this.items.find(
      (item) => item.id.toString() === deliveryId
    );

    if (!delivery) {
      return null;
    }

    return delivery;
  }
  async create(delivery: Delivery) {
    this.items.push(delivery);

    return delivery;
  }
  async delete(deliveryId: string) {
    const deliveryIndex = this.items.findIndex(
      (item) => item.id.toString() === deliveryId
    );
    if (deliveryIndex !== -1) {
      this.items.splice(deliveryIndex, 1);
    }
  }
  async update(delivery: Delivery) {
    const deliveryIndex = this.items.findIndex(
      (item) => item.id.toString() === delivery.id.toString()
    );

    if (deliveryIndex !== -1) {
      this.items[deliveryIndex] = delivery;
    }

    return delivery;
  }
}
