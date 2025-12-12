export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string) {
    const normalized = value.trim();

    if (!Email.isValid(normalized)) {
      throw new Error('Invalid email address');
    }

    return new Email(value);
  }

  private static isValid(email: string): boolean {
    return email.includes('@');
  }

  getValue() {
    return this.value;
  }
}
