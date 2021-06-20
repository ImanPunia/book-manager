export interface book {
  name: String;
  author: String;
  volume: String;
  copies: String;
  file: file;
}

export interface file {
  url: string;
  mimetype: string;
}
