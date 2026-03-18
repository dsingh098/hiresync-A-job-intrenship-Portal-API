import express from "express"
import 'dotenv/config'
import authRoutes from "./src/routes/auth.routes.js"
import connectDB from "./src/config/db.js"
import cookieParser from "cookie-parser"
import jobRoute from "./src/routes/job.routes.js"
import internshipRoute from "./src/routes/internship.routes.js"
import applicationRoute from "./src/routes/application.routes.js"


const port = process.env.PORT || 5000

const app = express()
app.use(cookieParser())

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/job", jobRoute)
app.use("/api/internship", internshipRoute)
app.use("/api/applications", applicationRoute)

app.get("/", (req, res) => res.send("HireSync API Running"));

app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`)
})
