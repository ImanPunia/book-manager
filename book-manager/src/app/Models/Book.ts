export class Book{
    constructor(
        public name: String, 
        public author: String, 
        public volume: String, 
        public copies: String,
        public files: File | null) {
    }
}