const express = require('express');
const RoleController = require('../controllers/common/roleController.js');



const router = express.Router();

router.get('/roles', RoleController.role);
// Role Route





module.exports = router;