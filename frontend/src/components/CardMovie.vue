<template>
  <div class="col-md-3 col-xs-12 p-2 d-flex justify-content-center">
    <div class="card shadow m-0 p-0" style="width: 20rem; height: 100%">
      <img
        :src="propsThumbnail"
        class="card-img-top"
        alt="propsThumbnail"
        height="300"
      />
      <div class="row m-0" style="position: absolute; opacity: 0.8">
        <div
          v-for="cast in propsCast"
          :key="cast"
          class="col p-0 d-flex justify-content-center"
        >
          <span class="badge bg-warning text-dark">{{ cast }}</span>
        </div>
      </div>
      <div class="row m-0" style="position: absolute; top: 280px; opacity: 0.8">
        <span class="badge bg-info text-dark"
          >Price: IDR. {{ propsPrice.$numberDecimal }}</span
        >
      </div>
      <div class="row m-0 p-2">
        <div class="col-9 p-0">
          <div class="row m-0">
            <div
              v-for="genre in propsGenres"
              :key="genre"
              class="col p-0 d-flex justify-content-start"
            >
              <span class="badge bg-warning text-dark">{{ genre }}</span>
            </div>
          </div>
        </div>
        <div class="col p-0">
          <div class="row m-0">
            <div class="col p-0 d-flex justify-content-center">
              <span class="text-dark" style="font-size: 10px"
                >{{ propsRating.$numberDecimal }} / 5.0
                <i class="fas fa-star text-warning"></i
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ propsTitle }}</h5>
        <p class="card-text">
          {{
            propsDesc.length > 146
              ? propsDesc.slice(0, 146) + " ..."
              : propsDesc
          }}
        </p>
      </div>
      <div class="card-footer bg-dark">
        <div class="row m-0">
          <button
            class="btn btn-outline-warning"
            @click="bookMovie(propsMovieId)"
          >
            Book Now!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CardMovie",
  data() {
    return {
      cookieId: null,
    };
  },
  props: {
    propsThumbnail: String,
    propsTitle: String,
    propsDesc: String,
    propsGenres: Array,
    propsRating: Object,
    propsMovieId: String,
    propsCast: Array,
    propsPrice: Object,
  },
  methods: {
    bookMovie(_id) {
      let movieId = {
        movieId: _id,
      };
      console.log(movieId);
      axios
        .post(`https://us-central1-fajar-movies.cloudfunctions.net/movies/booking/${this.cookieId}`, movieId)
        .then((result) => {
          console.log(result);
          alert("Success add to update cart");
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.cookieId = this.$cookie.get("transactionId");
    // console.log(this.$cookie.get("transactionId"));
  },
};
</script>