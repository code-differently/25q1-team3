export class BookmarkAlreadyExistsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BookmarkAlreadyExistsException";
    Object.setPrototypeOf(this, BookmarkAlreadyExistsException.prototype); // Important for instanceof checks
  }
}

export class ProgramNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProgramNotFoundException";
    Object.setPrototypeOf(this, ProgramNotFoundException.prototype); // Important for instanceof checks
  }
}
