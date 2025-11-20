const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require("body-parser");

dotenv.config({ path: './.env' })

app.use(cors())
app.use(express.json())

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const authRouter = require('./routes/auth')
const instituteRouter = require('./routes/instituteAuth')
const certificateRouter = require('./routes/certificateRoute')
const adminRouter = require('./routes/adminRoute')

app.use('/api/auth', authRouter)
app.use('/api/institute', instituteRouter)
app.use('/api/certificate', certificateRouter)
app.use('/admin', adminRouter)

mongoose.connect(DB).then((con) => {
    // console.log(con.connections)
    console.log('DB connection successful')
}).catch(error => console.log(error));

// Starting the server on port 4001
const port = process.env.PORT || 4001
app.listen(port, () => {
    console.log(`App running on port ${port} ..`)
})
