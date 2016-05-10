define(["./utils"], function(utils) {
    return {
        /**
         * createCell() create a calendar cell with given info
         * 
         * @param {String} selected
         * @param {Object} info {year: xxx, month: xxx, day: xxx}
         * @param {Boolean} isCurrentMonth
         * @param {Function} callback
         * @return {Object} a Dom object
         */
        createCell: function (selected, info, isCurrentMonth, callback) {
            const cell = document.createElement("div");
            cell.className = "calendar-cell";
            if (!isCurrentMonth) {
                cell.style.opacity = 0.5;
            }

            // set callback info
            cell.onclick = function() {
                const time = this.getAttribute("data");
                callback(time);
            };
            const data = info["year"] + "-" + info["month"] + "-" + info["day"];
            cell.setAttribute("data", data);

            // check whether the cell is been selected
            if (selected == data) {
                cell.setAttribute("id", "calendar-cell-selected");
            }

            // set holiday
            if (info["worktime"] == 2) {
                const holiday = document.createElement("div");
                holiday.textContent = "休";
                holiday.className = "cc-holiday";
                cell.appendChild(holiday);
            }

            // set solar day info
            const solarDay = document.createElement("div");
            solarDay.textContent = info["day"];
            solarDay.className = "cc-solar-day";
            cell.appendChild(solarDay);

            // set lunar day info or holiday info
            const detailDay = document.createElement("div");
            if (typeof info["lunarFestival"] != "undefined") {
                detailDay.textContent = info["lunarFestival"];
                detailDay.className = "cc-lunar-holiday";
            } else if (typeof info["solarFestival"] != "undefined") {
                detailDay.textContent = info["solarFestival"];
                detailDay.className = "cc-solar-holiday";
            } else if (typeof info["term"] != "undefined") {
                detailDay.textContent = info["term"];
                detailDay.className = "cc-lunar-term";
            }else {
                detailDay.textContent = info["lunarDayName"];
                detailDay.className = "cc-lunar-day";
            }
            cell.appendChild(detailDay);

            return cell;
        },

        /**
         * createMonthCells() init a page of a month
         * 
         * @param {String} selected
         * @param {Object} root (a dom node) 
         * @param {Number} year
         * @param {Number} month
         */
        createMonthCells: function (selected, root, year, month, callback) {
            root.innerHTML = "";
            const monthInfo = utils.monthInfo(year, month, true);
            for (var i = 0; i < monthInfo.monthData.length; i++) {
                let isCurrentMonth = monthInfo.monthData[i]["month"] == month;
                let tmp = this.createCell(
                        selected,
                        monthInfo.monthData[i],
                        isCurrentMonth,
                        callback
                        );
                root.appendChild(tmp);
            }
        }
    };
});
