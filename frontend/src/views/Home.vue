<template>
  <div class="home">
    <SearchComponents />
    <ContentCardMovies />
  </div>
</template>

<script>
// @ is an alias to /src
import ContentCardMovies from "@/components/ContentCardMovies.vue";
import SearchComponents from "@/components/SearchComponents.vue";

export default {
  name: "Home",
  components: {
    ContentCardMovies,
    SearchComponents,
  },
  created() {
    let generateTransactionId = Math.floor(Math.random() * 100);
    console.log(this.$cookie.get("transactionId"));
    if (!this.$cookie.get("transactionId")) {
      this.$cookie.set("transactionId", generateTransactionId, 100000);
    }
  },
};
</script>
