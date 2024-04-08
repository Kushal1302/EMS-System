import express from 'express'
import { AllEmployee, addEmployee, deleteEmployee } from '../Controller/employee.js'

const router = express.Router()

router.route('/')
    .post(addEmployee)
    .delete(deleteEmployee)

router.route('/all')
    .get(AllEmployee)
export default router