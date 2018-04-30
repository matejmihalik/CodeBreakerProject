let answerField = document.getElementById('answer');
let attemptField = document.getElementById('attempt');

function guess() {
    let inputField = document.getElementById('user-guess');

    if(!answer.value && !attempt.value) {
        setHiddenFields();
    }

    if(!validateInput(inputField.value)) {
        return false;
    }

    attemptField.value++;

    if(getResults(inputField.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    }
    else if(attemptField.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    }
    else {
        setMessage('Incorrect, try again.');
    }
}

function setHiddenFields() {
    let answer = Math.floor(Math.random() * 10000);

    answerField.value = answer.toString().padStart(4, 0);
    attemptField.value = 0;
}

function setMessage(message) {
    let messageField = document.getElementById('message');
    messageField.innerHTML = message;
}

function validateInput(input) {
    if(input.length === 4) {
        return true;
    }

    setMessage('Guesses must be exactly 4 characters long.');
    return false;
}

function getResults(input) {
    let resultsField = document.getElementById('results');

    let row = document.createElement('div');
    row.className = 'row';

    let guess = document.createElement('div');
    guess.className = 'col-md-6';
    let guessContent = document.createTextNode(input);
    guess.appendChild(guessContent);

    let result = document.createElement('div');
    result.className = 'col-md-6';

    let correct = 0;
    let answer = answerField.value;
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        let className = 'glyphicon glyphicon-remove';
        if(char === answer[i]) {
            className = 'glyphicon glyphicon-ok';
            correct++;
        }
        else if(answer.indexOf(char) !== -1) {
            className = 'glyphicon glyphicon-transfer';
        }

        let icon = document.createElement('span');
        icon.className = className;
        result.appendChild(icon);
    }

    row.appendChild(guess);
    row.appendChild(result);
    resultsField.appendChild(row);

    return correct === input.length;
}

function showAnswer(won) {
    let codeField = document.getElementById('code');
    codeField.innerHTML = answerField.value;

    let className = ' failure';
    if(won) {
        className = ' success';
    }
    codeField.className += className;
}

function showReplay() {
    let guessingEl = document.getElementById('guessing-div');
    let replayEl = document.getElementById('replay-div');

    guessingEl.style.display = 'none';
    replayEl.style.display = 'block';
}
