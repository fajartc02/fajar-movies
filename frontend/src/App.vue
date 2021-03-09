<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand mb-0 h1 text-warning" to="/"
          >Fajar's Movies</router-link
        >
        <div class="row">
          <div class="col dropstart">
            <button
              class="btn btn-outline-warning ropdown-toggle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-shopping-cart"></i>
              <span
                v-if="totalCart !== 0"
                class="badge bg-warning rounded-pill text-dark"
                style="position: absolute"
                >{{ totalCart }}</span
              >
            </button>
            <div
              class="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
              style="min-width: 500px !important"
            >
              <div class="row m-0 p-2">
                <table class="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Thumbnail</th>
                      <th>Title</th>
                      <th>Price (IDR)</th>
                    </tr>
                  </thead>
                  <tbody v-if="totalCart !== 0">
                    <tr v-for="(movie, i) in movieOnCart" :key="movie._id + i">
                      <td>{{ i + 1 }}</td>
                      <td>
                        <img :src="movie.thumbnail" width="50" height="50" />
                      </td>
                      <td>{{ movie.title }}</td>
                      <td>{{ movie.priceTicket.$numberDecimal }}</td>
                    </tr>
                    <tr>
                      <td colspan="3">Total</td>
                      <td>{{ totalAmount }}</td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <button
                          class="btn btn-outline-warning"
                          @click="purchaseMovie()"
                        >
                          Purchase <i class="fas fa-money-bill-wave"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="4" class="text-warning">
                        Nothing Movies At Cart
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div id="nav"></div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
// import {mapState} from "vuex"
export default {
  name: "App",
  data() {
    return {
      totalCart: 0,
      movieOnCart: [],
      totalAmount: 0,
    };
  },
  methods: {
    purchaseMovie() {
      axios
        .post(
          `https://us-central1-fajar-movies.cloudfunctions.net/movies/purchase/${this.$cookie.get(
            "transactionId"
          )}`
        )
        .then((result) => {
          console.log(result);
          alert("Success add to purchase movie");
          // this.$router.go(`${result.data.data}`);
          if (result.data.data) {
            window.open(result.data.data);
            this.$router.go();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    axios
      .get(
        `https://us-central1-fajar-movies.cloudfunctions.net/movies/booking/${this.$cookie.get(
          "transactionId"
        )}`
      )
      .then((result) => {
        console.log(result.data.data);
        if (result.data.data.length > 0) {
          this.totalCart = result.data.data[0].movieId.length;
          this.movieOnCart = result.data.data[0].movieId;
          this.totalAmount = result.data.data[0].totalAmount;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
