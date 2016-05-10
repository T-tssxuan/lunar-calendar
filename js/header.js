define(function() {
    return {
        /**
         * initHeader() init the header information
         *
         * @param {Function} callback
         */
        initHeader: function(callback) {
            const date = new Date();
            this.initYearSelector(date.getFullYear() + " 年", callback);
            this.initYearDropDown(callback);
            this.initMonthSelector(date.getMonth() + 1 + " 月", callback);
            this.initMonthDropDown(callback);
            this.initGoBackToday(callback);
            this.initClock(this);
        },

        /**
         * initYearSelector() init the year selector
         *
         * @param {String} yearValue
         * @param {Function} callback
         */
        initYearSelector: function(yearValue, callback) {
            // init the year
            const yearEle = document.getElementById("ch-year-value");
            yearEle.textContent = yearValue;
            yearEle.onclick = function() {
                const year = document.getElementById("ch-year-value");
                const value =  year.textContent.slice(0, -2);
                const scrollEle = document.getElementById("ch-year-items");
                scrollEle.style.display = "block";
                let len = (Number(value) - 1891)  * 22;
                scrollEle.scrollTop = len;
            };

            // init the previous year selector
            const yearPre = document.getElementById("ch-year-pre");
            yearPre.onclick = function() {
                    const year = document.getElementById("ch-year-value");
                    let value = Number(year.textContent.slice(0, -2));
                    if (Number.isNaN(value) || value == 1891) {
                        return;
                    }
                    value--;
                    year.textContent = value + " 年";
                    callback();
            };

            // init the previous year selector
            const yearNext = document.getElementById("ch-year-next");
            yearNext.onclick = function() {
                    const year = document.getElementById("ch-year-value");
                    let value = Number(year.textContent.slice(0, -2));
                    if (Number.isNaN(value) || value == 2100) {
                        return;
                    }
                    value++;
                    year.textContent = value + " 年";
                    callback();
            };
        },

        /**
         * initYearDropDown() init the year drop down menu
         *
         * @param {Function} callback
         */
        initYearDropDown: function(callback) {
            const selectorItems = document.getElementById("ch-year-items");
            selectorItems.innerHTML = "";
            for (var i = 1891; i < 2100; i++) {
                const selectorItem = document.createElement("div");
                selectorItem.className = "ch-selector-item";
                selectorItem.textContent = i + " 年";
                selectorItems.appendChild(selectorItem);
                selectorItem.onclick = function() {
                    const value = this.textContent;
                    const year = document.getElementById("ch-year-value");
                    const yearScroll = document.getElementById("ch-year-items");
                    year.textContent = value;
                    yearScroll.style.display = "none";
                    callback();
                };
            }
        },

        /**
         * initMonthSelector() init the month selector
         *
         * @param {String} monthValue
         * @param {Function} callback
         */
        initMonthSelector: function(monthValue, callback) {
            const month = document.getElementById("ch-month-value");
            month.textContent = monthValue;
            month.onclick = function() {
                const month = document.getElementById("ch-month-value");
                const value =  Number(month.textContent.slice(0, -2));
                const monthScroll= document.getElementById("ch-month-items");
                monthScroll.style.display = "block";
            };

            // init the previous year selector
            const monthPre = document.getElementById("ch-month-pre");
            monthPre.onclick = function() {
                    const month = document.getElementById("ch-month-value");
                    let value = month.textContent;
                    value = Number(value.slice(0, -2));
                    if (Number.isNaN(value) || value == 1) {
                        return;
                    }
                    value--;
                    month.textContent = value + " 月";
                    callback();
            };

            // init the next year selector
            const monthNext = document.getElementById("ch-month-next");
            monthNext.onclick = function() {
                    const month = document.getElementById("ch-month-value");
                    let value = month.textContent;
                    value = Number(value.slice(0, -2));
                    if (Number.isNaN(value) || value == 12) {
                        return;
                    }
                    value++;
                    month.textContent = value + " 月";
                    callback();
            };
        },

        /**
         * initMonthDropDown() init the month drop down
         *
         * @param {Function} callback
         */
        initMonthDropDown: function(callback) {
            const selectorItems = document.getElementById("ch-month-items");
            selectorItems.innerHTML = "";
            for (var i = 1; i <= 12; i++) {
                const selectorItem = document.createElement("div");
                selectorItem.className = "ch-selector-item";
                selectorItem.textContent = i + " 月";
                selectorItems.appendChild(selectorItem);
                selectorItem.onclick = function() {
                    const value = this.textContent;
                    const month = document.getElementById("ch-month-value");
                    month.textContent = value;
                    const monthScroll = document.getElementById("ch-month-items");
                    monthScroll.style.display = "none";
                    callback();
                };
            }
        },

        /**
         * initGoBackToday() init go back today
         *
         * @param {Function} callback
         */
        initGoBackToday: function(callback) {
            const today = document.getElementById("ch-today");
            today.onclick = function() {
                const date = new Date();
                const year = document.getElementById("ch-year-value");
                const month = document.getElementById("ch-month-value");
                year.textContent = date.getFullYear() + " 年";
                month.textContent = date.getMonth() + 1 + " 月";
                let time = date.getFullYear() 
                time += "-" + (date.getMonth() + 1);
                time += "-" + date.getDate();
                callback(time);
            };
        },

        /**
         * initClok() triggle the clock
         */
        initClock: function(obj) {
            let that = obj;
            window.setTimeout(function() {
                const date = new Date();
                let time = date.getFullYear();
                time += "-" + (date.getMonth() + 1);
                time += "-" + date.getDate();
                time += " " + date.getHours();
                time += ":" + date.getMinutes();
                time += ":" + date.getSeconds();
                const now = document.getElementById("ch-now");
                now.textContent = time;
                that.initClock(that);
            }, 500);
        }
    };
});
