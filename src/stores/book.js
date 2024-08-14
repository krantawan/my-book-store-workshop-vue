import { defineStore } from "pinia";

export const useBookStore = defineStore("book", {
  state: () => ({
    books: [
      {
        name: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
      },
    ],
  }),
  actions: {
    addbook(bookData) {
      this.books.push(bookData);
    },
    removeBook(bookIndex) {
      this.books.splice(bookIndex, 1);
    },

    editBook(bookData, bookIndex) {
      this.books.splice(bookIndex, 1, bookData);
    },
  },
});
