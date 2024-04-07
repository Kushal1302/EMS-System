import prisma from "../db/db.js"

export const addAdmin = async (req , res) =>{
    const data = req.body
    try {
        const data = await prisma.user.create({
            data:{

            }
        })
        return res.json({
            message:"Data Added"
        })
    } catch (error) {
        return res.json({
            message:"Something Went Wrong on server"
        })
    }
}
export const getAdmin = async (req , res) =>{
    try {
        const data = await prisma.user.findUnique({
            where:{
                id:"6612b904638cfc21f835a5ef"
            }
        })
        return res.json({
            message:"Data Send",
            data:data
        })
    } catch (error) {
        return res.json({
            message:error.message
        })
    }
}