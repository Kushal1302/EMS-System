import jwt from 'jsonwebtoken'
export const authorize = async (req , res , next) => {
    try {
        const token = (req.headers.authorization).split(" ")[1]
        const user = jwt.verify(token , "secret_key")
        if(user.role !== "admin"){
            return res.json({
                message:"You are not authorize to view"
            })
        }
        next()
    } catch (error) {
        return res.json({
            message:error.message
        })
    }
}