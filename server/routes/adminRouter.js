import express from 'express'
import { addAdmin, getAdmin } from '../Controller/user.js'

const router = express.Router()


router.route('/')
    .post(addAdmin)
    .get(getAdmin)

export default router
