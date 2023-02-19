import express from 'express'
import https from 'https'
import bodyParser from 'body-parser'
import path from 'path';
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
const __dirname=path.resolve();

app.get("/",function(req,res)
{
    res.sendFile(path.join(__dirname,"/index.html"))
})
app.post("/",function(req,res){
var city=req.body.cityName;
console.log(city);

///////////////////////////
  //  const city="london"
const lang="en"
const unit="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&lang="+lang+"&unit="+"&APPID=adcbfd3e24f5df48b6a41d0a8ad45bd0";
https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
       // console.log(data);
        //to convert in javascript object we use JSON
    const weatherData=JSON.parse(data)
    const temp=weatherData.main.temp
    const desc=weatherData.weather[0].description
    const icon=weatherData.weather[0].icon
    const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
   //console.log(weatherData);
    //console.log(temp+" "+desc);
    res.write("<p>The weather in "+city+" is "+desc+" !</p>")
    res.write("<h1>The temp is "+temp+" degrees !</h1>")
    res.write("<img src="+imgUrl+">");
    res.send();
    })
})
})



app.listen(3000,function(){
    console.log("Server running on port 3000");
})