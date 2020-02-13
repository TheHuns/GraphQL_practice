const express = require("express");
const graphql = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross origin requests
app.use(cors());

mongoose.connect(
  "mongodb+srv://dehnger:Bayfield85%21@cluster0-cho1k.mongodb.net/graphql_test?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphql({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("api running on port 4000");
});
