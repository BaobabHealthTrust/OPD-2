var ticks = 0;
var prevLen = 0;
var clicksChecker;

var selectedSets = {};
var selectedDrugs = {};

var imgvoid = 'data:image/png;base64,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';
            
function checkClicks(){
    if(ticks > 10){
        __$("searchbox").style.display = "none";
    
        __$("search").value = "";
    
        prevLen = 0;
        ticks = 0;
    }
  
    ticks++;
  
    if(__$("search").value.trim().length != prevLen){
        __$('searchbox').style.display = 'block';
        ticks = 0;
    }
  
    prevLen = __$("search").value.length;
  
    clicksChecker = setTimeout("checkClicks()", 1000);
}

function resize(){
    __$('container').style.height = (window.innerHeight - 25) + 'px';
  
    if(__$("selections")){
        if(__$("keying")){
    
            __$("selections").style.height = (__$('container').offsetHeight - __$("keying").offsetHeight - __$("cummulative").offsetHeight - 35) + "px";
                
        } else {
    
            __$("selections").style.height = (__$('container').offsetHeight - __$("cummulative").offsetHeight - 55) + "px";
    
        }
    }

    scroll(__$("scroll_me"));
}
      
function __$(id){
    return document.getElementById(id);
}
      
/*
 * We create a custom keyboard for the interface to fit on the available space
 */
function showFixedKeyboard(ctrl, global_control, abc){
    var full_keyboard = "full";
    
    var qwerty = (typeof(abc) != "undefined" ? abc : true);
    
    var div = document.createElement("div");
    div.id = "divMenu";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.margin = "5px";

    var row1 = (qwerty ? ["Q","W","E","R","T","Y","U","I","O","P"] : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]);
    var row2 = (qwerty ? ["", "A","S","D","F","G","H","J","K","L"] : ["", "K", "L", "M", "N", "O", "P", "Q", "R", "S"]);
    var row3 = (qwerty ? ["", "Z","X","C","V","B","N","M","&larr;"] : ["", "T", "U", "V", "W", "X", "Y", "Z", "&larr;"]);

    var tbl = document.createElement("div");
    tbl.bgColor = "#fff";
    tbl.id = "tblKeyboard";
    tbl.className = "table";
    tbl.style.margin = "auto";

    var tr1 = document.createElement("div");
    tr1.className = "row";

    tbl.appendChild(tr1);

    var tr2 = document.createElement("div");
    tr2.className = "row";

    tbl.appendChild(tr2);

    var tr3 = document.createElement("div");
    tr3.className = "row";

    tbl.appendChild(tr3);

    div.appendChild(tbl);
    ctrl.appendChild(div);

    var cell1 = document.createElement("div");
    cell1.className = "cell";
    cell1.style.textAlign = "center";

    tr1.appendChild(cell1);

    var cell2 = document.createElement("div");
    cell2.className = "cell";
    cell1.style.textAlign = "center";

    tr2.appendChild(cell2);

    var cell3 = document.createElement("div");
    cell3.className = "cell";
    cell1.style.textAlign = "center";

    tr3.appendChild(cell3);

    for(var i = 0; i < row1.length; i++){
        var td1 = document.createElement("button");
        td1.className = "button_blue keyboard_button";
        td1.innerHTML = row1[i];

        td1.onclick = function(){
            if(!this.innerHTML.match(/^$/)){
                __$(global_control).value += this.innerHTML.toProperCase();
                __$(global_control).value = __$(global_control).value.toProperCase();
                searchDrug();
            }
        }

        cell1.appendChild(td1);
    }

    for(var i = 0; i < row2.length; i++){
        var td2 = document.createElement("button");
        td2.innerHTML = row2[i];

        td2.onclick = function(){
            if(!this.innerHTML.match(/^$/)){
                __$(global_control).value += this.innerHTML.toProperCase();
                __$(global_control).value = __$(global_control).value.toProperCase();
                searchDrug();
            }
        }

        if(!row2[i].trim().match(/^$/)){
            td2.className = "button_blue keyboard_button";
            cell2.appendChild(td2);
        }

    }

    for(var i = 0; i < row3.length; i++){
        var td3 = document.createElement("button");
        td3.innerHTML = row3[i];

        if(row3[i] == "&larr;"){
            td3.colSpan = 2;

            td3.onclick = function(){
                __$(global_control).value = __$(global_control).value.substring(0,__$(global_control).value.length - 1);
                searchDrug();
            }
            
        } else if(row3[i].trim() == "stat<br />dose"){            
            td3.style.fontSize = "0.9em";            
            td3.style.padding = "0px";           
            td3.style.fontWeight = "bold";
            
            td3.onclick = function(){
                if (__$("optionOD"))
                    __$("optionOD").click();
                if (__$("group1_1-10"))
                    __$("group1_1-10").click();
                if (__$("group2_1"))
                    __$("group2_1").click();
            }
        } else {            

            td3.onclick = function(){
                if(!this.innerHTML.match(/^$/)){
                    __$(global_control).value += this.innerHTML.toProperCase();
                    __$(global_control).value = __$(global_control).value.toProperCase();
                    searchDrug();
                }
            }

        }

        if(!row3[i].trim().match(/^$/)){
            td3.className = "button_blue keyboard_button";
            cell3.appendChild(td3);
        }

    }

}


