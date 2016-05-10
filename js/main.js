define(function (require) {
    const calendar = require('./calendar');
    const detail = require('./detail');
    const header = require('./header');

    // the page refresh init function, for the month switch refresh and the 
    // app first appear
    function initCalendarPage(time) {
        const date = new Date(time);
        let dateStr = date.getFullYear();
        dateStr += "-" + (date.getMonth() + 1);
        dateStr += "-" + date.getDate();
        detail.updateDetail(dateStr);

        const headerYear = document.getElementById("ch-year-value");
        headerYear.textContent = date.getFullYear() + " 年";
        const headerMonth = document.getElementById("ch-month-value");
        headerMonth.textContent = date.getMonth() + 1 + " 月";

        const calendarCellContainer = document
            .getElementById("calendar-cell-container");
        calendar.createMonthCells(
                dateStr,
                calendarCellContainer, 
                date.getFullYear(),
                date.getMonth() + 1,
                initCalendarPage
                );
    }

    // the header selector callback function, used to update the page content
    function headerSelectorCallback(value) {
        let time = value;
        if (typeof value == "undefined") {
            const year = document.getElementById("ch-year-value");
            const month = document.getElementById("ch-month-value");
            const selected = document.getElementById("calendar-cell-selected");
            let yearValue = year.textContent.slice(0, -2);
            let monthValue = month.textContent.slice(0, -2);
            let dayValue = selected.getAttribute("data").split("-")[2];
            time = yearValue + "-" + monthValue + "-" + dayValue;
        }
        initCalendarPage(time);
    }
    
    initCalendarPage(Date.now());
    header.initHeader(headerSelectorCallback);
});

