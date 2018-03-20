//On page load, show "click to start" button
//On start button click, page loads with questions, time starts, counting down from 120 seconds
//Each of the 10 questions has 4 options, radio buttons
// On end button click, submits answers, recieve "All done message", tallys score (correct, wrong, unanswered)
//If time runs out, form is submitted and game ends, tallys score (correct, incorrect, unasnswered)

$(document).ready(function(){
    
    
//Global Variables ---------------
        var number = 10;
        var currentQuestion=9;
        var intervalId;
        let correct = 0;
        let incorrect = 0;
    
        var questions = [
            new QuizQuestion(
            "How many libraries did Andrew Carnegie open from 1883 to 1929 using $55 million of his own fortune? ",
            ["1,876", "2,509", "3,245", "4,012"], 
            "2,509", 
            "./assets/images/Madison_Public_Library.jpg"),
        
            new QuizQuestion(
            "Which famous librarian went on to rename the Bureau of Investigation to the Federal Bureau of Investigation and head the agencies under eight different presidents?",
            ["J. Edgar Hoover", "Melvil Dewey", "Golda Meir", "Beverly Cleary"],
            "J. Edgar Hoover", 
            "./assets/images/1024px-Hoover-JEdgar-LOC.jpg"),
        
            new QuizQuestion(
            "In a recent Pew survey, what percent of Americans said their community would be impacted if the local public library closed?", 
            ["65%", "90%", "23%", "50%"], 
            "90%", 
            "./assets/images/library story time.jpg"),
        
            new QuizQuestion(
            "How long is the bookshelf space at the Library of Congress?",
            ["838 miles", "20 miles", "150 miles", "546 miles"],
            "838 miles", 
            "./assets/images/library of congress.jpg"),
        
            new QuizQuestion(
            "What book is most often stolen from public libraries?",
            ["The Hatchet", "the dictionary", "The Lion the Witch and the Wardrobe", "Guinness Book of Records"],
            "Guinness Book of Records", 
            "./assets/images/guiness book of records.jpg"),
        
            new QuizQuestion(
            "What was the outcome of the Authors Guild v. Google case (i.e. Google scanned 25 million books and made them freely searchable online)?",
            ["Google lost the case", "The books were taken down from the internet.", "Google won because it was protected under 'Fair Use' law", "Both parties settled the issue out of court"],
            "Google won because it was protected under 'Fair Use' law", 
            "./assets/images/second court seal.png"),
        
            new QuizQuestion(
            "What is the name of the section in the library at Hogwarts that requires you to have a note from a teacher to take books out?",
            ["the enclosed section", "the restricted section", "the banned section", "the off limits section"],
            "the restricted section", 
            "./assets/images/Bodleian_Library.jpg"),
        
            new QuizQuestion(
            "In Terry Pratchett’s Discworld book series, the librarian in the Unseen University gets turned into which creature?",
            ["a bear", "an orangutan", "a goat", "a hippo"],
            "an orangutan", 
            "./assets/images/orangutan.jpg"),
        
            new QuizQuestion(
            "In the Little Princess, some of the characters visit what sort of library to discuss the missing girl, whom they have nicknamed the 'un-fairy princess'?",
            ["The Indian Gentlemans's Library", "The English Gentleman's Library", "The French Gentleman's Library", "The Chinese Gentleman's Library"],
            "The Indian Gentleman's Library", 
            "./assets/images/the little princess.jpg"),
        
            new QuizQuestion(
            "Each book in A Series of Unfortunate Events includes a library which contains books based on the preferences, hobbies, and interests of the person who owns it. But which character’s library would have books about reptiles?",
            ["Uncle Monty", "Justice Strauss", "Aunt Josephine", "Madame Lulu"],
            "Uncle Monty", 
            "./assets/images/series of events.jpg"),
        ];
    
//Functions -----------------------
    
    function QuizQuestion(question, answers, correctAnswer, image) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer; 
        this.image = image;
        this.makeQuestion = function () {
            return ('<p>' + question + '</p>')
        };   
                           
        this.makeAnswer = function () {
            let buttonContainer = $('<div>')
            for (i=0; i< answers.length; i++) {
                buttonContainer.append('<input class = "ansBtn" type="radio" value="' + answers[i] + '" name="' + correctAnswer +'">' + answers[i] + '</input>');
            }; 
            console.log(buttonContainer.html());
            return buttonContainer.html();
        }; 
    
        this.showImage = function () {
            var buildImage = $("<img>"); 
            buildImage.attr("src", this.image);
            buildImage.attr("alt", this.correctAnswer); 
            buildImage.attr("height", 200);
            buildImage.attr("width", 200);
            console.log(buildImage.html());
            return buildImage[0].outerHTML;
    
        };       
    };
    
        
    
    
    function displayQuestion (qnum) {
        console.log(currentQuestion);
        console.log("Question is displayed")
        var questionAnswerDiv = $('<div>' + questions[qnum].makeQuestion() + questions[qnum].makeAnswer() +'</div>').addClass("qa");
        var questionImageDiv = $('<div>' + questions[qnum].showImage() + '</div>').addClass("qaimage");
        $('.article').append(questionAnswerDiv, questionImageDiv);
       
    };
        
    
    function checkAnswer() {
        let userAnswer = $('.ansBtn:checked').val();
        console.log("This is the user's answer: " + userAnswer);
        console.log("This is the correct answer: " + questions[currentQuestion].correctAnswer);
            if (userAnswer === questions[currentQuestion].correctAnswer){
                // alert("Correct Answer!");
                // console.log("This is the correct answer: " + questions[currentQuestion].correctAnswer);
                $('.js-correct-alert').html('<p>' + "Correct Answer!" + '</p>');
                correct++
            } else {
                // alert("Wrong Answer!");
                $('.js-incorrect-alert').html('<p>' + "InCorrect Answer!" + '</p>');
                incorrect++
            }
            if (currentQuestion === 9) {
                displayFinalScore();
            } else {
                currentQuestion++
                setTimeout(gameReset, 3000);
            };
    };

        
    
    function displayFinalScore () {
        stop();
        let correctDiv = ('<div>' + "Correct Answers: " + correct + '</div>');
        let incorrectDiv = ('<div>' + "Incorrect Answers: " + incorrect + '</div>')
            $('.aside').append(correctDiv, incorrectDiv);
    
        if (correct > incorrect) {
            $('.article').html('<h2>' + "You Win! Thanks for playing." + '</h2>')
            } else {
            $('.article').html('<h2>' + "You Lose! Thanks for playing." + '</h2>')
        }
       
        
    };
        
    function empty () {
        $('.article').empty();
        $('.js-correct-alert').empty();
        $('.js-incorrect-alert').empty();
    };
    
    
    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    };
    
    function decrement() {
        number--;
        $(".js-timer").html("<h2>" + number + "</h2>");
            if (number === 0) {
                stop();
                checkAnswer();
                
            }
    };
    
    function stop() {
        clearInterval(intervalId);
    };
        
    function gameReset () {
        number = 10;
        empty();
        displayQuestion(currentQuestion);
        run();
    };
    
    
    
    // Events ------------------------
    
    $('.js-start').on('click', function  () {
        displayQuestion(currentQuestion);
        console.log("Start Game!");
        run();
               
    }); 
    
    $('.js-stop').on('click', function  () {
        stop();
        empty();
        // alert("Game is Stopped!")
           
    }); 
            
    
    
});
