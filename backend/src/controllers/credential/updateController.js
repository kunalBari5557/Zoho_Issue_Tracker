const Credential = require("../../models/credentials");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

module.exports.update = async (req, res) => {
  try {
    // Get input data
    const { username, email, password } = req.body;

    // Validation
    const schema = Joi.object({
      username: Joi.string().required().trim(),
      email: Joi.string().required().email().trim(),
      password: Joi.string().required().trim().min(6),
    });

    const { error } = schema.validate({ username, email, password });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    } else {
      const existingUser = await Credential.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!existingUser) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      const userName = await Credential.findAll({
        where: {
          username: username,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });

      if (userName.length > 0) {
        return res.status(404).json({
          msg: "Username already exists",
        });
      }

      const userEmail = await Credential.findAll({
        where: {
          email: email,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });

      if (userEmail.length > 0) {
        return res.status(404).json({
          msg: "Email already exists",
        });
      }

      let users = await Credential.findOne({
        where: {
          id: req.params.id,
          // employer_id: req.employer_id
        },
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      const posts = await Credential.update(
        {
          username: username,
          email: email,
          password: hashedPassword,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        msg: "User updated successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
