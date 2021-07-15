export interface book {
  _id: String;
  name: String;
  author: String;
  copies: String;
  volume: String;
  file: file;
  src:  String;
}

export interface file {
  url: string;
  mimetype: string;
}

export class updateBook{
  constructor(
    public _id: String,
    public name: String,
    public author: String,
    public copies: String,
    public volume: String,
    public uploadedFile: File | null,
    public file: file
  ) {}
}
