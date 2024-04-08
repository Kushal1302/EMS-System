import prisma from "../db/db.js"

export const addEmployee = async (req , res) => {
    try {
        const employeeDetail = req.body
        const data = await prisma.user.create({
            data:{
                email:employeeDetail.email,
                password:employeeDetail.password,
                role:employeeDetail.role,
                employee:{
                    create:{
                            name:employeeDetail.name,
                            age:employeeDetail.age,
                            dob:employeeDetail.dob
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
        const data = await prisma.employee.findMany()
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