import prisma from "../db/db.js"

export const allLeaves = async (req , res) => {
    try {
       const data = await prisma.leaves.findMany({
        orderBy:{
            createdAt:'desc'
        },
        include:{
            employee:{
                select:{
                    name:true
                }
            }
        }
       })
       return res.json({
        data
       })
    } catch (error) {
        res.json({
            message:"Something went wrong on server"
        })
    }
}
export const updateLeaveStatus = async (req , res) => {
    try {
        const {id} = req.query
        const {status} = req.body
        const update = await prisma.leaves.update({
            where:{
                id
            },
            data:{
                status:status
            }
        })
        return res.json({
            message:"Leave Status updated"
        })
    } catch (error) {
        console.log(error.message)
        return res.json({
            message:error.message
        })
    }
}