function showNumber(id, global_control, showDefault){
    
    var row1 = ["1","2","3"];
    var row2 = ["4","5","6"];
    var row3 = ["7","8","9"];
    var row4 = ["C","0","OK"];

    var tbl = document.createElement("table");
    tbl.className = "keyBoardTable";
    tbl.cellSpacing = 0;
    tbl.cellPadding = 3;
    tbl.id = "tblKeyboard";
    tbl.style.margin = "auto";

    var tr1 = document.createElement("tr");

    var td = document.createElement("td");
    td.rowSpan = "4";
    td.style.minWidth = "60px";
    td.style.textAlign = "center";
    td.style.verticalAlign = "top";
    
    tr1.appendChild(td);

    if(typeof(showDefault) != "undefined"){
        if(showDefault == true){
            td.innerHTML = "<span style='font-size: 1.1em; font-style: italic;'>Default</span>";
            
            var defaultButton = document.createElement("button");
            defaultButton.id = "defaultButton" + id;
            defaultButton.className = "button_blue keyboard_button";
            defaultButton.onclick = function(){
                var value = this.innerHTML.replace(/\<span\>/i, "").replace(/\<\/span\>/i, "");
        
                if(value != "Default"){
                    __$(global_control).value = value;
                } else {
                    __$(global_control).value = 0; 
                }
            }
        
            td.appendChild(defaultButton);
        }
    } 
    
    for(var i = 0; i < row1.length; i++){
        var td1 = document.createElement("td");
        td1.align = "center";
        td1.vAlign = "middle";
        td1.style.cursor = "pointer";
        td1.bgColor = "#ffffff";
        td1.width = "30px";

        tr1.appendChild(td1);

        var btn = document.createElement("button");
        btn.className = "button_blue keyboard_button";
        btn.innerHTML = "<span>" + row1[i] + "</span>";
        btn.onclick = function(){
            if(!this.innerHTML.match(/^__$/)){
                __$(global_control).value += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
            }
        }

        td1.appendChild(btn);

    }

    tbl.appendChild(tr1);

    var tr2 = document.createElement("tr");

    for(var i = 0; i < row2.length; i++){
        var td2 = document.createElement("td");
        td2.align = "center";
        td2.vAlign = "middle";
        td2.style.cursor = "pointer";
        td2.bgColor = "#ffffff";
        td2.width = "30px";

        tr2.appendChild(td2);

        var btn = document.createElement("button");
        btn.className = "button_blue keyboard_button";
        btn.innerHTML = "<span>" + row2[i] + "</span>";
        btn.onclick = function(){
            if(!this.innerHTML.match(/^$/)){
                __$(global_control).value += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
            }
        }

        td2.appendChild(btn);

    }

    tbl.appendChild(tr2);

    var tr3 = document.createElement("tr");

    for(var i = 0; i < row3.length; i++){
        var td3 = document.createElement("td");
        td3.align = "center";
        td3.vAlign = "middle";
        td3.style.cursor = "pointer";
        td3.bgColor = "#ffffff";
        td3.width = "30px";

        tr3.appendChild(td3);

        var btn = document.createElement("button");
        btn.className = "button_blue keyboard_button";
        btn.innerHTML = "<span>" + row3[i] + "</span>";
        btn.onclick = function(){
            if(!this.innerHTML.match(/^__$/)){
                __$(global_control).value += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
            }
        }

        td3.appendChild(btn);

    }

    tbl.appendChild(tr3);

    var tr4 = document.createElement("tr");

    for(var i = 0; i < row4.length; i++){
        var td4 = document.createElement("td");
        td4.align = "center";
        td4.vAlign = "middle";
        td4.style.cursor = "pointer";
        td4.bgColor = "#ffffff";
        td4.width = "30px";

        tr4.appendChild(td4);

        var btn = document.createElement("button");
        btn.innerHTML = "<span>" + row4[i] + "</span>";
        if (i == 1){
            btn.className = "button_blue keyboard_button";
        }else if (i == 0){
            btn.className = "button_red keyboard_button";
        }else if (i == 2){
            btn.className = "button_green keyboard_button";
        }
        btn.onclick = function(){
            if(this.innerHTML.match(/<span>(.+)<\/span>/)[1] == "C"){
                __$(global_control).value = __$(global_control).value.substring(0,__$(global_control).value.length - 1);
            }else if(this.innerHTML.match(/OK/)){

                var cells = __$("cummulative").getElementsByClassName("cell");
                              
                if (cells.length >= 8 && cells.length % 4 == 0 && (cells[cells.length - 3].innerHTML == "")){
                    confirmAction("Enter frequency for drug: " + cells[cells.length - 4].innerHTML)
                }else if (cells.length >= 8 && cells.length % 4 == 0 && (cells[cells.length - 2].innerHTML == "")){
                    confirmAction("Enter duration for drug: " + cells[cells.length - 4].innerHTML)
                }else{
                    document.getElementById('search').value = '';
                    switchViews('All drugs');
                }
                
            }else if(!this.innerHTML.match(/^$/)){
                __$(global_control).value += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
            }
        }

        td4.appendChild(btn);

    }

    tbl.appendChild(tr4);

    __$(id).appendChild(tbl);

}

