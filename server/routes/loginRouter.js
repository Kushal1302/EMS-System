import express from 'express'
import { Login } from '../Controller/login.js'

const router = express.Router()

router.route('/')
    .post(Login)

export default router
