const express=require("express")
const path=require("path")
const request=require("request")
const ipData=require("./ip-json")


const app=express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))


const port=process.env.PORT || 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.get("/",(req,res)=>{
    res.render('home.ejs')
    
})
app.post("/data",(req,res)=>{
    //console.log(req.body.ip)
    const ip=req.body.ip
    ipData(ip,(error,data)=>{
        const ip=data.ip
        const region=data.region
        const country=data.country
        const timezone=data.timezone
        const provider=data.org
        res.render("result",{ip,region,country,timezone,provider})
    })
    
})


app.listen(port,()=>{
    console.log("Server is up on port 3000");
})