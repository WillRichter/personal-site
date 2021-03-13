const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var transporter = nodemailer.createTransport({
    host: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

app.get("/", (req,res) => {
    res.sendFile(__dirname + ("/index.html"));
});

app.post("/contact-me", (req, res) => {
    const subject = req.body.subject;
    const content = req.body.content;

    var mailOptions = {
        from: process.env.FROM,
        to: process.env.TO,
        subject: subject,
        text: content
    };


    transporter.sendMail(mailOptions, (err, info) => {
        if(!err){
            console.log("Email sent");
            res.sendFile(__dirname + "/index.html");
        } else {
            console.log(err);
        }
    });
});


app.listen(process.env.PORT, () => {
    console.log("Server started on port 4000");
});