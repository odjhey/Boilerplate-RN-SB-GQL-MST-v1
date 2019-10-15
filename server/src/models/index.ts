import mongoose from "mongoose";
import { ObjectID } from "mongodb";

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
    },
    checkin: {
      type: Boolean
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

export { Book };
