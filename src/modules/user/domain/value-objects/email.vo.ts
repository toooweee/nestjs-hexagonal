export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid email');
    }

    this.value = value;
  }

  private isValid(email: string): boolean {
    return email.includes('@');
  }
}
