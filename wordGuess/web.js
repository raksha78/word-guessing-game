const words = require('./words');
const gameStatistics = require('./game').gameStatistics;

const web = {
    login: function () {
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>User Login</title>
                    <link rel="stylesheet" href="styles.css" />
                </head>
                <body>
                <div class="main-container">
                    <h1 class="main-container__title">Get ready for - Word Whiz Bash!</h1>
                    <div class="main-container__form">
                        <h2 class="form__title">User Login </h2>
                        <form action="/login" method="POST">
                        <label class="form__field">
                            <span class="form__label"> Username: </span>
                            <input class="form__label" type="text" id="username" name="username" required>
                        </label>
                        <button class="form__button" type="submit"> Login </button> 
                    </form>
                    </div>
                </div>
            </body>
            </html>
        `
    },

    dashboard: function (username) {
        const guessList = gameStatistics[username].guessedList.map(arr => arr[0]);
        const availableList = words.filter(item => !guessList.includes(item));
        const currentStatus = gameStatistics[username].previousGuess.previousStatus;
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>User Dashboard</title>
                    <link rel="stylesheet" href="styles.css" />
                </head>
                <body class="dashboard">
                    <div class="header">
                        <h1><span class="header__letter">W</span>
                            <span class="header__letter">O</span>
                            <span class="header__letter">R</span>
                            <span class="header__letter">D</span>
                            <span class="header__gap"> </span>
                            <span class="header__letter">W</span>
                            <span class="header__letter">H</span>
                            <span class="header__letter">I</span>
                            <span class="header__letter">Z</span>
                            <span class="header__gap"> </span>
                            <span class="header__letter">B</span>
                            <span class="header__letter">A</span>
                            <span class="header__letter">S</span>
                            <span class="header__letter">H</span>
                        </h1>
                    </div>
                    <div class="title">
                        <h2 class="title__text"> Hello, ${username}! </h2>
                        <span class="title__sub-text"> Unleash your vocabulary prowess and solve the mystery one word at a time. Are you up for the challenge? </span>
                    </div>
                    <form class="guess-form" action="/guess" method="POST">
                        <label class="guess-form__label">
                            <span class="guess-form__span">Enter a word: </span>
                            <input class="guess-form__input"type="text" id="guess" name="guess" required>
                        </label>
                        <button class="guess-form__button" type="submit">Make a guess</button>
                    </form>
                    <div class="game-statistics">
                        <span class="game-statistics__title"> Time to spill the beans! </span>
                        <div class="game-statistics__container"> 
                            <div class="guess-count">
                                <h3 class="container__title">Valid Guess so far </h3>
                                <span class="container__value">${gameStatistics[username].validGuess}</span>
                            </div>
                            <div class="status">
                                <h3 class="container__title">Your guess has been deemed: </h3>
                                <span class="container__value"> ${currentStatus} </span>
                            </div>
                            <div class="previous-guess">
                                <h3 class="container__title">Latest Guess: </h3>
                                <span class="container__value"> ${gameStatistics[username].previousGuess.previousWord} </span>
                            </div>
                            <div class="previous-match">
                                <h3 class="container__title">Match count: </h3>
                                <span class="container__value"> ${gameStatistics[username].previousGuess.previousMatch} </span>
                            </div>
                        </div>
                    </div>
                    <div class="words-container">
                        <div class="available-list">
                            <h3 class="available-list__title">Available Words</h3>
                            <div class="available-list__container">${availableList.map(item => `<span class="available-list__words">${item}</span>`).join(' ')}</div>
                        </div>
                        <div class="guess-list">
                            <h3 class="guess-list__title">Already Guessed Words with matching count </h3>
                            <div class="guess-list__container">${gameStatistics[username].guessedList.map(arr => `<div class="guess-list__words"><span> ${arr[0]} </span><span class="guess-list__count"> ${arr[1]} </span></div>`).join(' ')}</div>
                        </div>
                    </div>
                    <div class="action-container">
                        <form class="newgame-form" action="/new-game" method="POST">
                            <button class="newgame-form__button" type="submit"> Start new game </button>
                        </form>
                        <form class="logout-form" action="/logout" method="POST">
                            <button class="logout-form__button" type="submit"> Logout </button>
                        </form>
                    </div>
                </body>
                </html>
        `
    },

    invalidUsernameAlert: function (username) {
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>User Login</title>
                    <link rel="stylesheet" href="styles.css" />
                </head>
                <body>
                    <div class="container">
                        <div class="alert">
                            <span class="alert-text"> ${username} is an Invalid Username. Please log in again! </span>
                        </div>
                        <div class="login-link">
                            <a href="/" >Take me to Login Page </a>
                        </div>
                    </div>
                </body>
                </html>
        `
    },

    invalidSidAlert: function () {
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>User Login</title>
                    <link rel="stylesheet" href="styles.css" />
                </head>
                <body>
                    <div class="container">
                        <div class="alert">
                            <span class="alert-text"> Seems like in invalid session. Please log in again! </span>
                        </div>
                        <div class="login-link">
                            <a href="/" >Take me to Login Page </a>
                        </div>
                    </div>
                </body>
                </html>
        `
    }
}

module.exports = web;