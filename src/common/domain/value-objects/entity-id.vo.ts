export class EntityId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
    return new EntityId(value);
  }

  static create(value: string) {}
}
