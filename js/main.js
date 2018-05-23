//hangman from scratch exercise

// Global variables
const createdBy = [ 
    {   name:"Devin",
        url:"https://uthoustoncoding042018.slack.com/team/UA7KTDC2G"
    },
    {
        name:"Olisaemelie",
        url: "https://uthoustoncoding042018.slack.com/team/UA8U1E66T"
    },
    {
        name:"Osman",
        url:"https://uthoustoncoding042018.slack.com/team/UA7SKJVGA"
    },
    {
        name:"Steve",
        url:"https://uthoustoncoding042018.slack.com/team/UA7Q7SMNC"
    },
    {
        name:"Tom",
        url:"https://uthoustoncoding042018.slack.com/team/UA8U1CEBZ"
    }
]

const letterList = [ "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z" ]
var gameInProgress = false; // false if no opponent, true if an opponent has been selected

const gameTitle = "Hangman from Scratch!"
const gameDescription = "This is a traditional Hangman game, created in 2 hours"

resetGame(); // start new game

// Write out game title and description


// List creators in About section
console.log("It took " + createdBy.length + " dudes to make this game!");
for (var i = 0; i < createdBy.length; i++) {
    $( ".list-unstyled" ).append( $( `<li><a href="${createdBy[i].url}" target="_blank" class="text-white">${createdBy[i].name}</a></li>` ) );
}

// Game title and description
$( ".row.title-row").append( $(`<div class="col-md-12"><h1>${gameTitle}</h1></div>`))
$( ".text-white.game-title").append( $(`<h4>${gameTitle}</h4>`))
$( ".text-muted.game-description").append( $(`<p>${gameDescription}</p>`))

// pick a random word
function RandomWord() {
    var wordRandom = Math.floor(Math.random() * (wordList.length));
    return wordList[parseInt(wordRandom)];
}

//Game reset
function resetGame() {
    wrongAnswers = 0;
    solution = '';
    hiddenWord = '';
    $( ".row.first-row").empty();
    $( ".row.btn-toolbar").empty();
    $( ".row.gallows").empty();
    $( ".row.chatter").empty();
    console.log("Resetting the game")
    solution = RandomWord();
    console.log("Solution:" + solution)
    writeLetters();
    writeHidden();
}

// Write alphabet
function writeLetters() {
    for(let i = 0; i < letterList.length; i++){
        let iUpper = letterList[i].toUpperCase()
        $( ".row.btn-toolbar").append(`<button type="button" class="btn btn-success btn-primary btn-sm ${letterList[i]}">${iUpper}</button>
        `)
    }
}

// show solution as _ _ _ _ _ _
function writeHidden() {
    for(let i = 0; i < solution.length; i++){
        hiddenWord = hiddenWord.concat('_');
    }
    console.log(hiddenWord)
    $( ".row.solution").append(hiddenWord)
}

// wait for click on letter
$(document).on('click', ".btn.btn-success.btn-primary.btn-sm", function() { // clicked the select button
    var myClasses = this.classList;
    var chosenLetter = myClasses[4];
    console.log("Player clicked " + chosenLetter)
    $( ".row.chatter").append(chosenLetter)
    checkChosen(chosenLetter);
})

function checkChosen(letter) {
    for (let i = 0; i < solution.length; i++) {
        if (letter == solution[i] ){
            console.log(letter)
            hiddenWord = hiddenWord.concat(letter)
        } else {
            hiddenWord = hiddenWord.concat('_')
        }
    }
    console.log(hiddenWord)
    $( ".row.solution").empty();
    $( ".row.solution").append(hiddenWord);

}




