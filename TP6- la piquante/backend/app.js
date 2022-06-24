const express = require("express")
const app = express()



app.use((req,res,next)=>{

res.status(404);
next()




})

app.use((req,res,next)=>{


    console.log("c'etais une blaque")

next()
}
)

app.use((req,res,next)=>{

    res.json({
        message : 'ahahahahahahahha',
         status : 404,
         id : 23435324324324324,
    })
    next()
    
    })

module.exports = app;