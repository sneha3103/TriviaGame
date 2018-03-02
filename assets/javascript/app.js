$(".timer").hide();

$(document).ready(function() {
    var officeAudio =new Audio("./assets/TheOffice.mp3")
    var timerCounter = 30;
    var timerId;
    var correctGuess = 0;
    var incorrectGuess = 0;
    var unanswered = 0;
    var questionNumber = 0;
    var answerPicked = false;
    var gifs = ["q1", "q2", "q3" , "q4", "q5", "q6" , "q7", "q8", "q9", "q10"];
    var numQuestions = 10;
    

    var quiz = [
        {
            image: "../images/q1.gif",
            question: "Where did Andy Bernard attend college?",
            options: ["Harvard", "Duke", "Cornell" ,"Dartmouth"],
            correctAnswer: 2
        },

        {
            image: "./assets/images/q2.gif",
            question: "How many acres is Schrute Farms?",
            options: ["50", "100" , "40", "60"],
            correctAnswer: 3
            
        },

        {
            image: "./assets/images/q3.gif",
            question: "What character\(s) dressed up as the Joker in the Halloween episode?",
            options: ["Creed", "Dwight and Kevin", "Kevin" , "Creed, Dwight, and Kevin"],
            correctAnswer: 3
        },

        {
            image: "./assets/images/q4.gif",
            question: "When Dwight lies and tells everyone they are getting a thousand dollar raise, what does Stanley tell his wife to buy?",
            options: ["Car", "TV", "Wallpaper",  "Shoes"],
            correctAnswer: 2

        },

        {
            image: "./assets/images/q5.gif",
            question: "What was Michael trying to grill when he burned his foot?",
            options: ["Hot Dogs" , "Bacon", "Hamburgers", "Steak"],
            correctAnswer: 1
        },

        {
            image: "./assets/images/q6.gif",
            question: "What is Dwight\'s Sensei\'s name?",
            options: ["Ira", "George", "Mr. Miyagi", "Michael"],
            correctAnswer: 0
        },

        {
            image: "./assets/images/q7.gif",
            question: "In the client episode, where does Jan and Michael take Christian, the Lackawanna County representative?",
            options: ["Pizza by Alfredo", "Alfredo's Pizza Company", "Poor Richard\'s", "Chili\'s"],
            correctAnswer: 3
        },

        {
            image: "./assets/images/q8.gif",
            question: "After the Fun Run to beat rabies, to whom is the oversized check made out to?",
            options: ["Rabies Organization", "Meredith" , "Science", "Michael Scott"],
            correctAnswer: 2
        },

        {
            image: "./assets/images/q9.gif",
            question: "What is Erin's real first name?",
            options: ["Kelly", "Marie", "Elizabeth", "Sarah"],
            correctAnswer: 0
        },

        {
            image: "./assets/images/q10.gif",
            question: "What did Ryan leave in the toaster oven that caused the fire?",
            options: ["His poptart", "His cheese pita", "His bagel", "His pizza"],
            correctAnswer: 1
        }


    ] 

 //When user presses Start, the button should hide and then the theme song of the office should play. Also, the timer should start counting down from 30 seconds. The game function should start also.
    $("#startbutton").on("click", function(){
        $(this).hide();
        officeAudio.addEventListener("ended", function() {
            this.currentTime = 0;
            this.play();
        }, false);
        officeAudio.play();
        $(".timer").show();
        correctGuess = 0;
        incorrectGuess = 0;
        unanswered = 0;
        game();
        timer();
       
    })

var timerId;
   //Function for the Timer

   function timer () {
      
       timerId = setInterval(triviaCount, 1000);
       function triviaCount () {
           if (timerCounter === 0) {
               clearInterval(timerId);
               timeRunsOut();
           }
           else {
            $(".timer-number").html(timerCounter);
            timerCounter--;
           }

        }
        // console.log(timer);
    
    };

   ;

    //The function game is to populate the appropiate question with the correct option choices onto the HTML site.
   function game () {

   
    $(".questions").html("<p class='question-text'>" + quiz[questionNumber].question + "<p>");

        answerInput = "<p class='answerChoice'>" + quiz[questionNumber].options[0] + "</p><p class='answerChoice'>"+ quiz[questionNumber].options[1] +"</p><p class='answerChoice'>"+ quiz[questionNumber].options[2] +"</p><p class='answerChoice'>"+ quiz[questionNumber].options[3] +"</p>";

        $(".answers").html(answerInput);
    }
    
    game();

   function questionIsAnswered () {
    if (questionNumber < 9) {
        questionNumber++;
        // console.log(questionNumber);
        game();
        $(".results").empty();
        $(".timer").show();
        timerCounter = 30;
        timer();
    } else {
        gameIsOver();
    }
}

   //When user clicks the answer and it is correct
   function correctGuesses() {
       correctGuess++;
    //    console.log(correctGuess);
       $(".timer").hide();
       $(".questions").empty();
       $(".answers").empty();
       $(".results").html("<p class='answer-message'>YAY! You got it right</p>" + "<img src= " + quiz[questionNumber].image + "</>");
       setTimeout(questionIsAnswered, 1000*2);
       };

   //When user selects the wrong answer
    function incorrectGuesses() {
        incorrectGuess++;
        // console.log(incorrectGuess);
        $(".timer").hide();
        $(".questions").empty();
        $(".answers").empty();
        $("results").html("<p class='answer-message'>Nice Try, You were absolutely average!</p>" + "<img src= " + quiz[questionNumber].image + "</>");
        setTimeout(questionIsAnswered, 1000*2);
    };

    //When user runs out of time
    function timeRunsOut () {
        unanswered++;
        // console.log(unanswered);
        $(".timer").hide();
        $(".questions").empty();
        $(".answers").empty();
        $("results").html("<p class='answer-message'>Whoops, time is out!</p>" +"<img src= " + quiz[questionNumber].image + "</>");
        setTimeout(questionIsAnswered, 1000*2);
    };

    //Function to reset the game

    function gameReset () {
        $(".timer").hide();
        $(".questions").empty();
        $(".answers").empty();
        $(".results").empty();

        questionNumber = 0;
        correctGuess = 0;
        incorrectGuess = 0;
        unanswered = 0;
        timerCounter = 30;

        game();
        timer();
    };

    //Function for when the game is over
    function gameIsOver() {
        $(".timer").hide();
        $(".questions").empty();
        $(".answers").empty();
        $(".results").html("<p>Your Results: </p> <br> <p>Correct Answers: " + correctGuess + "</p> Incorrect Answers:  " + incorrectGuess + "<br> <p> Unanswered:  " + unanswered + "</p>");
    };


    //Created a function to allow the user to click on the selected answer
    $(".answers").on("click", ".answerChoice", function(event) {
        answerChoice = $(this).text();
        rightGuess = quiz[questionNumber].options[quiz[questionNumber].correctAnswer];
        // console.log(answerChoice);
        // console.log(rightGuess);
        clearInterval(timerId)
        console.log(timerId);
        if (answerChoice === rightGuess) {
            correctGuesses();
        } else if (answerChoice !== rightGuess) {
            incorrectGuesses();
        }

    });


});


   







