import Joi from "joi";
export default {
  async create(req, res) {
    try {
      console.log(req.body);
      //return res.json({ msg: "TODO: SONG CREATE" });
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        url: Joi.string().required(),
        rating: Joi.number()
          .min(0)
          .max(5)
          .optional()
      });
      const { value, error } = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      return res.json(value);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
