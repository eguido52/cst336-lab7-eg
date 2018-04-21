var selectedWord = "";
var selectedHint = "";
var board = [];
var lettersGuessed= [];
var remainingGuesses = 6;
var words = [   {word: "snake",hint:"It's a reptile"},
                {word: "monkey",hint: "It's a mammal"},
                {word: "beetle",hint: "It's an insect"}];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


window.onload = startGame();
$(".letter").click(function(){
    checkLetter($(this).attr("id"));
    disableButton($(this));
});
$(".hintBtn").on("click", function() {
   displayHint();
   disableButton($(this));
});
$(".replayBtn").on("click", function()
{
    location.reload();
});

function startGame()
{
    pickWord();
    initBoard();
    createLetters();
    updateBoard();
}

function pickWord()
{
    var randomInt = Math.floor(Math.random()* words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

function initBoard()
{
    for(var letter in selectedWord)
    {
        board.push("_");
    }
}

function createLetters()
{
    for(var letter of alphabet)
    {
        $("#letters").append("<button class= 'letter btn btn-success' id='"+letter+"'>"+ letter +"</button>");
    }
}

function checkLetter(letter)
{
    var positions = new Array();
    
    var isNotLetter = true;
    
    for(var i = 0; i<selectedWord.length; i++)
    {
        if(letter == selectedWord[i])
        {
            positions.push(i);
            isNotLetter = false;
        }
    }
    if(isNotLetter)
    {
        lettersGuessed.push(letter);
    }
    if(positions.length>0)
    {
        updateWord(positions, letter);
        
        if(!board.includes('_'))
        {
            endGame(true);
        }
    }
    else
    {
        remainingGuesses-=1;
        updateBoard();
        updateMan();
    }
    
    if(remainingGuesses <= 0)
    {
        endGame(false);
    }
}

function updateWord(positions, letter)
{
    for(var pos of positions)
    {
        board[pos] = letter;
    }
    updateBoard();
}

function updateBoard()
{
    $("#word").empty();
    $("#lettersGuessed").empty();
    
    for(var i=0; i<board.length; i++)
    {
        $("#word").append(board[i]+" ");
    } 
    
    for(var i=0; i<6-remainingGuesses; i++)
    {
        $("#lettersGuessed").append(lettersGuessed[i]+" ");
    } 
}

function updateMan()
{
    $("#hangImg").attr("src", "img/stick_"+(6-remainingGuesses)+".png");
}

function disableButton(btn)
{
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger");
}

function displayHint()
{
    $("#hint").append("<br />");
    $("#hint").append("<span class= 'hint'>Hint: "+selectedHint+"</span>");
    remainingGuesses-=1;
    updateMan();
}

function endGame(win)
{
    $("#letters").hide();
    
    if(win)
    {
        $('#won').show();
    }
    else
    {
        $('#lost').show();
    }
}