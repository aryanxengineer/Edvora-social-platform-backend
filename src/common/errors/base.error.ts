export abstract class AppError extends Error {
  abstract statusCode: number;
  abstract code: string;
  public details?: unknown;

  protected constructor(message: string, details?: unknown) {
    super(message);
    this.details = details;

    // Required for proper instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
