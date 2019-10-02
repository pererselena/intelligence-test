window.Quiz = (function() {
    'use strict';
    var questions = [
        "Vilken frukt av följande är en citrusfrukt?",
        "Vilket statsskick har man i Jordanien?",
        "Vad är det latinska namnet för Läran om jordmån?",
        "I vilken stad börjar och slutar resan i boken ”Jorden runt på 80 dagar”?",
        "Kan man vara allergisk mot jordgubbar?"
    ];
    var options = [
        ["Bergamott", "Carambola", "Durian"],
        ["Demokrati", "Monarki", "Republik"],
        ["Pedologi", "Osteologi", "Entomologi"],
        ["London", "Liverpool", "Manchester"],
        ["Ja", "Nej", "Ja, men bara mot den röda sorten"]
    ];
    var correctAnswer = [
        "Bergamott",
        "Monarki",
        "Osteologi",
        "London",
        "Ja, men bara mot den röda sorten"
    ];
    var currentQuestion = 0;
    var test = window.Test;
    /** Quizobjekt med ett antal metoder. */
    var quiz = {
        /**
         * Initierar testet genom att anropa metoden clear i objektet test.
         * Anropar övriga metoder i test objektet för att lägga till rubrik paragrafer
         * och en knapp för att starta testet.
         */
        init: function() {
            test.clear();
            test.addHeading("Quiz");
            test.addParagraph("I det här deltestet ska du svara på 5 frågor" +
            "med 3 svarsalternativ.");
            test.addParagraph("Det är bara ett svar som är rätt.");
            test.addParagraph("Varje rätt svar ger dig 3 poäng och fel svar ger dig 0 poäng.");
            test.addButton("Start quiz", function() {
                window.Quiz.startQuiz();
            });
            test.setCurrentTest(this);
            currentQuestion = 0;
            test.addCurrentTestScore(0);
        },
        /**
         * Metod för att skriva ut currentQuestion, frågor och svarsalternativ.
        */
        startQuiz: function() {
            test.clear();
            test.addHeading(`Fråga ${currentQuestion + 1}:`);
            test.addParagraph(questions[currentQuestion]);

            var answers = options[currentQuestion];

            for (var i = 0; i < answers.length; i++) {
                test.addButton(answers[i], function(event) {
                    window.Quiz.checkAnswer(event);
                }, "options");
            }
        },
        /**
         * Metod för att varifiera svaret.
         * Om det är sista frågan lägger till en knapp för att starta nästa deltest.
         * Visar rätt svar och ändrar färg på valt svarsalternativ.
        */
        checkAnswer: function(event) {
            var answer = event.target.innerHTML;

            test.disableBtn();
            if (answer === correctAnswer[currentQuestion]) {
                test.addCurrentTestScore(3);
                event.target.classList.toggle("green");
                test.addParagraph("Rätt svar!");
            } else {
                event.target.classList.toggle("red");
                test.addParagraph(`Fel svar! Rätt svar är ${correctAnswer[currentQuestion]}`);
            }
            if (currentQuestion === 4) {
                test.addHeading("Quiz resultat");
                var score = test.getCurrentTestScore();

                test.addParagraph(`Ditt resultat på det här deltestet är: ${score}`);
                test.addButton("Nästa test", function() {
                    test.addTotalScore();
                    window.FizzBuzz.init();
                });
            } else {
                currentQuestion++;
                test.addButton("Nästa fråga", function() {
                    window.Quiz.startQuiz();
                });
            }
        },
    };

    return quiz;
})();
