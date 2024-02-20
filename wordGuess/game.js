const words = require('./words');
const compare = require('./compare');

const gameStatistics = {};

const game = {
    gameStatistics,

    endGame: function (username) {
        delete gameStatistics[username];
    },

    isUserPlaying: function (username) {
        if (gameStatistics[username]) {
            return true
        }
        return false
    },

    startNewGame: function (username) {
        var randomIndex = Math.floor(Math.random() * words.length);
        var secret = words[randomIndex];
        gameStatistics[username] = {
            "secret": secret,
            "guessedList": [],
            "status": "No guess so far..",
            "validGuess": 0,
            "previousGuess": {
                "previousWord": "No guess so far..", "previousStatus": "No guess so far..", "previousMatch": 0
            }
        }

        console.log("Username - ", username);
        console.log("secret - ", gameStatistics[username].secret);
    },

    checkForValidGuess(username, guess) {
        const isPreviouslyGuessed = gameStatistics[username].guessedList.some(arr => arr.includes(guess)) ? true : false;
        const isPresentInWordlist = words.includes(guess) ? true : false;
        const match = compare(gameStatistics[username].secret, guess);


        if (gameStatistics[username].secret.toLowerCase() === guess) {
            gameStatistics[username].validGuess += 1
            gameStatistics[username].status = "Hurray! You Won"
            gameStatistics[username].previousGuess.previousWord = guess;
            gameStatistics[username].previousGuess.previousStatus = "Hurray! You Won";
            gameStatistics[username].previousGuess.previousMatch = match;
        }
        else if (!isPresentInWordlist || isPreviouslyGuessed) {
            gameStatistics[username].previousGuess.previousWord = guess;
            gameStatistics[username].previousGuess.previousStatus = "invalid";
            gameStatistics[username].previousGuess.previousMatch = "None";
            gameStatistics[username].status = "invalid"
        }
        else if (isPresentInWordlist && !isPreviouslyGuessed) {
            if (match === guess.length) {
                gameStatistics[username].validGuess += 1
                gameStatistics[username].guessedList.push([guess, match]);
                gameStatistics[username].previousGuess.previousWord = guess;
                gameStatistics[username].previousGuess.previousStatus = "incorrect";
                gameStatistics[username].previousGuess.previousMatch = match;
                gameStatistics[username].status = "incorrect"
            }
            else{
                gameStatistics[username].validGuess += 1
                gameStatistics[username].guessedList.push([guess, match]);
                gameStatistics[username].previousGuess.previousWord = guess;
                gameStatistics[username].previousGuess.previousStatus = "valid";
                gameStatistics[username].previousGuess.previousMatch = match;
                gameStatistics[username].status = "valid"
            }
        }
    }
};

module.exports = game;