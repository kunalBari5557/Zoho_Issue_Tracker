const User = require("../../models/users.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const nodemailer = require('nodemailer');

module.exports.store = async (req, res) => {
  let fileSuffix = Date.now().toString();

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, "../../public/image");

      fs.mkdir(uploadDir, { recursive: true }, (err) => {
        if (err) {
          console.error("Error creating upload directory:", err);
          cb(err, null);
        } else {
          cb(null, uploadDir);
        }
      });
    },
    filename: function (req, file, cb) {
      cb(null, `${fileSuffix}-${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage }).single("image");

  upload(req, res, async function (err, file, cb) {
    console.log(req.file);

    var role_id = req.body.role_id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    var phone_no = req.body.phone_no;
    var image = req.file ? `${fileSuffix}-${req.file.originalname}` : "";

    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("Confirm password")
        .options({
          messages: {
            "any.only": "Password and Confirm password did not match! ",
          },
        }),
      phone_no: Joi.string().max(15).required(),
      role_id: Joi.number().required(),
    });

    const result = schema.validate({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      password_confirmation: confirm_password,
      phone_no: phone_no,
      role_id: role_id,
    });
    if (result.error) {
      return res.status(400).json({
        msg: result.error.details[0].message,
      });
    } else {
      if (err) {
        console.log(err);
        // res.status(400).json({
        //     message: "file not uploded"
        // });
      }

      const userEmail = await User.findOne({ where: { email: email } });

      if (userEmail) {
        return res.status(400).json({
          msg: "Email already exist!",
          payload: [],
        });
      }

      const userPhone = await User.findOne({ where: { phone_no: phone_no } });

      if (userPhone) {
        return res.status(400).json({
          msg: "Phone number already exist!",
          payload: [],
        });
      }

      var salt = bcrypt.genSaltSync(8);

      const users = await User.create({
        admin_id: req.admin_id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, salt),
        phone_no: phone_no,
        image: image,
        role_id: role_id,
        status: 1,
      })
      .then(async function (resp) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 465,
          secure: true,
          logger: true,
          debug: true,
          secureConnection: false,
          auth: {
            user: 'demo.ebizzinfotech@gmail.com',
            pass: 'lsec enbg ncgf elkd'
          },
          tls:{
            rejectUnauthorized:true
          }
        });
    
        const mailOptions = {
          from: 'demo.ebizzinfotech@gmail.com',
          to: resp.email, 
          subject: 'Welcome to Your App',
          text: 'Thank you for signing up!',
          html: `<p>Welcome to Your App!</p>
          <p>Your Credential Here..</p>
          <p>Email: ${req.body.email}</p>
          <p>Password: ${req.body.password}</p>`,
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error('Error sending email: ', error);
            return res.status(400).json({
              msg: 'Error sending email. Please try again!',
            });
          } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({
              msg: 'User inserted successfully! Email sent!',
            });
          }
        });
      })
      .catch(function (err) {
        console.error('Error creating user: ', err);
        return res.status(400).json({
          msg: 'Please try again!',
        });
      });
        // .then(function (resp) {
        //   return res.status(200).json({
        //     msg: "User inserted successfully!",
        //   });
        // })
        // .catch(function (err) {
        //   return res.status(400).json({
        //     msg: "Please try again!",
        //   });
        // });
    }
  });
};
