//On page load, show "click to start" button
//On start button click, page loads with questions, time starts, counting down from 120 seconds
//Each of the 10 questions has 4 options, radio buttons
// On end button click, submits answers, recieve "All done message", tallys score (correct, wrong, unanswered)
//If time runs out, form is submitted and game ends, tallys score (correct, incorrect, unasnswered)

$(document).ready(function(){

//Variables --------------
//we need question data

let questions = [
    {
        "question": "What is Marges madien name?",
        "answers" : ["Smith", "Buvier", "Bubble"],
        "correctAnswer" : "Buvier",
        "image" : "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Marge_Simpson.png/220px-Marge_Simpson.png"

    },
    {
        "question": "Where does Homer work?",
        "answers" : ["Library", "Power Plant", "Town Hall"],
        "correctAnswer" : "Power Plant",
        "image" : ""

    } 
    

    
    
    

]; 

let userAnswers = []; 

//Functions ----------------
function startGame() {
    console.log("Game has started!")
    for (var i=0; i<questions.length; i++){
        $('.js-question').append("<p>" + questions[i].question + "</p>");
        console.log(questions[i].answers.length)
        for (var j=0; j < questions[i].answers.length; j++) {
            $('.js-question').append('<input type="radio" value="' + questions[i].answers[j] + '"name="' + i +'">' + questions[i].answers[j] + '</input>');
        }
        $('.js-question').append('<br><hr>'); 
    }

}

function stopGame () {
    $('input:checked').each(function () {
        let answerChecked= $(this).val();
        // console.log ($("this").val()); 
        
        if (answerChecked === questions[$(this).attr('name')].correctAnswer) {
            console.log("You are correct, sir!"); 
        } else {
            console.log("Doh"); 
        }
        
    });
}





// start: function() {
      
//     //  TODO: Use setInterval to start the count here and set the clock to running.
//     if (!clockRunning) {
//       intervalId = setInterval(stopwatch.count, 1000);
//       clockRunning = true;
      
//     }

// },
// stop: function() {
//   clearInterval(intervalId);
//   clockRunning = false;
//   //  TODO: Use clearInterval to stop the count here and set the clock to not be running.

// },

//Events ----------------

//Click Start Button to start game
$('.js-start').on('click', function  () {
    startGame(); 
}); 

$('.js-stop').on('click', function  () {
    stopGame(); 
}); 

//Click Stop Button to see score
// Timer Runs out to end game and show score






}); 

