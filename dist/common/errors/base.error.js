export class AppError extends Error {
    details;
    constructor(message, details) {
        super(message);
        this.details = details;
        // Required for proper instanceof checks
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
//# sourceMappingURL=base.error.js.map