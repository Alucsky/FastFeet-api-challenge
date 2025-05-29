export class UserType {
  private readonly value: string;

  private constructor(value: string) {
    if (!UserType.isValid(value)) {
      throw new Error(`Invalid user type: ${value}`);
    }
    this.value = value;
  }

  static ADMIN = new UserType("admin");
  static DELIVERYMAN = new UserType("deliveryman");
  static RECIPIENT = new UserType("recipient");

  static fromStringToEnum(value: string): UserType {
    return new UserType(value);
  }

  static isValid(value: string): boolean {
    return ["admin", "deliveryman", "recipient"].includes(value);
  }

  // Métodos auxiliares
  isAdmin(): boolean {
    return this.value === "admin";
  }

  isDeliveryman(): boolean {
    return this.value === "deliveryman";
  }

  isRecipient(): boolean {
    return this.value === "recipient";
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserType): boolean {
    return this.value === other.value;
  }
}
