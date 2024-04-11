import express from 'express'
import 'dotenv/config'
const app = express()
import adminRouter from './routes/adminRouter.js'
import employeeRouter from './routes/employeeRouter.js'
import loginRouter from './routes/loginRouter.js'
import leaveRouter from './routes/leaveRouter.js'
import cors from 'cors'
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000


app.use('/admin' , adminRouter)
app.use('/employee' , employeeRouter)
app.use('/login' , loginRouter)
app.use('/leave' , leaveRouter )

app.get('/' , (req ,res) => {
    return res.send("EMS Server is live")
})

app.listen(PORT , () => console.log("Listening at port No.",PORT))
