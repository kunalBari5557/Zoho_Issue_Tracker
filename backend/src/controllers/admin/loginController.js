const Admin = require('../../models/admin');
const User = require('../../models/users');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

module.exports.authentication = async(req, res) => {
    // get input data
    var email = req.body.email;
    var password = req.body.password;

    // validation
    const schema = Joi.object({
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().trim().min(6),
    });

    const result = schema.validate({
        email: email,
        password: password,
    });

    if (result.error) {
        return res.status(400).json({
            'message': result.error.details[0].message
        })
    } else {
        var admin = await Admin.findOne({
            where: {
                email: email
            }
        });

        var user = await User.findOne({
            where: {
                email: email
            }
        });
        if (admin) {
            var password_valid = await bcrypt.compare(password, admin.password);
            if (password_valid) {
                var admin = {
                    'id': admin.id,
                    'name': admin.name
                }

                // Generate Token
                const token = jwt.sign({
                    admin
                }, process.env.JWT_ADMIN_SECRET, {
                    expiresIn: process.env.JWT_ADMIN_TOKENLIFE
                });

                return res.status(200).json({
                    "message": 'Success',
                    "type": 'Admin',
                    "paylode": {
                        "token": token
                    }
                })
            } else {
                return res.status(401).json({
                    "message": "Invalid Credentials",
                })
            }
        } else if (user) {
            var password_valid = await bcrypt.compare(password, user.password);
            if (password_valid) {
                var user = {
                    'id': user.id,
                    'name': user.name
                }

                // Generate Token
                const token = jwt.sign({
                    user
                }, process.env.JWT_ADMIN_SECRET, {
                    expiresIn: process.env.JWT_ADMIN_TOKENLIFE
                });

                return res.status(200).json({
                    "message": 'Success',
                    "type": 'User',
                    "paylode": {
                        "token": token
                    }
                })
            } else {
                return res.status(401).json({
                    "message": "Invalid Credentials",
                })
            }
        } else {
            return res.status(401).json({
                "message": "Invalid Credentials",
            })
        }
    }
}