/*
  <div class="table" style="width: 100%; height: 100%;">
    <div class="row">
      <div id="selections" class="cell" style="border: 1px solid #fff; overflow: auto; border-radius: 10px; background-color: #c8e1d3;">
      
      </div>
    </div>
    <div class="row">
      <div id="keying" class="cell" style="border: 1px solid #999; overflow: auto; text-align: center; border-radius: 10px; height: 240px;">
      
      </div>
    </div>
  </div>
 */
function loadAllDrugs(){
  
    clearTimeout(clicksChecker);
  
    __$("switcher").innerHTML = "";
  
    var table = document.createElement("div");
    table.className = "table";
    table.style.width = "100%";
    table.style.height = "100%";
  
    __$("switcher").appendChild(table);
  
    var cells = [
    {
        id: "selections",
        styles: {
            border: "1px solid #ccc",
            overflow: "auto",
            borderRadius: "10px",
            marginBottom: "2px",
            height: "230px",
            backgroundColor: "#fff" // "#c8e1d3"
        }
    },
    {
        id: "keying",
        styles: {
            border: "1px solid #999",
            overflow: "auto",
            borderRadius: "10px",
            textAlign: "center",
            height: "180px",
            paddingBottom: "2px"
        }
    }
    ];
  
    for(var i = 0; i < cells.length; i++){
        var row = document.createElement("div");
        row.className = "row";
    
        table.appendChild(row);
    
        var cell = document.createElement("div");
        cell.className = "cell";
    
        row.appendChild(cell);
    
        for(var attr in cells[i]){
    
            if(typeof(cells[i][attr]) == "object" && attr == "styles"){
        
                for(var el in cells[i][attr]){
          
                    cell.style[el] = cells[i][attr][el];
          
                }
        
            } else {
      
                cell.setAttribute(attr, cells[i][attr]);
      
            }
      
        }
    }
  
    showFixedKeyboard(__$("keying"), "search");

    listAllDrugs();
  
    clicksChecker = checkClicks();
}

