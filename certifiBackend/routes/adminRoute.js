import express from 'express'
const router = express.Router()

const AdminController = require('../controllers/admin')

router.post('/createAdmin', AdminController.createAdmin)
router.post('/login', AdminController.adminLogin)
router.post('/registerIns', AdminController.registerInstitute)
router.get('/getadmin', AdminController.getAdmin)
router.get('/getallins', AdminController.getAllInstitutes)

module.exports = router