export class DeliveryStatus {
  private constructor(private readonly value: string) {}

  static readonly PENDING = new DeliveryStatus("pending");
  static readonly IN_PROGRESS = new DeliveryStatus("in_progress");
  static readonly DELIVERED = new DeliveryStatus("delivered");

  static fromStringToEnum(value: string) {
    switch (value.toLowerCase()) {
      case "pending":
        return DeliveryStatus.PENDING;
      case "in_progress":
        return DeliveryStatus.IN_PROGRESS;
      case "delivered":
        return DeliveryStatus.DELIVERED;
      default:
        throw new Error(`Invalid delivery status: ${value}`);
    }
  }

  getValue() {
    return this.value;
  }

  isPending() {
    return this.value === "pending";
  }

  isDelivered() {
    return this.value === "delivered";
  }
}
