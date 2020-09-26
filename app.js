const express = require("express");
const bodyP = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyP.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.Email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }
    const JSONData = JSON.stringify(data);
    const url = "https://us2.api.mailchimp.com/3.0/lists/4ddc0605e5";

    const options = {
        method: "POST",
        auth: "DrewDev:b3769a9070b8519312d61ac46d324219-us2"
    }

    const mail_req = https.request(url, options, function(http_res){

        if ( http_res.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        http_res.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    mail_req.write(JSONData);
    mail_req.end();
    // Logs
    console.log(fName);
    console.log(lName);
    console.log(email);
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});


// API KEY 
// b3769a9070b8519312d61ac46d324219-us2
// Audience ID 
// 4ddc0605e5