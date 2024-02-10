const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    let token = req.headers["token"];

    if (!token) {
        return res.status(403).send({ msg: "No token provided!" });
    }

    jwt.verify(token, process.env.JWT_ADMIN_SECRET, (err, admin) => {
        if (err) {
            return res.status(401).send({ msg: "Invalid Token !" });
        }
        req.admin_id = admin.admin.id;
        req.admin_name = admin.admin.name;

        next();
    });

};

module.exports = auth;