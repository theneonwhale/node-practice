const express = require('express')
const router = express.Router()
// const validate = require('./validation')
const userController = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')
const { validateUploadAvatar } = require('./validation')
const { createAccountLimiter } = require('../../../helpers/rate-limit-reg')
router.post('/registration', createAccountLimiter, userController.reg)
router.post('/login', userController.login)
router.post('/logout', guard, userController.logout)
router.patch(
  '/avatars',
  [guard, upload.single('avatar'), validateUploadAvatar],
  userController.avatars,
)
module.exports = router
