require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";

import mongoose from "mongoose";
import { ObjectID } from "mongodb";

mongoose.set("useFindAndModify", false);

const { mongoURI: db } = process.env;

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const BookSchema = new Schema(
  {
    title: {
      type: String
    },
    author: {
      type: String
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID!
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(title: String, author: String): Book
    updateBook(id: ID, title: String, author: String): Book
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: async () => {
      const books = Book.find();
      return books;
    }
  },
  Mutation: {
    createBook: async (_, { title, author }) => {
      const newBook = await new Book({ title, author });
      return newBook.save();
    },
    updateBook: async (_, { id, title, author }) => {
      const book = await Book.findOneAndUpdate(
        { _id: id },
        { title, author },
        { new: true }
      );
      return book;
    }
  }
};

// Database
mongoose
  .connect(db || "", {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

/*
import express from "express";

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
*/
