const Credential = require("../../models/credentials");
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { Op } = require("sequelize");

module.exports.store = async (req, res) => {
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
    }

    // const existingCredential = await Credential.findOne({ where: { username, email } });

    // if (existingCredential) {
    //     return res.status(400).json({
    //         msg: 'User already exists',
    //     });
    // }

    const existingCredential = await Credential.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    });

    if (existingCredential) {
      let errorMessage = "";
      if (existingCredential.username === username) {
        errorMessage += "Username already exists. ";
      }
      if (existingCredential.email === email) {
        errorMessage += "Email already exists.";
      }

      return res.status(400).json({
        msg: errorMessage,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user credential
    const newCredential = await Credential.create({
      username,
      email,
      password:hashedPassword,
    });

    return res.status(201).json({
      msg: "User inserted successfully!",
      data: newCredential,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
