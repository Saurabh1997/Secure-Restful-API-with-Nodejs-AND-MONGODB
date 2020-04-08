import playlistService from "./playlist.service";
import Playlist from "./playlist.model";
export default {
  async create(req, res) {
    try {
      const { value, error } = playlistService.validateBody(req.body);
      if (error && error.details) {
        return res.json(error);
      }
      const playlist = await Playlist.create(
        Object.assign({}, value, { user: req.user._id })
      );
      return res.json(playlist);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
  async findAll(req, res) {
    try {
      const playlists = await Playlist.find()
        .populate("songs")
        .populate("user", "firstName lastName");
      if (!playlists) {
        return res.json({ message: "No Playlist found" });
      }
      return res.json(playlists);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
};
