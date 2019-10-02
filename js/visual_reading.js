window.VisualReading = (function() {
    'use strict';
    var test = window.Test;
    var clickCounter = 0;
    var visualReading = {
        /**
         * Initierar testet genom att anropa metoden clear i objektet test.
         * Anropar övriga metoder i test objektet för att lägga till rubrik paragrafer
         * och en knapp för att starta testet.
         */
        init: function() {
            test.clear();
            test.addHeading("Visuell förmåga och läsförståelse");
            test.addHeading("Regler:");
            test.addParagraph("I det här deltestet kommer du att se 10 objekt." +
            "Du kommer att få en lista på vilken turordning du ska klicka på objekten.");
            test.addParagraph("Du har 15 sekunder på dig att göra testet.");
            test.addParagraph("Rätt klick ger dig 1 poäng och fel svar ger dig 0 poäng.");
            test.addButton("Starta testet", function() {
                window.VisualReading.startVisualReading();
            });
            test.setCurrentTest(this);
        },
        /**
         * Metod för att starta testet.
        */
        startVisualReading: function() {
            test.clear();
            test.addHeading(`Visuell förmåga och läsförståelse`);
            test.createList(test.randomFigures());
            test.createFigures(test.randomFigures(), this);
            clickCounter = 0;
            test.createTimer(this, 1000, 15000);
        },
        /**
         * Metod för att kontrollera svaret.
         *@param event {object} click event
        */
        checkAnswer: function(event) {
            if (clickCounter < test.randomFigures().length) {
                var selected = event.target.classList.value.replace("figure ", "");
                var answerList = document.getElementsByClassName("figurelist")[0];
                var answer = answerList.children[clickCounter].innerHTML;

                if (selected === answer) {
                    test.addCurrentTestScore(1);
                }
                clickCounter++;
            }
        },
        /**
         * Metod för att visa resultatet.
        */
        showResult: function() {
            test.clear();
            test.addHeading("Test resultat");
            var score = test.getCurrentTestScore();

            test.addParagraph(`Ditt resultat på det här deltestet är: ${score}`);
            test.addButton("Nästa test", function() {
                test.addTotalScore();
                window.Apperhension.init();
            });
        },
    };

    return visualReading;
})();
