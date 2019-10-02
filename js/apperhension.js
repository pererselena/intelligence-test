window.Apperhension = (function() {
    'use strict';

    var test = window.Test;
    var rules = [
        "Har en annan färg än röd.",
        "Har en annan form än kvadrat.",
        "Är röd och kvadrat."
    ];
    var apperhension = {
        /**
         * Initierar testet genom att anropa metoden clear i objektet test.
         * Anropar övriga metoder i test objektet för att lägga till rubrik paragrafer
         * och en knapp för att starta testet.
         */
        init: function() {
            test.clear();
            test.addHeading("Uppfattningsförmåga");
            test.addHeading("Regler:");
            test.addParagraph("I det här deltestet kommer ett objekt i taget att visas" +
            "under 1 sekund. Du skall klicka på objektet om det uppfyller minst ett av 3 krav.");
            test.createList(rules);
            test.addParagraph("Rätt klick ger dig 1 poäng och fel svar ger dig 0 poäng.");
            test.addButton("Starta testet", function() {
                window.Apperhension.start();
            });
            test.setCurrentTest(this);
        },
        /**
         * Metod för att starta testet.
        */
        start: function() {
            test.clear();
            test.addHeading(`Uppfattningsförmåga`);
            test.createInterval(1000, test.randomFigures(), this);
        },
        /**
         * Metod för att kontrollera svaret.
         * @param event {object} click event
        */
        checkAnswer: function(event) {
            var clicked = event.target;
            var color = clicked.classList.value.split(" ")[1];
            var shape = clicked.classList.value.split(" ")[2];

            clicked.style.pointerEvents = "none";
            if ((color !== "red" && shape !== "square") ||
            (shape === "square" && color === "red")) {
                console.log(`correct ${shape} ${color}`);
                test.addCurrentTestScore(1);
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
            test.addButton("Visa slutresultat", function() {
                test.addTotalScore();
                test.finalResult();
                test.setCurrentTest("");
            });
        },

    };

    return apperhension;
})();
