import express from 'express'
import { AllEmployee, addEmployee, deleteEmployee } from '../Controller/employee.js'
import { authorize } from '../middleware/authorize.js'

const router = express.Router()

router.route('/')
    .post(addEmployee)
    .delete(deleteEmployee)

router.route('/all')
    .get(authorize,AllEmployee)
export default router