export class Book {
  constructor(
    public name: String,
    public author: String,
    public copies: String,
    public volume: String,
    public file: File | null
  ) {}
}
