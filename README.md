A simple buzzer router

### Configuration:

Add these items to your environment, or create a file in the root of this directory called `.env`:

```
TWILIO_ACCOUNT_SID=xxxxxx
TWILIO_AUTH_TOKEN=xxxxx
OWNER_NUMBERS=4163213211,4161231234
PORT=3000
```

### Run the server

`PORT` defaults to 3000.

`node server.js`
