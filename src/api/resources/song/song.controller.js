import Joi from "joi";
import Song from "./song.model";
export default {
  async create(req, res) {
    try {
      console.log(req.body);
      //return res.json({ msg: "TODO: SONG CREATE" });
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        url: Joi.string().required(),
        rating: Joi.number().min(0).max(5).optional(),
      });
      const { value, error } = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const song = await Song.create(
        Object.assign({}, value, { artist: req.user._id })
      );
      return res.json(song);
      //return res.json(value);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
  async findAll(req, res) {
    try {
      //  const song = await Song.find();
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 5,
        populate: {
          path: "artist",
          select: "firstName lastName",
        },
      };
      const song = await Song.paginate({}, options);
      return res.json(song);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const song = await Song.findById({ _id: id }).populate(
        "artist",
        "firstName lastName"
      );
      if (!song) {
        return res.status(200).send("Song not found");
      } else {
        return res.json(song);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async deleteOne(req, res) {
    try {
      const { id } = req.params;
      const song = await Song.findOneAndRemove({ _id: id });
      if (!song) {
        return res.status(404).json({ err: "Song not found" });
      } else {
        return res.json(song);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async updateOne(req, res) {
    try {
      const { id } = req.params;
      const schema = Joi.object().keys({
        title: Joi.string().optional(),
        url: Joi.string().optional(),
        rating: Joi.number().min(0).max(5).optional(),
      });
      const { value, error } = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }

      const song = await Song.findOneAndUpdate({ _id: id }, value, {
        new: true,
      });
      if (!song) {
        return res.status(404).json({ err: "Song not found" });
      } else {
        return res.json(song);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
};