function loadFrequenciesAndDuration(id){
  
    clearTimeout(clicksChecker);
  
    __$("switcher").innerHTML = "";
    __$("searchbox").value = "";
    __$("searchbox").style.display = "none";
  
    var table = document.createElement("div");
    table.className = "table";
    table.style.width = "100%";
    table.style.height = "100%";
    table.style.borderRadius = "10px";
    table.style.border = "1px solid #ccc";
  
    __$("switcher").appendChild(table);
  
    var row = document.createElement("div");
    row.className = "row";
  
    table.appendChild(row);
  
    var cell = document.createElement("div");
    cell.className = "cell";
  
    row.appendChild(cell);
  
    var container = document.createElement("div");
    container.id = "selections";
    container.style.width = "100%";
  
    cell.appendChild(container);
  
    resize();
  
    var tbl = document.createElement("div");
    tbl.className = "table";
    tbl.style.width = "100%";
  
    container.appendChild(tbl);
  
    var tr = document.createElement("div");
    tr.className = "row";
  
    tbl.appendChild(tr);
  
    var cell1 = document.createElement("div");
    cell1.className = "cell";
    cell1.style.width = "60%";
    cell1.style.border = "1px solid #ccc";
    cell1.style.height = "100%";
    cell1.style.borderRadius = "10px";
    cell1.style.textAlign = "center";
    cell1.style.backgroundColor = "#fff";
  
    tr.appendChild(cell1);
  
    var cell2 = document.createElement("div");
    cell2.className = "cell";
    cell2.style.width = "40%";
    cell2.style.border = "1px solid #ccc";
    cell2.style.height = "100%";
    cell2.style.borderRadius = "10px";
    cell2.style.textAlign = "center";
    cell2.style.backgroundColor = "#fff";
    cell2.id = "durationControl";
    cell2.style.paddingBottom = "10px";
  
    tr.appendChild(cell2);
  
    var freqHead = document.createElement("div");
    freqHead.style.paddingTop = "10px";
    freqHead.style.paddingBottom = "10px";
    freqHead.style.fontSize = "36px";
    freqHead.innerHTML = "Frequency";
    freqHead.style.width = "100%";
    freqHead.style.textAlign = "center";
  
    cell1.appendChild(freqHead);
  
    var durHead = document.createElement("div");
    durHead.style.paddingTop = "10px";
    durHead.style.paddingBottom = "10px";
    durHead.style.fontSize = "36px";
    durHead.innerHTML = "Duration (days)";
    durHead.style.width = "100%";
    durHead.style.textAlign = "center";
  
    cell2.appendChild(durHead);
  
    var ul = document.createElement("ul");
    ul.className = "listing";
    ul.style.overflow = "auto";
    ul.style.height = "400px";
    ul.style.width = "100%"
    ul.id = "ul";
    ul.style.fontSize = "0.8em";
  
    cell1.appendChild(ul);
  
    var frequencies = ["Once a day (OD)", "Twice a day (BD)", "Three a day (TDS)",
    "Four times a day (QID)", "Five times a day (5X/D)", "Six times a day (Q4HRS)",
    "In the morning (QAM)", "Once a week (QWK)", "Once a month", "Twice a month"]; //"TBD", "NOCTE",
      
    for(var i = 0; i < frequencies.length; i++){
        var li = document.createElement("li");
        li.innerHTML = frequencies[i];
        li.style.backgroundColor = (i % 2 == 0 ? "#f8f7ec" : "#fff");
        li.setAttribute("frequency", frequencies[i]);
        li.setAttribute("tag", id);
        li.style.textAlign = "left";
        li.id = "li_" + i;
    
        li.onclick = function(){
            if(this.getAttribute("frequency") != null && this.getAttribute("tag") != null){
                if(__$("row_frequency_" + this.getAttribute("tag"))){
                    __$("row_frequency_" + this.getAttribute("tag")).innerHTML = this.getAttribute("frequency");
                }
            }
      
            for(var j = 0; j < __$("ul").children.length; j++){
                __$("ul").children[j].className -= "selected";
            }
      
            this.className = "selected";
        }
    
        ul.appendChild(li);
    }
  
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.id = "duration";
    input.className = "input";
    input.style.width = "85%";
    input.style.textAlign = "center";
    input.style.fontSize = "32px";
  
    cell2.appendChild(input);
    
    showNumber("durationControl", "duration");
}

