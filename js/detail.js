define(["./utils"], function(utils) {
    return {
        // the date info
        basicData: ["日", "一", "二", "三", "四", "五", "六"],

        /**
         * updateDetail() update the detail panel info
         *
         * @param {String} time
         */
        updateDetail: function(time) {
            const arr = time.split("-");
            const info = utils.dayInfo(
                    Number(arr[0]), Number(arr[1]), Number(arr[2])
                    ); 

            let tmp;
            
            // set the date
            const dateInfo = document.getElementById("cd-date-info");
            tmp = new Date(time);
            tmp = time + " 星期" + this.basicData[tmp.getDay()];
            dateInfo.innerHTML = tmp;

            // set the big date number
            const dateNumber = document.getElementById("cd-date-number");
            dateNumber.innerHTML = arr[2];

            const lunarItem = document
                .getElementsByClassName("cd-lunar-item");
            // set lunar day
            tmp = "农历" + info["lunarMonthName"] + info["lunarDayName"];
            lunarItem[0].textContent = tmp;
            
            // set gan zhi
            tmp = info["GanZhiYear"] + "年";
            tmp += info["GanZhiMonth"] + "月";
            tmp += info["GanZhiDay"] + "日";
            lunarItem[1].textContent = tmp;

            // set zodiac
            tmp = info["zodiac"];
            lunarItem[2].textContent = tmp;

            // set should
            const lunarShould = document.getElementById("cd-lunar-should-items");
            lunarShould.innerHTML = "";
            if (typeof info["y"] != "undefined") {
                const yItems = info["y"].split(".");
                for (var i = 0; i < yItems.length - 1; i++) {
                    let item = document.createElement("div");
                    item.className = "cd-lunar-should-item";
                    item.textContent = yItems[i];
                    lunarShould.appendChild(item);
                }
            }

            // set avoid
            const lunarAvoid = document.getElementById("cd-lunar-avoid-items");
            lunarAvoid.innerHTML = "";
            if (typeof info["j"] != "undefined") {
                const yItems = info["j"].split(".");
                for (var i = 0; i < yItems.length - 1; i++) {
                    let item = document.createElement("div");
                    item.className = "cd-lunar-avoid-item";
                    item.textContent = yItems[i];
                    lunarAvoid.appendChild(item);
                }
            }
        }
    };
});
