# word-guessing-game

This project is a web-based word guessing game where users attempt to guess a secret word. The game is designed to be backend-driven, using only server-generated HTML and no frontend JavaScript.

### Functional Requirements

The game consists of the following functionality:

Users take multiple turns making guesses for a specific secret word
A new game resets the secret word, number of guesses, and list of possible words
Users must make valid guesses from the list of possible words
Invalid guesses are not accepted
Incorrect guesses are valid guesses but not the secret word
Correct guesses are valid guesses that match the secret word
A guess shares all letters with the secret word but is not the secret word, is not considered a correct guess

### Home Page
Upon loading the page (/), users are presented with:

A list of possible words the secret word could be
A list of previously guessed words and their matching letters
The count of valid guesses made so far
Details of the most recent guess and its matching letters
Option to logout
Option to start a new game

### Making a Guess
Users can make a guess by sending a POST request to /guess. The server checks for a valid session ID and valid guess, then updates the server state accordingly.

### Starting a New Game
A new game begins when a user logs in for the first time or starts a new game manually. A secret word is randomly selected from the list of available words.

### The Login Flow
Login is performed via a POST request to /login, sending only the username. If the username is valid, a session ID (sid cookie) is set, and the user is redirected to the Home Page.

### The Logout Flow
Users can logout via a POST request to /logout, clearing the session ID cookie and server session information. The game information is preserved for the user to resume later.