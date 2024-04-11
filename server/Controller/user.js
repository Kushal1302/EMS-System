import prisma from "../db/db.js"
import bcrypt from 'bcrypt'
const salt = 10

export const addAdmin = async (req , res) =>{
    const {email,password,role} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password , salt)
        const data = await prisma.user.create({
            data:{
                email:email,
                password:hashedPassword,
                role:role
            }
        })
        return res.json({
            message:"Data Added"
        })
    } catch (error) {
        return res.json({
            message:"Something Went Wrong on server",
            error:error.message
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