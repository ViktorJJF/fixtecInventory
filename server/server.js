// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// mongoose.plugin(require("mongoose-beautiful-unique-validation")); //unique validator
// mongoose.plugin(require("mongoose-paginate-v2")); //paginator

// //Middleware

// // parse application/x-www-form-urlencoded
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//     limit: "20mb",
//   })
// );

// // parse application/json
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//   })
// );

// mongoose.connect(
//   process.env.DBSTRING,
//   {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   },
//   (err, res) => {
//     if (err) throw err;
//     console.log("DB online ONLINE");
//   }
// );

// const routes = require("./routes/api/api.js");

// app.use("/api", routes);

// //Handle Production
// // if (process.env.NODE_ENV === "production") {
// //static folder
// app.use(express.static(__dirname + "/public"));
// //Handle SPA
// app.get(/.*/, (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });
// // }
// process.env.PORT = process.env.PORT || 3000;

// app.listen(process.env.PORT, () => {
//   console.log(`Server starting on port ${process.env.PORT}`);
// });

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const app = express();
const initMongo = require("./config/mongo");
const path = require("path");

// Setup express server port from ENV, default: 3000
app.set("port", process.env.PORT || 3000);

// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// for parsing json
app.use(
  bodyParser.json({
    limit: "20mb",
  })
);
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: "20mb",
    extended: true,
  })
);

// Init all other stuff
app.use(cors());
app.use(passport.initialize());
// app.use(compression());
// app.use(helmet());
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
// app.engine('html', require('ejs').renderFile)
app.set("view engine", "html");
app.use("/api", require("./routes/api/index.js"));

app.listen(app.get("port"));

// Init MongoDB
initMongo();
