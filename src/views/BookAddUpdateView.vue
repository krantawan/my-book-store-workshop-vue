<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

import { useBookStore } from "@/stores/book";

const route = useRoute();
const router = useRouter();
const bookStore = useBookStore();

const bookData = reactive({
  name: "",
  author: "",
});

const mode = ref("create");
const bookIndex = ref(-1);

onMounted(() => {
  if (route.name == "book-edit") {
    mode.value = "update";
    bookIndex.value = parseInt(route.params.id);

    const cBookStore = bookStore.books[bookIndex.value];

    bookData.name = cBookStore.name;
    bookData.author = cBookStore.author;
  }
  //console.log(route.params.id);
});

const addBook = () => {
  if (mode.value == "update") {
    bookStore.editBook(bookData, bookIndex.value);
    router.push({ name: "book-list" });
  } else {
    bookStore.addbook(bookData);
    router.push({ name: "book-list" });
  }
};

const displayButton = computed(() => {
  if (mode.value == "update") {
    return "Update";
  } else {
    return "Create";
  }
});
</script>

<template>
  <div>
    <div>
      Book name :
      <input type="text" v-model="bookData.name" />
    </div>
    <div>
      Author name :
      <input type="text" v-model="bookData.author" />
    </div>
    <button @click="addBook()">{{ displayButton }} Book</button>
    <RouterLink :to="{ name: 'book-list' }"
      ><button>Back to home</button></RouterLink
    >
  </div>
</template>
