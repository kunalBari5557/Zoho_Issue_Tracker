const User = require('../../models/users.js');
const multer = require('multer');
const path = require('path');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Op = sequelize.Op


module.exports.update = async(req, res) => {
    let fileSuffix = Date.now().toString()

    // const upload = multer({
    //     storage: multerS3({
    //         s3: s3,
    //         bucket: process.env.BUCKET,
    //         contentType: multerS3.AUTO_CONTENT_TYPE,

    //         key: function(req, file, cb) {

    //             cb(null, `${fileSuffix}-${file.originalname}`);
    //         },
    //     })

    // }).single('post_image');

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '../../public/image'));
          
        },
        filename: function (req, file, cb) {
          cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        }
      });
      
      const upload = multer({ storage: storage }).single('image');

    upload(req, res, async function(err, file, cb) {

        if (err) {
            // fs.unlinkSync(req.file.path);
        } else {

            var firstName = req.body.firstName;
            var lastName = req.body.lastName;
            var email = req.body.email;
            var phone_no = req.body.phone_no;

            const schema = Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                phone_no: Joi.string().max(15).required(),
            });
    
            const result = schema.validate({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone_no: phone_no,
            });

            if (result.error) {

                return res.status(400).json({
                    'msg': result.error.details[0].message
                });


            } 
            else {

                const userEmail = await User.findAll({
                    where: {
                        email: email,
                        id: {
                            [Op.ne]: req.params.id
                        }
                    }
                });
    
                if (userEmail.length > 0) {
    
                    return res.status(404).json({
                        'msg': 'Email already exists',
                        'payload': []
                    })
                }
    
                const userPhone = await User.findAll({
                    where: {
                        phone_no: phone_no,
                        id: {
                            [Op.ne]: req.params.id
                        }
                    }
                });
    
                if (userPhone.length > 0) {
    
                    return res.status(404).json({
                        'msg': 'Mobile Number already exists',
                        'payload': []
                    })
                }

                let users = await User.findOne({
                    where: {
                        id: req.params.id,
                        // employer_id: req.employer_id
                    }
                });


                let image = req.file ? `${fileSuffix}-${req.file.originalname}` : users.dataValues.image;

                const posts = await User.update({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone_no: phone_no,
                image:image,
                }, {
                    where: {
                        id: req.params.id
                    },

                })

                return res.status(200).json({
                    'msg': 'User updated successfully!',
                });
            }

        }
    })



}