window.Memory = (function() {
    'use strict';

    var flagTarget;
    var clickCounter = 0;
    var countries = [];
    var randomFlags;
    var test = window.Test;


    var memory = {
        /**
         * Initierar testet genom att anropa metoden clear i objektet test.
         * Anropar övriga metoder i test objektet för att lägga till rubrik paragrafer
         * och en knapp för att starta testet.
         */
        init: function() {
            test.clear();
            test.addHeading("Minne");
            test.addParagraph("Detta är ett litet minnes-test som kollar hur bra" +
            "bildminne du har.");
            test.addHeading("Regler:");
            test.addParagraph("Det här deltestet börjar med att 9 flaggor visas under 5 sekunder." +
            "Därefter döljs de. Efter det visas upp en numrerad lista med namnen på de nio" +
            "flaggorna. Du skall klicka på rätt ruta där motsvarande flagga ligger," +
            "i rätt ordning.");
            test.addParagraph("Rätt svar ger dig 1 poäng och fel svar avslutar testet." +
            "Du får fortsätta så länge du gissar rätt. När alla flaggorna visas så är" +
            "testet över, eller när du gissar fel.");
            test.addButton("Start memory", function() {
                window.Memory.start();
            });
            test.setCurrentTest(this);
        },
        /**
         * Metod för att starta testet.
        */
        start: function() {
            test.clear();
            test.addHeading(`Minne`);
            flagTarget = test.addElement("div", "flagTarget");
            var flag1 = Object.create(flag);
            var flag2 = Object.create(flag);
            var flag3 = Object.create(flag);
            var flag4 = Object.create(flag);
            var flag5 = Object.create(flag);
            var flag6 = Object.create(flag);
            var flag7 = Object.create(flag);
            var flag8 = Object.create(flag);
            var flag9 = Object.create(flag);
            var flags = [];
            var randomCountries = [];

            flag1.init("russia", 2);
            flag2.init("irland", 2);
            flag3.init("sweden", 4);
            flag4.init("japan", 1);
            flag5.init("czech", 2);
            flag6.init("russia", 2);
            flag7.init("sweden", 4);
            flag8.init("japan", 1);
            flag9.init("czech", 2);
            flags.push(flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8, flag9);
            randomFlags = this.randomArray(flags);
            for (var i = 0; i < randomFlags.length; i++) {
                randomFlags[i].draw();
                randomCountries.push(randomFlags[i].flagId);
            }
            this.createTimer(1000, 5000);
            countries = this.randomArray(randomCountries);
        },
        /**
         * Metod för att kontrolera svaret.
         * @param flag {object} flagga som man klickat på
        */
        checkAnswer: function(flag) {
            var selected = flag.flagId;
            var answer = countries[clickCounter];

            if (selected === answer) {
                test.addCurrentTestScore(1);
                console.log("correct");
                flag.flagContainer.style.pointerEvents = "none";
            } else {
                this.showResult();
            }
            clickCounter++;
            if (clickCounter === countries.length) {
                this.showResult();
            }
        },
        /**
         * Metod för att retunera slumpad array.
         * @param array {array} array som ska slumpas
        */
        randomArray: function(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];

                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        },
        /**
         * Metod för att visa resultat.
        */
        showResult: function() {
            test.clear();
            test.addHeading("Deltest resultat");
            test.addParagraph(`Ditt resultat: ${test.getCurrentTestScore()}`);
            test.addButton("Nästa Test", function() {
                window.VisualReading.init();
                test.addTotalScore();
            });
        },
        /**
         * Metod för att skapa en timer med ett interval som döljer flaggor efter att tiden gott ut.
         * @param interval {int} interval i millesekunder
         * @param timeout {int} timeout i millesekunder
        */
        createTimer: function(interval, timeout) {
            var timer = setInterval(counter, interval);
            var countDown = timeout / 1000 - 1;
            var counterArea = document.createElement("div");
            var content = document.getElementsByClassName("content")[0];

            counterArea.classList.add("counter");
            content.appendChild(counterArea);
            function counter() {
                counterArea.innerHTML = `Tid kvar: ${countDown}`;
                countDown--;
            }

            setTimeout(function() {
                counterArea.parentNode.removeChild(counterArea);
                clearInterval(timer);
                for (var i = 0; i < randomFlags.length; i++) {
                    randomFlags[i].flagToggle();
                }
                test.createList(countries);
            }, timeout);
        },
    };
    /**
     *Representerar ett flaggobjekt.
    */
    var flag = {
        flagHtml: "",
        flagId: "",
        downSide: "",
        flagContainer: "",
        init: function(country, parts) {
            this.flagId = country;
            switch (parts) {
                case 1:
                    this.flagHtml = `<div class="${country}"><div class="part1"></div></div></div>`;
                    break;
                case 2:
                    this.flagHtml = `<div class="${country}"><div class="part1">\
                    </div><div class="part2"></div></div></div>`;
                    break;
                case 4:
                    this.flagHtml = `<div class="${country}"><div class="part1">\
                    </div><div class="part2"></div><div class="part3">\
                    </div><div class="part4"></div></div></div>`;
                    break;
                default:
                    this.flagHtml = `<div class="${country}"></div>`;
            }
        },
        draw: function() {
            var fc = test.addElement("div", "flag");

            this.flagContainer = fc;
            this.flagContainer.innerHTML = this.flagHtml;
            this.flagContainer.id = this.flagId;
            flagTarget.appendChild(this.flagContainer);
            this.flagContainer.addEventListener("click", function() {
                this.flagToggle();
                window.Memory.checkAnswer(this);
            }.bind(this));
        },
        flagToggle: function() {
            var currentSide = this.flagHtml;

            this.flagHtml = this.downSide;
            this.downSide = currentSide;
            this.flagContainer.innerHTML = this.flagHtml;
            this.flagContainer.classList.toggle("hidden");
        }
    };

    return memory;
})();
