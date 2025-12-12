export class UserId {
  private constructor(private readonly value: string) {}

  static create(value: string) {
    return new UserId(value);
  }

  getValue() {
    return this.value;
  }
}
