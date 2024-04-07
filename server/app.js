import express from 'express'
import 'dotenv/config'
const app = express()
import adminRouter from './routes/adminRouter.js'

const PORT = process.env.PORT || 3000


app.use('/admin' , adminRouter)

app.listen(PORT , () => console.log("Listening at port No.",PORT))
