require('dotenv').config();

const express = require('express');
const path = require('path');
const axios = require('axios');
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = express();
const httpApp = express();

const httpPort = 80;
const httpsPort = 443;

const httpsOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/aminarji.me/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/aminarji.me/fullchain.pem")
};

httpApp.set('port', httpPort);
httpApp.get("*", function (req, res, next) {
    res.redirect("https://" + req.headers.host + "/" + req.path);
});

app.set('port', httpsPort);
app.enable('trust proxy');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log('A user connected.');
});

app.post('/', (req, res) => {
    const { Name, Email, Subject, Message } = req.body;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(Email)) {
        res.status(400).send('Invalid email address');
        return;
    }

    const maxSubjectLength = 100;
    const maxMessageLength = 1900;

    if (Subject.length > maxSubjectLength || Message.length > maxMessageLength) {
        res.status(400).send(`Subject and message length must be less than ${maxSubjectLength} and ${maxMessageLength} characters, respectively`);
        return;
    }

    const payload = {
        content: `**${Name}**\n**${Email}**\n\nObject | **${Subject}**\n**Message**\n${Message}`,
    };

    axios.post(`https://discord.com/api/webhooks/1122987446183931954/${process.env.WEBHOOK_TOKEN}`, payload)
        .then(() => {
            console.log(`Message from ${Name} was sent successfully :)`);
            res.redirect('/');
        })
        .catch((error) => {
            console.error('An error occurred:', error);
            res.status(500).send('Internal server error');
        });
});

app.use((req, res) => {
    res.redirect('/');
});

http.createServer(httpApp).listen(httpApp.get('port'), function () {
    console.log('Express HTTP server listening on port ' + httpApp.get('port'));
});

https.createServer(httpsOptions, app).listen(app.get('port'), function () {
    console.log('Express HTTPS server listening on port ' + app.get('port'));
});