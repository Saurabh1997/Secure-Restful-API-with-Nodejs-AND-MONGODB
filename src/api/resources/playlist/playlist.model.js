import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate";
const { Schema } = mongoose; // schema from mongoose
const playlistSchema = new Schema({
  name: {
    type: String,
    required: [true, "Playlist must have title"],
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Playlist", playlistSchema); //defines a model
