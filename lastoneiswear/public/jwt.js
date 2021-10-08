import express from 'express';
import { sign, verify } from 'jsonwebtoken';
var app     = express();

app.get('/', function(req, res) {
    res.send("Welcome to the Bank");
})

app.get('/token', function (req, res) {
    var token = sign({username}, 'secret', {expiresIn: 24*60*60*1000});
    res.send(token)
})

app.get('/api', function(req, res) {
    var token = req.query.token;
    verify(token, 'secret', function(err, decoded) {
        if (!err) {
            var secrets = {"email" : email, "balance" : balance};
            res.json(secrets);
        } else {
            res.send(err);
        }
    })
})

app.listen('3000');