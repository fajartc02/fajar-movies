# fajar-movies
## GENERAL INFORMATIION (MongoDB, Express, Vuejs, Nodejs)

## LINK DEPLOY: 
https://fajar-movies.web.app/

1. DATABASE SCHEMA (MONGODB ATLAS)

> MOVIES SCHEMA
- _id
- title
- description
- category
- ratings
- cast
- dateReleased
- priceTicket

> BOOKING SCHEMA
- _id
- transactionId
- movieId
- totalAmount
- paymentStatus

2. API'S DOCUMENTATION

ROUTING | METHODS | Description 
--- | --- | --- 
https://us-central1-fajar-movies.cloudfunctions.net/movies? | GET | queryString: keywords=whateverYouNeed (for search all metadata movies), isAll=true (get all movies),default (top 10 Movies This Year)
| https://us-central1-fajar-movies.cloudfunctions.net/movies/getOne/:_id  | GET | to get one Movie |
| https://us-central1-fajar-movies.cloudfunctions.net/movies  | POST | Create Movie |
| https://us-central1-fajar-movies.cloudfunctions.net/movies/booking/:transactionId  | POST | For Booking movie to add to cart (max: 1 movie only) |
| https://us-central1-fajar-movies.cloudfunctions.net/movies/booking/:transactionId  | GET | For get booking movie data not yet to purchase |
| https://us-central1-fajar-movies.cloudfunctions.net/movies/purchase/:transactionId  | POST | purchase movie on cart, and fetching API data from api.themoviedb.org|

3. Modules
- bootstrap
- fontawesome
- vue pwa
- vue-cookie
- axios
- etc. (see on package.json)


4. Deployment
- Firebase Tools for deploy cloud functions and cloud hosting

NOTE:
Don't doubt to ask with me if any unclear information.
I hope we can work together from TEST


Thank You

Regards,
Fajar Tri Cahyono


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

