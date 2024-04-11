import prisma from "../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email , password)
    const data = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const matchedPassword = await bcrypt.compare(password , data.password)
    if (!matchedPassword) {
      const token = jwt.sign(data, "secret_key");
      return res.json({
        token,
        user: {
          email: data.email,
          role: data.role,
        },
        message:"Login successfull"
      });
    }
    return res.json({
      message:"Email or password is Wrong"
    });
  } catch (error) {
    return res.json({
      message:"Something went wrong on server"
    });
  }
};
