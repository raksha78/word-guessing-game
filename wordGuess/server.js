const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

const web = require('./web');
const auth = require('./sessions');
const game = require('./game');


app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.clearCookie('sid');
        res.send(web.login());
    }
    else if( sid && !auth.checkValidSid(sid)){
        res.clearCookie('sid');
        res.status(401);
        res.send(web.invalidSidAlert());
    }
    else {
        const username = auth.getUsernameFromSid(sid);
        if (username && auth.validateSession(sid, username)) {
            // Check if you need to start new game.
            if (!game.isUserPlaying(username)) {
                game.startNewGame(username);
            }
            res.send(web.dashboard(username));
        }
        else {
            res.status(401);
            res.send(web.invalidSidAlert());
        }
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username;

    if (auth.validateUsername(username)) {
        const assignedSid = auth.createUserSession(username);
        res.cookie('sid', assignedSid);
        res.redirect('/');
    }
    else {
        res.status(401);
        res.send(web.invalidUsernameAlert(username));
    }
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    auth.removeSession(sid);
    res.clearCookie('sid');
    res.redirect('/');
});

app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;
    if (auth.checkValidSid(sid)) {
        const username = auth.getUsernameFromSid(sid);
        game.endGame(username);
        res.redirect('/');
    }
    else {
        res.status(401);
        res.send(web.invalidSidAlert());
    }
});

app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    if (auth.checkValidSid(sid)) {
        const username = auth.getUsernameFromSid(sid);
        const guess = req.body.guess.toLowerCase();

        game.checkForValidGuess(username, guess);

        res.redirect('/');
    }
    else {
        res.status(401);
        res.send(web.invalidSidAlert());
    }
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));