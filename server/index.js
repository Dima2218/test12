require('dotenv').config()
const sequelize = require('./db')
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const models = require('./models/model')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors());
app.use(express.json())
app.use('/api',router)


const start = async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync({ alter: true });
        app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()