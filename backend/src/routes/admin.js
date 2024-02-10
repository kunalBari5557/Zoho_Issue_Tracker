const express = require('express');
const authMiddleware = require('../middleware/admin_auth.js');
const loginController = require('../controllers/admin/loginController.js');

const addRoleController = require('../controllers/role/addController.js');
const indexRoleController = require('../controllers/role/indexController.js');
const updateRoleController = require('../controllers/role/updateController.js');
const deleteRoleController = require('../controllers/role/deleteController.js');

const addUserController = require('../controllers/user/addController.js');
const indexUserController = require('../controllers/user/indexController.js');
const updateUserController = require('../controllers/user/updateController.js');
const deleteUserController = require('../controllers/user/deleteController.js');

const addCredentialController = require('../controllers/credential/addController.js');
const updateCredentialController = require('../controllers/credential/updateController.js');
const indexCredentialController = require('../controllers/credential/indexController.js');
const deleteCredentialController = require('../controllers/credential/deleteController.js');

const addIssueController = require('../controllers/issueTracker/addController.js');
const indexIssueController = require('../controllers/issueTracker/indexController.js');
const updateIssueController = require('../controllers/issueTracker/updateController.js');
const deleteIssueController = require('../controllers/issueTracker/deleteController.js');

const addProjectController = require('../controllers/projects/addController.js');
const indexProjectController = require('../controllers/projects/indexController.js');
const updateProjectController = require('../controllers/projects/updateController.js');
const deleteProjectController = require('../controllers/projects/deleteController.js');

const router = express.Router();

router.post('/login', loginController.authentication);
// Role Route

router.post('/roles/add', authMiddleware,addRoleController.store);
router.get('/roles/list', authMiddleware,indexRoleController.index);
router.get('/roles/edit/:id', authMiddleware,indexRoleController.edit);
router.put('/roles/update/:id', authMiddleware,updateRoleController.update);
router.delete('/roles/delete/:id', authMiddleware,deleteRoleController.destroy);

//User Route
router.post('/users/add', authMiddleware,addUserController.store);
router.get('/users/list', authMiddleware,indexUserController.index);
router.get('/users/edit/:id', authMiddleware,indexUserController.edit);
router.put('/users/update/:id', authMiddleware,updateUserController.update);
router.delete('/users/delete/:id', authMiddleware,deleteUserController.destroy);

//Credential Route
router.post('/credentials/add', authMiddleware,addCredentialController.store);
router.put('/credentials/update/:id', authMiddleware,updateCredentialController.update);
router.get('/credentials/list', authMiddleware,indexCredentialController.index);
router.delete('/credentials/delete/:id', authMiddleware,deleteCredentialController.destroy);

//issue Tracker Route
router.post('/issues/add', authMiddleware,addIssueController.store);
router.get('/issues/list', authMiddleware,indexIssueController.getAllIssues);
router.get('/issues/list/:id', authMiddleware,indexIssueController.getIssueById);
router.put('/issues/update/:id', authMiddleware,updateIssueController.update);
router.delete('/issues/delete/:id', authMiddleware,deleteIssueController.destroy);

//project Route
router.post('/projects/add', authMiddleware,addProjectController.store);
router.get('/projects/list', authMiddleware,indexProjectController.index);
router.get('/projects/edit/:id', authMiddleware,indexProjectController.edit);
router.put('/projects/update/:id', authMiddleware,updateProjectController.update);
router.delete('/projects/delete/:id', authMiddleware,deleteProjectController.destroy);

module.exports = router;