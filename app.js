const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https= require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+ "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastname =  req.body.lName;
    var email = req.body.email;

    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastname
                }
            }
        ]
    };

   const jsonData = JSON.stringify(data);
  
   const url= "https://us7.api.mailchimp.com/3.0/lists/dc4565de7c"

   const options ={
       method:"POST",
       auth:"asif:17f026e2edef61851ecba9b950e25cef-us7"
   }

  const request = https.request(url, options, function (response){
       response.on("data", function(data){
           console.log(JSON.parse(data));
           window.location.href="http://localhost:3000/";

       })

   } )

request.write(jsonData);
request.end();

});


app.listen(3002,function(){
    console.log("server is running on port 5000");
});



