window.Test = (function() {
    'use strict';

    var content = document.getElementsByClassName('content')[0];
    var totalScore = 0;
    var currentTest;
    var currentTestScore = 0;
    var figuresToShow = [
        ["circle", "red"],
        ["circle", "green"],
        ["circle", "yellow"],
        ["square", "yellow"],
        ["square", "red"],
        ["square", "green"],
        ["square", "blue"],
        ["triangle", "green"],
        ["triangle", "yellow"],
        ["triangle", "red"]
    ];
    var test = {
        setCurrentTest: function(object) {
            currentTest = object;
        },
        /**
         * Metod för att skriva ut en paragraf.
         * @param message {string} text som ska visas
        */
        addParagraph: function(message) {
            var paragraph = document.createElement('p');

            paragraph.innerHTML = message;
            content.appendChild(paragraph);
        },
        /**
         * Metod för att skriva ut ett element.
         * @param element {string} HTML-tag
         * @param className {string} CSS-class
         * @param text {string} text som ska visas
        */
        addElement: function(elementType, className, text="") {
            var element = document.createElement(elementType);

            element.classList.add(className);
            content.appendChild(element);
            element.innerHTML = text;
            return element;
        },
        /**
         * Metod för att skriva ut en rubrik.
         * @param text {string} text som ska visas
        */
        addHeading: function(text) {
            var heading = document.createElement('h2');

            heading.innerHTML = text;
            content.appendChild(heading);
        },
        /**
         * Metod för att skriva ut en knapp.
         * @param btnName {string} text som ska visas på knapp
         * @param listener {function} function som ska exekveras
         * @param btnClass {string} CSS-class
        */
        addButton: function(btnName, listener, btnClass="btn") {
            var button = document.createElement('button');

            button.classList.add(btnClass);
            button.innerHTML = btnName;
            content.appendChild(button);
            button.addEventListener("click", function(event) {
                listener(event);
            });
        },
        /**
         * Metod för att avaktivera alla knappar med className "options".
        */
        disableBtn: function() {
            var optionsBtn = document.getElementsByClassName("options");

            for (var i = 0; i < optionsBtn.length; i++) {
                optionsBtn[i].disabled = true;
            }
        },
        /**
         * Metod för att lägga till testpoäng.
         * @param score {int} score att lägga till
        */
        addCurrentTestScore: function(score) {
            currentTestScore += score;
        },
        /**
         * Metod för att lägga till deltestpoäng till totalpoäng.
        */
        addTotalScore: function() {
            totalScore += currentTestScore;
            currentTestScore = 0;
        },
        getCurrentTestScore: function() {
            return currentTestScore;
        },
        getTotalScore: function() {
            return totalScore;
        },
        /**
         * Metod för att skriva ut en lista. Skriver ut på olika sätt om det är en
         * eller två dimensionell array som skickas in.
         * @param array {array} lista som ska skrivas ut
        */
        createList: function(array) {
            var listOfFigures = document.createElement("ol");

            for (var i = 0; i < array.length; i++) {
                var listItem = document.createElement("li");

                if (array[i].length === 2) {
                    listItem.innerHTML = array[i][1] + " " + array[i][0];
                } else {
                    listItem.innerHTML = array[i];
                }
                listOfFigures.appendChild(listItem);
            }
            content.appendChild(listOfFigures);
            listOfFigures.classList.add("figurelist");
        },
        /**
         * Metod för att skriva ut en figurer.
         * @param array {array} array med figurer som ska skrivas ut
         * @param that {object} reference till ett objekt
        */
        createFigures: function(array, that) {
            var figuresContainer = document.createElement("div");

            for (var i = 0; i < array.length; i++) {
                var figureItem = document.createElement("div");

                figureItem.classList.add("figure");
                figureItem.classList.add(`${array[i][1]}`);
                figureItem.classList.add(`${array[i][0]}`);
                figuresContainer.appendChild(figureItem);
                figureItem.addEventListener("click", function(event) {
                    that.checkAnswer(event);
                });
            }
            content.appendChild(figuresContainer);
            figuresContainer.classList.add("container");
        },
        /**
         * Metod för att retunera en slumpad variant av figuresToShow.
        */
        randomFigures: function() {
            for (var i = figuresToShow.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = figuresToShow[i];

                figuresToShow[i] = figuresToShow[j];
                figuresToShow[j] = temp;
            }
            return figuresToShow;
        },
        /**
         * Metod för att skapa en timer med ett interval som anropar
         * en showResult metod från ett annat objekt.
         * @param that {object} reference till ett objekt
         * @param interval {int} interval i millesekunder
         * @param timeout {int} timeout i millesekunder
        */
        createTimer: function(that, interval, timeout) {
            var timer = setInterval(counter, interval);
            var countDown = timeout / 1000 - 1;
            var counterArea = document.createElement("div");

            counterArea.classList.add("counter");
            content.appendChild(counterArea);
            function counter() {
                counterArea.innerHTML = `Tid kvar: ${countDown}`;
                countDown--;
            }

            setTimeout(function() {
                that.showResult();
                clearInterval(timer);
            }, timeout);
        },
        /**
        * Metod för att skapa ett interval som visar figurer.
        * @param that {object} reference till ett objekt
        * @param interval {int} interval i millesekunder
        * @param array {array} figurer som ska visas
       */
        createInterval: function(interval, array, that) {
            var timer = setInterval(showFigure, interval);
            var show = true;
            var count = array.length - 1;

            function showFigure() {
                if (show) {
                    show = false;
                    var figure = [array[count]];

                    window.Test.createFigures(figure, that);
                    count--;
                } else if (!show && count >= 0) {
                    show = true;
                    var element = document.getElementsByClassName("container")[0];

                    element.parentNode.removeChild(element);
                } else {
                    clearInterval(timer);
                    that.showResult();
                }
            }
        },
        /**
        * Metod för att skriva ut slutresultatet.
       */
        finalResult: function() {
            this.clear();
            this.addHeading("Slutresultat");
            this.addParagraph(`Ditt slutresultat är ${this.getTotalScore()}`);
            this.addParagraph("Maximum antal poäng för detta test är 43.");
        },
        /**
         * Metod för att starta om deltestet.
        */
        reset: function() {
            currentTestScore = 0;
            currentTest.init();
        },
        /**
         * Metod för att rensa innehållet i content.
        */
        clear: function() {
            content.innerHTML = "";
        },
    };

    /** Skriver ut välkomst meddelande. */
    test.addHeading("Välkommen till Intelligenstestet!");
    test.addParagraph("Det här testet kommer att mäta din intelligens genom" +
    "ett antal deltest och del frågor.");
    test.addParagraph("Testet består av 5 deltester och ett antal frågor till varje test.");
    test.addParagraph("För att börja testet tryck på start.");
    test.addButton("Start", function() {
        window.Quiz.init();
    });

    return test;
})();
