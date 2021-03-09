<template>
  <div class="container-fluid">
    <div class="row m-4" v-if="movies.length === 0">
      <div class="col-12 p-0 d-flex justify-content-center">
        <h1>Movies Not Founds</h1>
      </div>
    </div>
    <div class="row m-0">
      <h4 class="mt-2">Movies List</h4>
      <hr class="bg-warning" style="height: 20px" />
      <CardMovie
        v-for="movie in movies"
        :key="movie._id"
        :propsThumbnail="movie.thumbnail"
        :propsTitle="movie.title"
        :propsDesc="movie.description"
        :propsGenres="movie.genres"
        :propsRating="movie.ratings"
        :propsMovieId="movie._id"
        :propsCast="movie.cast"
        :propsPrice="movie.priceTicket"
      />
    </div>
    <div class="row m-0">
      <div class="col p-0">
        <button class="btn btn-warning" @click="getAllMovies()">
          See More Movies
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardMovie from "@/components/CardMovie";
import { mapState } from "vuex";

export default {
  name: "ContentCardFilm",
  data() {
    return {
      movies: [],
    };
  },
  computed: {
    ...mapState(["stateMovies"]),
  },
  watch: {
    stateMovies: function () {
      this.movies = this.stateMovies;
    },
  },
  components: {
    CardMovie,
  },
  methods: {
    getAllMovies() {
      axios
        .get(`https://us-central1-fajar-movies.cloudfunctions.net/movies?isAll=true`)
        .then((result) => {
          console.log(result);
          this.movies = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    axios
      .get(`https://us-central1-fajar-movies.cloudfunctions.net/movies`)
      .then((result) => {
        console.log(result);
        this.movies = result.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>