import express from 'express'
import { allLeaves, updateLeaveStatus } from '../Controller/leave.js'

const router = express.Router()

router.route('/')
    .put(updateLeaveStatus)

router.route('/all')
    .get(allLeaves)
export default router