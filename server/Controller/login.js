import prisma from "../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include:{
        admin:true,
        employee:true
      }
    });
    const matchedPassword = await bcrypt.compare(password , data.password)
    if (matchedPassword) {
      const token = jwt.sign({id:data.id,email:data.email,role:data.role}, "secret_key");
      return res.json({
        token,
        user: {
          email: data.email,
          role: data.role,
          name:(data.role === "admin" ? data.admin.name : data.employee.name )
        },
        data:{
          ...(data.role === "admin" ? data.admin : data.employee )
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
