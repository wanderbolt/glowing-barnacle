var GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbw2EuJoknXIjrbDYb8jrIJtnOlg6hbaQqEFK9udC9lIp9JsXD6kjEWRdSXVOSYrsIeg/exec";
var GOOGLE_SHEET_ID="1O2SRGHuiGE0X6KCCKcRYvOaX4g0GU8Qk8BrooeVONxE";
var SHEET_NAME="2025";
var TABLE_ID="table01";

window.readJson=function(data){
  var container=document.getElementById(TABLE_ID);
  var rows=data[SHEET_NAME];
  if(!rows||!rows.length){
    container.innerHTML="<p>No data found</p>";
    return;
  }

  container.innerHTML="";
  var table=document.createElement("table");
  table.style.width="100%";
  table.style.borderCollapse="collapse";
  container.appendChild(table);

  // Headers
  var headers=[];
  for(var k in rows[0]){headers.push(k);}

  var thead=document.createElement("thead");
  var trh=document.createElement("tr");
  for(var i=0;i<headers.length;i++){
    var th=document.createElement("th");
    th.textContent=headers[i].replace(/_/g," ");
    th.style.border="1px solid #ccc";
    th.style.padding="6px";
    trh.appendChild(th);
  }
  thead.appendChild(trh);
  table.appendChild(thead);

  // Body
  var tbody=document.createElement("tbody");
  for(var r=0;r<rows.length;r++){
    var tr=document.createElement("tr");

    for(var c=0;c<headers.length;c++){
      var key=headers[c];
      var value=rows[r][key];

      // Column 4: force 2 decimals
      if(key==="Average_Score" && value!=="" && !isNaN(value)){
        value=Number(value).toFixed(2);
      }

      // Column 5: percentage
      if(key==="Win_Rate" && value!=="" && !isNaN(value)){
        value=Math.round(Number(value)*100)+"%";
      }

      var td=document.createElement("td");
      td.textContent=value;
      td.style.border="1px solid #ccc";
      td.style.padding="6px";
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
};

(function(){
  var s=document.createElement("script");
  s.src=GOOGLE_APPS_SCRIPT_URL+
        "?id="+GOOGLE_SHEET_ID+
        "&sheet="+SHEET_NAME+
        "&callback=readJson";
  document.body.appendChild(s);
})();
