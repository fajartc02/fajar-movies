<template>
  <div class="d-flex">
    <input
      class="form-control me-2"
      type="search"
      v-model="keywords"
      placeholder="Search (actor, rating, title, etc.)"
      aria-label="Search"
    />
    <button class="btn btn-outline-success" @click="search()">Search</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      keywords: "",
    };
  },
  methods: {
    ...mapActions(["searchMovies"]),
    search() {
      this.searchMovies(this.keywords);
    },
  },
};
</script>

<style>
</style>