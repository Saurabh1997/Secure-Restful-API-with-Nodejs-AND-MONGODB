import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate";
const { Schema } = mongoose; // schema from mongoose
const songSchema = new Schema({
  title: {
    type: String,
    required: [true, "Song must have title"],
  },
  url: {
    type: String,
    required: [true, "Song must have URL"],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

songSchema.plugin(mongoosepaginate); //plugging in mongoose-paginate into schema of song
export default mongoose.model("Song", songSchema); //defines a model
