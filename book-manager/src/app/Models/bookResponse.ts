import { book } from "./bookSaved";

export interface bookResponse{
    books  : book[],
    message: string;
    count:   string;
}
