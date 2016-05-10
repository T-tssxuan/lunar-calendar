define(function(require ) {
    var LunarCalendar = require("./lib/LunarCalendar");
    var HolidayInfo = require("./data/holiday");	

    // get the huang li info
    var HL = {};
    HL["2008"] = require("./data/hl2008");
    HL["2009"] = require("./data/hl2009");
    HL["2010"] = require("./data/hl2010");
    HL["2011"] = require("./data/hl2011");
    HL["2012"] = require("./data/hl2012");
    HL["2013"] = require("./data/hl2013");
    HL["2014"] = require("./data/hl2014");
    HL["2015"] = require("./data/hl2015");
    HL["2016"] = require("./data/hl2016");
    HL["2017"] = require("./data/hl2017");
    HL["2018"] = require("./data/hl2018");
    HL["2019"] = require("./data/hl2019");
    HL["2020"] = require("./data/hl2020");

    // init the holiday info
    LunarCalendar.setWorktime(HolidayInfo);
    
    return {
        /**
         * monthInfo() encapsulate the LunarCalendar
         *
         * @param {Number} year
         * @param {Number} month
         * @param {Boolean} fill 
         * @return {Object} the whole month info
         */
        monthInfo: function (year, month, fill) {
            return LunarCalendar.calendar(year, month, fill);
        },
        /**
         * dayInfo() ecapsulate the LunarCalendar
         *
         * @param {Number} year
         * @param {Number} month
         * @param {Number} day
         * @return {Object} the solarday correspond lunar day info
         */
        dayInfo: function (year, month, day) {
            const result = LunarCalendar.solarToLunar(year, month, day);
            if (year < 2008 || year > 2020) {
                return result;
            }
            let idx = "d";
            if (month < 10) {
                idx += "0" + month;
            } else {
                idx += month;
            }
            if (day < 10) {
                idx += "0" + day;
            } else {
                idx += day;
            }
            result["y"] = HL[year + ""][idx]["y"];
            result["j"] = HL[year + ""][idx]["j"];
            return result;
        }
    };
});
