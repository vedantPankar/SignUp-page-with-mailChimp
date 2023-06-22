const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;

    const data  = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/83b3b33215";

    const options = {
        method: "POST",
        auth:"vedant:7d39f6cd1bfc6a2724861d3f6c79c9a4-us21"
    }

    

    const request = https.request(url, options, function(response){
        if (response.statusCose === 200) {
            res.send("success");
        }
        else{
            res.send("Error")
        }
        response.on('data', function(data){
            console.log(JSON.parse(data));
        });
    })

    request.write(jsonData);
    request.end() 
});

app.listen(3000);

// Audience ID - 83b3b33215

// API key - 7d39f6cd1bfc6a2724861d3f6c79c9a4-us21