var GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2EuJoknXIjrbDYb8jrIJtnOlg6hbaQqEFK9udC9lIp9JsXD6kjEWRdSXVOSYrsIeg/exec";
var GOOGLE_SHEET_ID = "1O2SRGHuiGE0X6KCCKcRYvOaX4g0GU8Qk8BrooeVONxE";
var SHEET_NAME = "2025";
var TABLE_ID = "table01";

function waitForTable(callback) {
    var attempts = 0;
    var interval = setInterval(function() {
        var container = document.getElementById(TABLE_ID);
        attempts++;
        if(container) { clearInterval(interval); callback(container); }
        if(attempts > 50) { clearInterval(interval); console.error("Table container not found."); }
    }, 100);
}

window.readJson = function(data){
    waitForTable(function(container){
        var rows = data[SHEET_NAME];
        if(!rows || !rows.length){ container.innerHTML = "<p>No data found.</p>"; return; }

        container.innerHTML = "";
        var table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        container.appendChild(table);

        // HEADERS
        var headers = Object.keys(rows[0]);
        var thead = document.createElement("thead");
        var trHead = document.createElement("tr");
        headers.forEach(function(h){
            var th = document.createElement("th");
            th.textContent = h.replace(/_/g," ");
            th.style.border = "1px solid #ccc";
            th.style.padding = "6px";
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        table.appendChild(thead);

        // BODY
        var tbody = document.createElement("tbody");
        rows.forEach(function(row){
            var tr = document.createElement("tr");
            headers.forEach(function(key){
                var value = row[key];

                if(key === "Average_Score" && !isNaN(value)) value = Number(value).toFixed(2);
                if(key === "Win_Rate" && !isNaN(value)) value = Math.round(Number(value)*100) + "%";

                var td = document.createElement("td");
                td.textContent = value;
                td.style.border = "1px solid #ccc";
                td.style.padding = "6px";
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
    });
};

(function(){
    var s = document.createElement("script");
    s.src = GOOGLE_APPS_SCRIPT_URL + "?id=" + GOOGLE_SHEET_ID + "&sheet=" + SHEET_NAME + "&callback=readJson";
    document.body.appendChild(s);
})();