function setDuration() {
    
    var duration = null
    if (__$("duration")){
        duration = __$("duration").value;
        var keyBoardButtons = document.getElementsByClassName("keyboard_button");
        for(var i = 0; i < keyBoardButtons.length; i++){
            if(keyBoardButtons[i].innerHTML.match(/OK/i)){
                if (duration.length > 0) {
                    keyBoardButtons[i].disabled = false;
                }else{
                    keyBoardButtons[i].disabled = true;
                }
            }
        }

        var cell3s = document.getElementsByClassName("durations");

        for(var i = (cell3s.length - 1); i >= 0; i--){
            if(cell3s[i].innerHTML.length < 1 && duration != ''){
                cell3s[i].innerHTML = (duration != null ? (duration > 1 ? duration + " days" : duration + " day") : duration);
                break;
            }else if(cell3s[i].innerHTML.length > 1 && duration != ''){
                cell3s[i].innerHTML = (duration != null ? (duration > 1 ? duration + " days" : duration + " day") : duration);
                break;
            }
        }
    }
}

function loadDrugSets(){

    clearTimeout(clicksChecker);
  
    __$("switcher").innerHTML = "";
    __$("searchbox").value = "";
    __$("searchbox").style.display = "none";
  
    var table = document.createElement("div");
    table.className = "table";
    table.style.width = "100%";
    table.style.height = "100%";
  
    __$("switcher").appendChild(table);
  
    var cells = [
    {
        id: "selections",
        styles: {
            border: "1px solid #ccc",
            overflow: "auto",
            borderRadius: "10px",
            backgroundColor: "#fff"
        }
    }
    ];
  
    for(var i = 0; i < cells.length; i++){
        var row = document.createElement("div");
        row.className = "row";
    
        table.appendChild(row);
    
        var cell = document.createElement("div");
        cell.className = "cell";
    
        row.appendChild(cell);
    
        for(var attr in cells[i]){
    
            if(typeof(cells[i][attr]) == "object" && attr == "styles"){
        
                for(var el in cells[i][attr]){
          
                    cell.style[el] = cells[i][attr][el];
          
                }
        
            } else {
      
                cell.setAttribute(attr, cells[i][attr]);
      
            }
      
        }
    }
  
    listDrugsSets();
}

function listAllDrugs(){
    if(__$("selections")){
        __$("selections").innerHTML = "";
    
        var ul = document.createElement("ul");
        ul.className = "listing";
    
        __$("selections").appendChild(ul);
    
        var formulations = [];
    
        for(var i = 0; i < drugs.length; i++){
            formulations.push({
                drug: drugs[i] ,
                dose: strengths[i],
                unit: units[i],
                drug_id: drug_ids[i]
            });
        }
    
        for(var l = 0; l < formulations.length; l++){
            var li = document.createElement("li");
            li.id = "all_" + formulations[l].drug_id;
            li.innerHTML = formulations[l].drug;
            li.style.backgroundColor = (l % 2 == 0 ? "#f8f7ec" : "#fff");
            li.setAttribute("dose", formulations[l].dose);
            li.setAttribute("unit", formulations[l].unit);
            li.setAttribute("drug", formulations[l].drug);
      
            if(selectedDrugs[li.id]){
                li.className = "selected";
            }
      
            li.onclick = function(){
                if(this.getAttribute("class") != null && this.getAttribute("class").match(/selected/)){
                    removeDrug(this.id);
                } else {
                    this.className = "selected";
          
                    addDrug(this.id);
          
                    selectedDrugs[this.id] = true;
                    
                    loadFrequenciesAndDuration(this.id);
                }
            }
      
            ul.appendChild(li);
        }
    }
}

