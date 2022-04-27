const express = require("express");
const https = require("https");
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");

})

app.post("/", function(req, res){
  console.log("post request recieved");
  const city = req.body.city;
  const unit = "metric";
  const apiKey = "3bea6ad6bbe90385dff03f29da301c09";
  var url = "https://api.openweathermap.org/data/2.5/find?q="+city+"&appid="+apiKey+"&units="+unit;
  //dont forget to add https://api.... at beginning//
  //responce.statusCode//
  // check lecture 244 comments if not clear//
  https.get(url, function(responce){
      console.log(responce.statusCode);
      responce.on("data", function(data){
      const wData = JSON.parse(data);
      //use JSON Pro extension to copy desired json data from browser//
      const weather = wData.list[0].main.temp;
      console.log(wData.list[0].name);
      var iconUrl = "https://openweathermap.org/img/wn/"+wData.list[0].weather[0].icon+"@2x.png";
      res.write("<h1>The Temperature in "+city+" is "+weather+" Degree Celcius</h1>")
      res.write("<h2>Description: "+wData.list[0].weather[0].description+"</h2>")
      res.write("<img src="+iconUrl+"></img>");
      res.write("<style>body{background-color: rgb(81, 103, 179); text-align:center; font-family: Montserrat-Bold, sans-serif; line-height: 1.5; font-weight: 999; color: white; padding-top:100px;}</style>")
      res.send();
    })
  })
})



app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port:3000 and Heroku");
});
