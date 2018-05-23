//hangman from scratch exercise

// Global variables


// game info
const gameTitle = "Hangman from Scratch!"
const gameVersion = 1.0
const gameDescription = "This is a traditional Hangman game, created in 2 hours"

// the guys who worked on this
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

// alphabet letters and keycodes
const letterList = [ 
{ letter: "a" , id: 97 },
{ letter: "b" , id: 98 },
{ letter: "c" , id: 99 },
{ letter: "d" , id: 100 },
{ letter: "e" , id: 101 },
{ letter: "f" , id: 102 },
{ letter: "g" , id: 103 },
{ letter: "h" , id: 104 },
{ letter: "i" , id: 105 },
{ letter: "j" , id: 106 },
{ letter: "k" , id: 107 },
{ letter: "l" , id: 108 },
{ letter: "m" , id: 109 },
{ letter: "n" , id: 110 },
{ letter: "o" , id: 111 },
{ letter: "p" , id: 112 },
{ letter: "q" , id: 113 },
{ letter: "r" , id: 114 },
{ letter: "s" , id: 115 },
{ letter: "t" , id: 116 },
{ letter: "u" , id: 117 },
{ letter: "v" , id: 118 },
{ letter: "w" , id: 119 },
{ letter: "x" , id: 120 },
{ letter: "y" , id: 121 },
{ letter: "z" , id: 122 } 
]

// List creators in About section
console.log("It took " + createdBy.length + " dudes to make this game!");
for (var i = 0; i < createdBy.length; i++) {
    $( ".list-unstyled" ).append( $( `<li><a href="${createdBy[i].url}" target="_blank" class="text-white">${createdBy[i].name}</a></li>` ) );
}

// Game title and description
$( ".row.title-row").append( $(`<div class="col-md-12"><h1>${gameTitle}</h1></div>`))
$( ".text-white.game-title").append( $(`<h4>${gameTitle}</h4>`))
$( ".text-muted.game-description").append( $(`<p>${gameDescription}</p>`))

resetGame(); // start new game

// pick a random word
function RandomWord() {
    var wordRandom = Math.floor(Math.random() * (wordList.length));
    return wordList[parseInt(wordRandom)];
}

//Game reset
function resetGame() {
    hiddenWord = ''
    hangmanState = 0
    $( ".row.first-row").empty();
    $( ".row.btn-toolbar").empty();
    $( ".row.chatter").empty();
    $( ".row.gallows").empty();
    $( ".row.gallows").append(`<canvas id="gameCanvas" height="500" width="500"></canvas>`);
    // game canvas where gallows and hangman will be drawn
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    console.log("Resetting the game")
    solution = RandomWord();
    console.log("Solution:" + solution)
    writeLetters();
    writeHidden();
}

// Write alphabet
function writeLetters() {
    for(let i = 0; i < letterList.length; i++){
        let iUpper = letterList[i].letter.toUpperCase()
        $( ".row.btn-toolbar").append(`<button style="margin:2px" type="button" class="btn btn-success btn-primary btn-sm ${letterList[i].letter}">${iUpper}</button>`)
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
$(document).on('click', ".btn.btn-success.btn-primary.btn-sm", function() { 
    var myClasses = this.classList;
    var chosenLetter = myClasses[4];
    console.log("Player clicked " + chosenLetter)
    $( ".row.chatter").append(chosenLetter)
    checkChosen(chosenLetter);
})

// listen for alphabet keys pressed
$(document).keypress(function(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    console.log("You pressed the \"" + keycode + "\"")
    for (let i = 0; i < letterList.length; i++) {
        if (parseInt(letterList[i].id) === keycode) {
            $( ".row.chatter").append(letterList[i].letter)
            checkChosen(letterList[i].letter);
        }
    }
});

//check to see if there is a match
function checkChosen(letter) {
    console.log("Looking for \"" + letter + "\" in " + solution)
    if (solution.indexOf(letter) > -1) {
        console.log("Found!")
        for (let i = 0; i < solution.length; i++) {
            if (solution.charAt(i) == letter) {
                hiddenWord = replaceChar(hiddenWord, i, letter)
            } 
        }
    } else {
        console.log("Not found!")
        wrongAnswer();
    }
    $(".row.solution").empty()
    $(".row.solution").append(hiddenWord)
}

//replace character in string 'str' at position 'index' with character 'chr'
function replaceChar(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function wrongAnswer() {
    drawSequence[ hangmanState++ ]();
}

// Drawing the hangman
var drawSequence = [ drawGallows, drawHead, drawNeck, drawTorso, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg ];

function drawLine(moveToX, moveToY, lineToX, lineToY) {
    context.moveTo(moveToX,moveToY);
    context.lineTo(lineToX,lineToY);
    context.stroke();
}

function drawGallows() {
    drawLine(0,150,150,150);
    drawLine(10,0,10,150);    
    drawLine(0,5,70,5);    
    drawLine(60,5,60,15);            
}

function drawHead() {
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
}

function drawNeck() {
    drawLine(60,35,60,40);
}

function drawTorso() {
    drawLine(60,40,60,60);
}

function drawLeftArm() {
    drawLine(60,40,40,55);
}

function drawRightArm() {
    drawLine(60,40,80,55);
}

function drawLeftLeg() {
    drawLine(60,60,40,90);
}

function drawRightLeg() {
    drawLine(60,60,80,90);
}

