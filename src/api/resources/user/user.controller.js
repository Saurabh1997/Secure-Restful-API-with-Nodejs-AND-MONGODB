import User, { STANDARD_ROLE } from "./user.model";
import userServices from "./user.services";
import jwt from "../../helpers/jwt";
export default {
  async signup(req, res) {
    try {
      const { value, error } = userServices.validateSignup(req.body);
      if (error) {
        return res.status(400).json(error.message);
      }
      const encryptedPassword = userServices.encryptPassword(value.password);
      const user = await User.create({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: encryptedPassword,
        role: value.role || STANDARD_ROLE, //IF USER ROLE IS PROVIDED,USE IT. ELSE STANDARD_ROLE
      });
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async login(req, res) {
    try {
      const { value, error } = userServices.validateLogin(req.body);
      if (error) {
        return res.status(400).json(error.message);
      }
      const user = await User.findOne({ email: value.email });
      if (!user) {
        return res.status(400).json({ err: "Email not found" });
      }
      const authorized = userServices.comparePassword(
        value.password,
        user.password
      );
      if (authorized) {
        const token = jwt.issue({ id: user._id }, "1d");
        return res.json(token);
      } else {
        return res.status(400).json({ err: "Password Incorrect" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async authenticate(req, res) {
    return res.json(req.user);
  },
};