function listDrugsSets(){
    if(__$("selections")){
        __$("selections").innerHTML = "";
    
        var ul = document.createElement("ul");
        ul.className = "listing";
    
        __$("selections").appendChild(ul);
       
        var formulations = [];

        var l = 0;
        for(set_id in drug_sets) {
            
            var li = document.createElement("li");
            li.id = "sets_" + l;
            li.innerHTML = set_names[set_id] + " (" + set_descriptions[set_id] + ")";
            li.style.backgroundColor = (l % 2 == 0 ? "#f8f7ec" : "#fff");
            li.setAttribute("name", set_names[set_id]);
            li.setAttribute("description", set_descriptions[set_id]);
            li.setAttribute("set_id", set_id);
            
            if(selectedSets[li.id]){
                li.className = "selected";
            }

            li.onclick = function(){
                if(this.getAttribute("class") != null && this.getAttribute("class").match(/selected/)){

                    var set_drugs = Object.keys(drug_sets[this.getAttribute("set_id")]);

                    for (var i = 0; i < set_drugs.length; i ++){

                        removeDrug(("all_" + set_drugs[i]));
                    }

                    this.className -= "selected";

                    if(selectedSets[this.id])
                        delete selectedSets[this.id];
                    
                } else {

                    var set_drugs = Object.keys(drug_sets[this.getAttribute("set_id")]);
                   
                    for (var i = 0; i < set_drugs.length; i ++){

                        var data = drug_sets[this.getAttribute("set_id")][set_drugs[i]];
                        
                        var div = document.createElement("input");

                        // check for already prescribed drugs of same kind if time allow
                        div.id = "all_" + set_drugs[i];
                        div.style.display = "none"
                        div.style.backgroundColor = (l % 2 == 0 ? "#f8f7ec" : "#fff");
                        div.setAttribute("drug", data["drug_name"]);
                        div.setAttribute("frequency", data["frequency"]);
                        div.setAttribute("duration", data["duration"]);
                        div.setAttribute("units", data["units"]);
                        this.appendChild(div);
                        addDrug(div.id);
                        div.className = "selected";
                        selectedDrugs[div.id] = true;
                           
                    }                    
                 
                    selectedSets[this.id] = true;

                    this.className = "selected";
                }
            }

            ul.appendChild(li);

            l ++;
        }
    }
}

function confirmAction(message) {
    if (!tstMessageBar) {

        var tstMessageBar = document.createElement("div");
        tstMessageBar.id = "messageBar";
        tstMessageBar.className = "messageBar";

        tstMessageBar.innerHTML = message + "<br/>" +
        "<button onmousedown=\"__$('container')" +
        ".removeChild(document.getElementById('messageBar'));\"><span>OK</span></button>";

        tstMessageBar.style.display = "block";
        __$('container').appendChild(tstMessageBar);
    }

    return false;

}
    
function switchViews(current){
    if(current.trim().toLowerCase() == "drug sets"){
        __$("btnswitch").innerHTML = "All Drugs";
    
        loadDrugSets();
    } else {
        __$("btnswitch").innerHTML = "Drug Sets";
    
        loadAllDrugs();
    }
  
    resize();
}

