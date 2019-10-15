require("dotenv").config();

import { ApolloServer } from "apollo-server";

import mongoose from "mongoose";
import { Book, User } from "./models";
import { resolvers, typeDefs } from "./graphql";

// Database
mongoose.set("useFindAndModify", false);
const { mongoURI: db } = process.env;

mongoose
  .connect(db || "", {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      Book,
      User
    };
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
