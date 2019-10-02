window.FizzBuzz = (function() {
    'use strict';

    var answer = "";
    var test = window.Test;
    var fizzBuzz = {
        /**
         * Initierar testet genom att anropa metoden clear i objektet test.
         * Anropar övriga metoder i test objektet för att lägga till rubrik paragrafer
         * och en knapp för att starta testet.
         */
        init: function() {
            test.clear();
            test.addHeading("FizzBuzz");
            test.addParagraph("I det här deltestet ska du gisa hur serien ska" +
            "fortsätta genom att klicka på ett av svarsalternativen.");
            test.addHeading("Regler:");
            test.addParagraph("Varje tal som är delbart med tre ersätts med fizz." +
            "Varje tal som är delbart med 5 ersätts med buzz. Ett tal som är" +
            "delbart med både 3 och 5 ersätts med fizzbuzz.");
            test.addParagraph("Det är bara ett svar som är rätt.");
            test.addParagraph("Rätt svar ger dig 3 poäng och fel svar ger dig 0 poäng.");
            test.addButton("Start FizzBuzz", function() {
                window.FizzBuzz.startFizzBuzz();
            });
            test.setCurrentTest(this);
        },
        /**
         * Metod för att starta testet.
        */
        startFizzBuzz: function() {
            test.clear();
            test.addHeading(`Fizzbuzz`);
            var start = Math.floor(Math.random() * 1000) + 1;
            var serie = window.FizzBuzz.createFizzBuzz(start);

            answer = serie[serie.length - 1];
            serie[serie.length - 1] = "...";
            test.addParagraph(serie.join(", "));
            test.addButton("Fizz", function(event) {
                window.FizzBuzz.checkAnswer(event);
            }, "options");
            test.addButton("Buzz", function(event) {
                window.FizzBuzz.checkAnswer(event);
            }, "options");
            test.addButton("FizzBuzz", function(event) {
                window.FizzBuzz.checkAnswer(event);
            }, "options");
            test.addButton(start + 10, function(event) {
                window.FizzBuzz.checkAnswer(event);
            }, "options");
        },
        /**
         * Metod för att skapa fizzbuzz serie.
         *@param start {int} start värde för serie
        */
        createFizzBuzz: function(start) {
            var output = "";
            var startValue = start;
            var stopValue = start + 10;

            for (var i = startValue; i <= stopValue; i++) {
                if (i % 15 === 0) {
                    output += "FizzBuzz,";
                } else if (i % 5 === 0) {
                    output += "Buzz,";
                } else if (i % 3 === 0) {
                    output += "Fizz,";
                } else {
                    output += `${i},`;
                }
            }
            output = output.slice(0, -1);
            return output.split(",");
        },
        /**
         * Metod för att kontrollera svar.
         * @param event {object} click event object
        */
        checkAnswer: function(event) {
            var guess = event.target.innerHTML;

            if (guess === answer) {
                test.addCurrentTestScore(3);
                event.target.classList.toggle("green");
                test.addParagraph("Rätt svar!");
            } else {
                event.target.classList.toggle("red");
                test.addParagraph(`Fel svar! Rätt svar är ${answer}`);
            }
            test.addButton("Nästa test", function() {
                test.addTotalScore();
                window.Memory.init();
            });
            test.disableBtn();
        },
    };

    return fizzBuzz;
})();
