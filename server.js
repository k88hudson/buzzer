const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const env = require("node-env-file");
const twilio = require("twilio");

env(path.join(__dirname, ".env"), {raise: false});

if (!process.env.OWNER_NUMBERS || !process.env.TWILIO_AUTH_TOKEN) {
  console.error(`You must configure this app with the following variables:

  OWNER_NUMBERS
  TWILIO_AUTH_TOKEN

Please look at README.md for more info.
`);
  throw new Error("E_MISSING_REQUIRED_ENV");
}

const OWNER_NUMBERS = process.env.OWNER_NUMBERS.split(",");
const app = express();

console.log(OWNER_NUMBERS);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function (req, res) {
  res.send("Hello, traveller");
});

app.post("/result", twilio.webhook(), function (req, res) {
  console.log(req.body);
  res.send('ok');
});

app.post("/buzzer-voice", twilio.webhook(), function (req, res) {
  console.log('received message');
  const twiml = new twilio.TwimlResponse();
  twiml.dial({action: "/result"}, function () {
    OWNER_NUMBERS.forEach(n => this.number(n));
  });
  res.send(twiml);
});

app.get("/buzzer-voice-auto", twilio.webhook(), function (req, res) {
  const twiml = new twilio.TwimlResponse();
  twiml.play({loop: 2, digits: "www9"});
  res.send(twiml);
});

app.post("/buzzer", twilio.webhook(), function (req, res) {
  const twiml = new twilio.TwimlResponse();
  twiml.message("We are working on it!");
  res.send(twiml);
});

app.listen(process.env.PORT || 3000, function () {
  console.log("App started");
});
