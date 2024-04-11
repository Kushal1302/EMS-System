import prisma from "../db/db.js"
import bcrypt from 'bcrypt'
const salt = 10
export const addEmployee = async (req , res) => {
    try {
        const employeeDetail = req.body
        const hashedPassword = await bcrypt.hash(employeeDetail.password , salt)
        const data = await prisma.user.create({
            data:{
                email:employeeDetail.email,
                password:hashedPassword,
                role:employeeDetail.role,
                employee:{
                    create:{
                            name:employeeDetail.name,
                            age:employeeDetail.age,
                            dob:employeeDetail.dob,
                            department:employeeDetail.department,
                            salary:employeeDetail.salary
                    }
                }
            }
        })
        return res.json({
            message:"Data Added"
        })
    } catch (error) {
        return res.json({
            message:error.message
        })
    }
}
export const AllEmployee = async  (req , res) => {
    try {
        const data = await prisma.employee.findMany({
            orderBy:{
                createdAt:'desc'
            }
        })
        return res.json({
            data:data
        })
    } catch (error) {
        return res.json({
            message:error.message
        })
    }
}
export const deleteEmployee = async (req , res) => {
    try {
        const {empId} = req.query
        const data = await prisma.employee.delete({
            where:{
                id:empId
            }
        })
        return res.json({
            message:"Employee Deleted"
        })
    } catch (error) {
        console.log(error.message)
    }
}