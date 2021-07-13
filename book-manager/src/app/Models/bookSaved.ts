export interface book {
  id: String;
  name: String;
  author: String;
  volume: String;
  copies: String;
  file: file;
  src:  String;
}

export interface file {
  url: string;
  mimetype: string;
}