function addDrug(id){
    var row = document.createElement("div");
    row.className = "row";
    row.id = "row_" + id;
  
    __$("drugs").appendChild(row);
    scroll(__$("scroll_me"));
   
    
    var drug = __$(id).getAttribute("drug");
    var frequency = __$(id).getAttribute("frequency");
    var duration = __$(id).getAttribute("duration");
  
    var cell1 = document.createElement("div");
    cell1.className = "cell borderRightBottom";
    cell1.innerHTML = drug;
    cell1.style.padding = "5px";
    cell1.style.width = "45%";
    cell1.style.verticalAlign = "middle";
  
    row.appendChild(cell1);
  
    var cell2 = document.createElement("div");
    cell2.className = "cell borderRightBottom";
    cell2.innerHTML = frequency;
    cell2.style.padding = "5px";
    cell2.style.width = "30%";
    cell2.style.textAlign = "center";
    cell2.style.verticalAlign = "middle";
    cell2.id = "row_frequency_" + id;
  
    row.appendChild(cell2);
  
    var cell3 = document.createElement("div");
    cell3.className = "cell borderRightBottom durations";
    cell3.innerHTML = (duration != null ? (duration > 1 ? duration + " days" : duration + " day") : duration);
    cell3.style.padding = "5px";
    cell3.style.textAlign = "center";
    cell3.style.verticalAlign = "middle";
    cell3.id = "row_duration_" + id;
  
    row.appendChild(cell3);
  
    var cell4 = document.createElement("div");
    cell4.className = "cell borderBottom";
    cell4.style.padding = "1px";
    cell4.style.width = "60px";
    cell4.style.textAlign = "center";
    cell4.style.verticalAlign = "middle";
  
    row.appendChild(cell4);
  
    var img = document.createElement("img");
    img.setAttribute("tag", id);
    img.setAttribute("src", imgvoid);
    img.setAttribute("height", "40px");
    img.style.cursor = "pointer";
  
    img.onclick = function(){

        if (__$("cummulative") != undefined){

            var cells = __$("cummulative").getElementsByClassName("cell");
            var lastRow = cells[cells.length - 2].id.match(/\d+/)[0];
            var currentRow = this.getAttribute("tag").match(/\d+/)[0];
            
            if (lastRow == currentRow){
                if (cells.length >= 8 && cells.length % 4 == 0 && (cells[cells.length - 3].innerHTML == "")){
                    switchViews("All Drugs");
                }else if (cells.length >= 8 && cells.length % 4 == 0 && (cells[cells.length - 2].innerHTML == "")){
                    switchViews("All Drugs");
                }
            }
        }
        removeDrug(this.getAttribute("tag"));   
    }
  
    cell4.appendChild(img);
}

function removeDrug(id){
    if(__$("row_" + id)){
        __$("drugs").removeChild(__$("row_" + id));
        scroll(__$("scroll_me"))
    }  
        
    if(selectedDrugs[id])
        delete selectedDrugs[id];
    
    if(selectedSets[id])
        delete selectedSets[id];
          
    if(__$(id)){
        
        __$(id).className -= "selected";
        
    }
}

// Supporting function to allow a humanized Concept Name display
String.prototype.toProperCase = function()
{
    return this.toLowerCase().replace(/^(.)|\s(.)/g,
        function($1) {
            return $1.toUpperCase();
        });
}

// Stub for searching the drugs
function searchDrug(){
    var search_str = document.getElementById('search').value;
                                                                                  
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }else{// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var results = xmlhttp.responseText;
            if(results) {
                var searchedDrugs = JSON.parse(results);
                drugs = [];
                strengths = [];
                units = [];
                drug_ids = [];
                for(drug_id in searchedDrugs) {
                    drugs.push(searchedDrugs[drug_id].name);
                    strengths.push(searchedDrugs[drug_id].dose_strength);
                    units.push(searchedDrugs[drug_id].unit);
                    drug_ids.push(drug_id);
                }
                listAllDrugs();
            }
        }
    }
    xmlhttp.open("GET","/prescriptions/search_for_drugs?search_str=" + search_str, true);
    xmlhttp.send();
}

function clearAll() {
    
    for(selected_drug in selectedDrugs) {
        removeDrug(selected_drug);
    }
  
    for(selected_set in selectedSets) {
        removeDrug(selected_set);
    }
    document.getElementById('search').value = '';

    if (Object.keys(drug_sets).length > 0){
        switchViews('Drug Sets');
    }else{
        switchViews('All Drugs');
    }
}

if (Object.keys(drug_sets).length > 0){
    loadDrugSets();
}else{
    loadAllDrugs();
}

function scroll(div){

    div.scrollTop = div.scrollHeight - div.clientHeight;
}
resize();
