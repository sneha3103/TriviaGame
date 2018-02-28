alert ("hi");
$(".timer").hide();
// var numQuestions = 10;
$(document).ready(function() {
    var officeAudio =new Audio("./assets/TheOffice.mp3")
    var timerCounter = 30;
    var timerId = 0;
    var correctGuess = 0;
    var incorrectGuess = 0;
    var unanswered = 0;
    var questionNumber = 0;
    var answerPicked = false;
    var gifs = ["q1", "q2", "q3" , "q4", "q5", "q6" , "q7", "q8", "q9", "q10"];
    var numQuestions = 10;

    var quiz = [
        {
            question: "Where did Andy Bernard attend college?",
            options: ["Harvard", "Duke", "Cornell" ,"Dartmouth"],
            correctAnswer: 2
        },

        {
            question: "How many acres is Schrute Farms?",
            options: ["50", "100" , "40", "60"],
            correctAnswer: 3
        },

        {
            question: "What character\(s) dressed up as the Joker in the Halloween episode?",
            options: ["Creed", "Dwight and Kevin", "Kevin" , "Creed, Dwight, and Kevin"],
            correctAnswer: 3
        },

        {
            question: "When Dwight lies and tells everyone they are getting a thousand dollar raise, what does Stanley tell his wife to buy?",
            options: ["Car", "TV", "Wallpaper",  "Shoes"],
            correctAnswer: 2

        },

        {
            question: "What was Michael trying to grill when he burned his foot?",
            options: ["Hot Dogs" , "Bacon", "Hamburgers", "Steak"],
            correctAnswer: 1
        },

        {
            question: "What is Dwight\'s Sensei\'s name?",
            options: ["Ira", "George", "Mr. Miyagi", "Michael"],
            correctAnswer: 0
        },

        {
            question: "In the client episode, where does Jan and Michael take Christian, the Lackawanna County representative?",
            options: ["Pizza by Alfredo", "Alfredo's Pizza Company", "Poor Richard\'s", "Chili\'s"],
            correctAnswer: 3
        },

        {
            question: "After the Fun Run to beat rabies, to whom is the oversized check made out to?",
            options: ["Rabies Organization", "Meredith" , "Science", "Michael Scott"],
            correctAnswer: 2
        },

        {
            question: "What is Erin's real first name?",
            options: ["Kelly", "Marie", "Elizabeth", "Sarah"],
            correctAnswer: 0
        },

        {
            question: "What did Ryan leave in the toaster oven that caused the fire?",
            options: ["His poptart", "His cheese pita", "His bagel", "His pizza"],
            correctAnswer: 1
        }


    ] 

 
    $('#startbutton').on('click', function(){
        $(this).hide();
        officeAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        officeAudio.play();
        $(".timer").show();
        var correctGuess = 0;
        var incorrectGuess = 0;
        var unanswered = 0;
        timer ();
    })

//Restart Button?


   //Function for the Timer
   var timerCounter = 30;
   function timer () {
      
       var timerId = setInterval(triviaCount, 1000);
       function triviaCount () {
           if (timerCounter == 0) {
               clearInterval(timerId);
           }
           else {
            $(".timer-number").html(timerCounter);
            timerCounter--;
           }

        }
    
    function questionIsAnswered () {
        if (questionNumber < 9) {
            questionNumber++;
            console.log(questionNumber);
            game();
            $(".results").empty();
            $(".timer").show();
            timerCounter = 30;
            timer();
        } else {
            gameIsOver();
        }
    }

 //The function game is to populate the appropiate question with the correct option choices onto the HTML site. 
    function game () {
        // $(".questions").html("<p class='question-text'>" + quiz[questionNumber].question + "<p>");

        // answerInput = "<p class='answerChoice'>" + quiz[questionNumber].options[0] + "</p><p class='answerChoice'>"+ quiz[questionNumber].options[1] +"</p><p class='answerChoice'>"+ quiz[questionNumber].options[2] +"</p><p class='answerChoice'>"+ quiz[questionNumber].options[3] +"</p>";

	    // $(".answers").html(answerInput);
    
 
        for (var i=0; i<numQuestions; i++) {
            $(".questions").html(quiz[0].question);
        }

        for (var i=0; i<numQuestions; i++) {
            $("#q1a").html("A) " + quiz[0].options[0]);
            $("#q1b").html("B) " + quiz[0].options[1]);
            $("#q1c").html("C) " + quiz[0].options[2]);
            $("#q1d").html("D) " + quiz[0].options[3]);
     }
    //    answerInput= quiz[questionNumber].options[0] + quiz[questionNumber].options[1] + quiz[questionNumber].options[2] + quiz[questionNumber].options[3];

    //    $(".answerChoice").html(answerInput);
       
    }
    game();
    // console.log(game);
   
       };
    //    console.log(timer);
   ;

   //When user clicks the answer and it is correct
   function correctGuesses() {
       correctGuess++;
       console.log(correctGuess);
       $(".timer").hide();
       $(".questions").empty();
       $(".answers").empty();
       $("results").html("YAY! You got it right!");
       setTimeout(questionIsAnswered, 1000*3);
       };

   //When user selects the wrong answer
    function incorrectGuesses() {
        incorrectGuess++;
        console.log(incorrectGuess);
        $(".timer").hide();
        $(".questions").empty();
        $(".answers").empty();
        $("results").html("Wrong Answer!");
        setTimeout(questionIsAnswered, 1000*3);
    };

    //When user runs out of time
    function timeRunsOut () {
        unanswered++;
        console.log(unanswered);
        $(".timer").hide();
        $(".questions").empty();
        $(".answers").empty();
        $("results").html("Whoops, time is out!");
        setTimeout(questionIsAnswered, 1000*3);
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
    function gameOver() {
        $(".timer").hide();
        $(".questions").empty();
        $(".answers").empty();
        $(".results").html("Your Results: Correct Answers: " + correctGuess + "Incorrect Answers: " + incorrectGuess + "Unanswered: " + unanswered);
    };

    $(".answerChoice").on("click", ".answerChoice", function(event) {
        answerChoice = $(this).text();
        rightGuess = quiz[questionNumber].options[quiz[questionNumber].correctAnswer];
        clearInterval(timerId)
        if (answerChoice === rightGuess) {
            correctGuesses();
        } else if (answerChoice !== rightGuess) {
            incorrectGuesses();
        }

    });






});


   







