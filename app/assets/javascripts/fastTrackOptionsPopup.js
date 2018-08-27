
var selectFastTrackOptions = {};
var selectedFastTrackConcepts = []
uncheckedImg = '/touchscreentoolkit/lib/images/unticked.jpg';
checkedImg = '/touchscreentoolkit/lib/images/ticked.jpg';

/*var fastTrackOptions = "<table id='malariaDrugs' cellspacing='0px' style='width:80%; left:10%; margin-left: 101px; font-size: 14pt;'>";
fastTrackOptions += "<tr>";
fastTrackOptions += "<td style='border-bottom: 1px solid black; padding:8px;'>&nbsp;</td>"
fastTrackOptions += "<td style='border: 0px solid black; padding:8px;'>&nbsp;</td>"
fastTrackOptions += "</tr>";

uncheckedImg = '/touchscreentoolkit/lib/images/unticked.jpg';
checkedImg = '/touchscreentoolkit/lib/images/ticked.jpg';

for (var pos in fastTrackAssesmentConcepts){
    concept_name = fastTrackAssesmentConcepts[pos]["concept_name"];
    concept_id = fastTrackAssesmentConcepts[pos]["concept_id"];
    
    fastTrackOptions += "<tr id='' row_id = '" + concept_id + "' onclick = 'highLightSelectedRow(this);' style='cursor: pointer;' >";
    fastTrackOptions += "<td style='border-bottom: 1px solid black; padding:8px; text-align: left;'>" + concept_name + "</td>";
    fastTrackOptions += "<td style='border-bottom: 0px solid black; text-align: center;'><img id='img_" + concept_id + "' src='" + uncheckedImg + "'></img></td>";
    fastTrackOptions += "</tr>";
}*/

/*html = "<br /><center><i style='color: green; font-size: 15pt; font-weight: bold;'>If all boxes ticked, inform patient that his/her next visit could be a <b style='color: red;'>Fast Track Visit</b>";
html+= " to reduce waiting time. Ask what he/she prefers<i></center>";

fastTrackOptions += "<tr>";
fastTrackOptions += "<td colspan='2' style=''>" + html + "</td>"
fastTrackOptions += "</tr>";*/

//fastTrackOptions += "</table>"
var fastTrackOptions;
leftTable = "<table cellspacing='0px' style='width:40%; left:10%; margin-left: 101px; font-size: 14pt;'>";
leftTable += "<tr>";
leftTable += "<td style='border-bottom: 1px solid black; padding:8px;'>&nbsp;</td>"
leftTable += "<td style='border: 0px solid black; padding:8px;'>&nbsp;</td>"
leftTable += "</tr>";

leftTable += "<tr id='' row_id = '9533' onclick = 'highLightSelectedRow(this);' style='cursor: pointer;' >";
leftTable += "<td style='border-bottom: 1px solid black; padding:8px; text-align: left;'>Adult  18 years +</td>";
leftTable += "<td style='border-bottom: 0px solid black; text-align: center;'><img id='img_9533' src='" + uncheckedImg + "'></img></td>";
leftTable += "</tr>";

leftTable += "<tr id='' row_id = '9534' onclick = 'highLightSelectedRow(this);' style='cursor: pointer;' >";
leftTable += "<td style='border-bottom: 1px solid black; padding:8px; text-align: left;'>on ART for 12 months </td>";
leftTable += "<td style='border-bottom: 0px solid black; text-align: center;'><img id='img_9534' src='" + uncheckedImg + "'></img></td>";
leftTable += "</tr>";

leftTable += "<tr id='' row_id = '9535' onclick = 'highLightSelectedRow(this);' style='cursor: pointer;' >";
leftTable += "<td style='border-bottom: 1px solid black; padding:8px; text-align: left;'>on 1st Line ART</td>";
leftTable += "<td style='border-bottom: 0px solid black; text-align: center;'><img id='img_9535' src='" + uncheckedImg + "'></img></td>";
leftTable += "</tr>";

leftTable += "<tr id='' row_id = '9536' onclick = 'highLightSelectedRow(this);' style='cursor: pointer;' >";
leftTable += "<td style='border-bottom: 1px solid black; padding:8px; text-align: left;'>Last VL < 1000</td>";
leftTable += "<td style='border-bottom: 0px solid black; text-align: center;'><img id='img_9536' src='" + uncheckedImg + "'></img></td>";
leftTable += "</tr>";

leftTable += "<tr id='' row_id = '9537' onclick = 'highLightSelectedRow(this);' style='cursor: pointer;' >";
leftTable += "<td style='border-bottom: 1px solid black; padding:8px; text-align: left;'>Good adherence</td>";
leftTable += "<td style='border-bottom: 0px solid black; text-align: center;'><img id='img_9537' src='" + uncheckedImg + "'></img></td>";
leftTable += "</tr>";

leftTable += "</table>";

rightTable = "<table cellspacing='0px' style='width:40%; right:4%; font-size: 14pt; position: absolute; top: 64px;'>";
rightTable += "<tr>";
rightTable += "<td style='border-bottom: 1px solid black; padding:8px;'>&nbsp;</td>"
rightTable += "<td style='border: 0px solid black; padding:8px;'>&nbsp;</td>"
rightTable += "</tr>";

if (gender.toUpperCase() == 'F'){
    rightTable += "<tr id='' row_id = '9538' onclick = 'highLightSelectedRow(this);' style='cursor: pointer;' >";
    rightTable += "<td style='border-bottom: 1px solid black; padding:8px; text-align: left;'>Not Pregnant / Breastfeeding</td>";
    rightTable += "<td style='border-bottom: 0px solid black; text-align: center;'><img id='img_9538' src='" + uncheckedImg + "'></img></td>";
    rightTable += "</tr>";
}

rightTable += "<tr id='' row_id = '9539' onclick = 'highLightSelectedRow(this);' style='cursor: pointer;' >";
rightTable += "<td style='border-bottom: 1px solid black; padding:8px; text-align: left;'>No Side Effects, OI / TB</td>";
rightTable += "<td style='border-bottom: 0px solid black; text-align: center;'><img id='img_9539' src='" + uncheckedImg + "'></img></td>";
rightTable += "</tr>";

rightTable += "<tr id='' row_id = '9540' onclick = 'highLightSelectedRow(this);' style='cursor: pointer;' >";
rightTable += "<td style='border-bottom: 1px solid black; padding:8px; text-align: left;'>No BP / diabetes treatment</td>";
rightTable += "<td style='border-bottom: 0px solid black; text-align: center;'><img id='img_9540' src='" + uncheckedImg + "'></img></td>";
rightTable += "</tr>";

//rightTable += "<tr id='' row_id = '9541' onclick = 'highLightSelectedRow(this);' style='cursor: pointer;' >";
//rightTable += "<td style='border-bottom: 1px solid black; padding:8px; text-align: left;'>No need for Depo at ART</td>";
//rightTable += "<td style='border-bottom: 0px solid black; text-align: center;'><img id='img_9541' src='" + uncheckedImg + "'></img></td>";
//rightTable += "</tr>";

rightTable += "</table>";

fastTrackOptions = leftTable;
fastTrackOptions += rightTable;

function fastTrackAssesmentPopup(){
    content = document.getElementById('content');
    popupDiv = document.createElement('div');
    popupDiv.className = 'popup-div';
    popupDiv.style.backgroundColor = '#F4F4F4';
    popupDiv.style.border = '2px solid #E0E0E0';
    popupDiv.style.borderRadius = '15px';
    popupDiv.style.height = '600px';
    popupDiv.style.top = '2%';
    popupDiv.style.left = '3%';
    popupDiv.style.marginTop = '-20px';
    popupDiv.style.marginLeft = '-20px';
    popupDiv.style.position = 'absolute';
    popupDiv.style.marginTop = '29px';
    popupDiv.style.width = '95%';
    popupDiv.style.zIndex = '991';
    content.appendChild(popupDiv);

    popupHeader = document.createElement('div');
    popupHeader.className = 'popup-header';
    popupHeader.innerHTML = 'Check eligibility for <span style="color:green; ">Fast Track</span> at Next Visit<br /><br />';
    popupHeader.style.borderBottom = '2px solid #7D9EC0';
    popupHeader.style.backgroundColor = '#FFFFFF';
    popupHeader.style.paddingTop = '5px';
    popupHeader.style.borderRadius = '15px 15px 0 0';
    popupHeader.style.fontSize = '16pt';
    popupHeader.style.textAlign = 'center';
    popupHeader.style.fontWeight = 'bolder';


    popupDiv.appendChild(popupHeader);
    popupData = document.createElement('div');
    popupData.className = 'popup-data';
    popupData.innerHTML = fastTrackOptions;
    popupDiv.appendChild(popupData);
    popupFooter = document.createElement('div');
    popupFooter.className = 'popup-footer';
    popupFooter.style.position = 'absolute';
    popupFooter.style.marginBottom = '60px';

    clinicVisitButton = document.createElement('span');
    clinicVisitButton.className = 'clinicVisitButton FastTrackBtn';
    clinicVisitButton.innerHTML = 'Book Regular <br />Clinic Visit';
    clinicVisitButton.style.backgroundImage = 'none';
    clinicVisitButton.style.border = '1px solid transparent';
    clinicVisitButton.style.borderRadius = '4px';
    clinicVisitButton.style.cursor = 'pointer';
    clinicVisitButton.style.display = 'inline-block';
    clinicVisitButton.style.fontSize = '20px';
    clinicVisitButton.style.fontWeight = 'bolder';
    clinicVisitButton.style.lineHeight = '1.94857';
    clinicVisitButton.style.position = 'absolute';
    clinicVisitButton.style.bottom = '10px';
    clinicVisitButton.style.padding = '9px 86px';
    clinicVisitButton.style.left = '10px';
    clinicVisitButton.style.textAlign = 'center';
    clinicVisitButton.style.verticalAlign = 'middle';
    clinicVisitButton.style.whiteSpace = 'nowrap';
    clinicVisitButton.style.backgroundColor = '#00B2EE';
    clinicVisitButton.style.color = 'white';
    
    clinicVisitButton.onclick = function(){
        //hideLibPopup();
        //notifier();
        setClinicVisit();
    }
    
    popupDiv.appendChild(clinicVisitButton);

    cancelButton = document.createElement('span');
    cancelButton.className = 'cancelButton FastTrackBtn';
    cancelButton.innerHTML = 'Cancel';
    cancelButton.style.backgroundImage = 'none';
    cancelButton.style.border = '1px solid transparent';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.style.display = 'inline-block';
    cancelButton.style.fontSize = '20px';
    cancelButton.style.fontWeight = 'bolder';
    cancelButton.style.lineHeight = '1.94857';
    cancelButton.style.position = 'absolute';
    cancelButton.style.bottom = '10px';
    cancelButton.style.padding = '9px 75px';
    cancelButton.style.textAlign = 'center';
    cancelButton.style.verticalAlign = 'middle';
    cancelButton.style.whiteSpace = 'nowrap';
    cancelButton.style.backgroundColor = '#DC143C';
    cancelButton.style.borderColor = '#6495ED';
    cancelButton.style.color = 'white';
    cancelButton.style.left = '22.6%';
    cancelButton.onclick = function(){
        cancelFastTrackPopup();
    }

    //popupDiv.appendChild(cancelButton);

    fastTrackVisitButton = document.createElement('span');
    fastTrackVisitButton.className = 'fastTrackVisitButton FastTrackBtn';
    fastTrackVisitButton.innerHTML = 'Book Fast <br />Track Visit';
    fastTrackVisitButton.style.backgroundImage = 'none';
    fastTrackVisitButton.style.border = '1px solid transparent';
    fastTrackVisitButton.style.borderRadius = '4px';
    fastTrackVisitButton.style.cursor = 'pointer';
    fastTrackVisitButton.style.display = 'inline-block';
    fastTrackVisitButton.style.fontSize = '20px';
    fastTrackVisitButton.style.fontWeight = 'bolder';
    fastTrackVisitButton.style.lineHeight = '1.94857';
    fastTrackVisitButton.style.position = 'absolute';
    fastTrackVisitButton.style.bottom = '10px';
    //fastTrackVisitButton.style.right = '0px';
    fastTrackVisitButton.style.padding = '9px 83px';
    fastTrackVisitButton.style.right = '10px';
    fastTrackVisitButton.style.textAlign = 'center';
    fastTrackVisitButton.style.verticalAlign = 'middle';
    fastTrackVisitButton.style.whiteSpace = 'nowrap';
    fastTrackVisitButton.style.backgroundColor = '#228B22';
    fastTrackVisitButton.style.borderColor = '#00688B';
    fastTrackVisitButton.style.color = 'white';
    //fastTrackVisitButton.style.left = '81%';
    fastTrackVisitButton.onclick = function(){
        //hideLibPopup();
        setFastTrackVisit();
    //selectMalariaDrug = {}; //Remove the selected drug
    //removeDrugFromGenerics();
    }

    popupDiv.appendChild(fastTrackVisitButton);

    popupDiv.appendChild(popupFooter);

    popupCover = document.createElement('div');
    popupCover.className = 'popup-cover';
    popupCover.style.position = 'absolute';
    popupCover.style.backgroundColor = 'black';
    popupCover.style.width = '100%';
    popupCover.style.height = '102%';
    popupCover.style.left = '0%';
    popupCover.style.top = '0%';
    popupCover.style.zIndex = '990';
    popupCover.style.opacity = '0.65';
    content.appendChild(popupCover);

//loadPreviousSelectedDrug(); //Preselect previously selected values
}

function highLightSelectedRow(obj){
    rowID = obj.getAttribute('row_id');
    concept_id = rowID;
    img = document.getElementById('img_' + rowID );
    img_src_array = img.getAttribute("src").split("/");
    src = img_src_array[img_src_array.length - 1];
    if (src == 'unticked.jpg'){
        img.src = checkedImg;
        obj.style.backgroundColor = 'lightBlue';
        selectedFastTrackConcepts.push(concept_id);
    }else{
        var index = selectedFastTrackConcepts.indexOf(concept_id);
        if (index > -1) {
            selectedFastTrackConcepts.splice(index, 1);
        }
        obj.style.backgroundColor = '';
        img.src = uncheckedImg;


    }

}

function disableEnableFastTrackVisitButton(){
    fastTrackVisitButton = document.getElementsByClassName("fastTrackVisitButton")[0];
    if (fastTrackVisitButton){
        if (selectedFastTrackConcepts.length < 9){
            fastTrackVisitButton.style.backgroundColor = '#8FBC8F';
            fastTrackVisitButton.onclick = function(){

            }
        }else{
            fastTrackVisitButton.style.backgroundColor = '#228b22';
            fastTrackVisitButton.onclick = function(){
                setFastTrackVisit();
            //hideLibPopup();
            }
        }
    }
}

//window.setInterval("disableEnableFastTrackVisitButton()", 200);

function hideLibPopup(){
    popupCover = document.getElementsByClassName("popup-cover")[0];
    popupDiv = document.getElementsByClassName("popup-div")[0];
    if (popupCover) popupCover.parentNode.removeChild(popupCover);
    if (popupDiv) popupDiv.parentNode.removeChild(popupDiv);
}

function notifier(){
    content = document.getElementById('content');
    popupDiv = document.createElement('div');
    popupDiv.className = 'popup-div-notifier';
    popupDiv.style.backgroundColor = 'white';
    popupDiv.style.border = '2px solid #DDDD';
    popupDiv.style.borderRadius = '15px';
    popupDiv.style.height = '100px';
    popupDiv.style.top = '2%';
    popupDiv.style.left = '32%';
    popupDiv.style.marginTop = '-20px';
    popupDiv.style.position = 'absolute';
    popupDiv.style.marginTop = '158px';
    popupDiv.style.width = '600px';
    popupDiv.style.zIndex = '991';
    content.appendChild(popupDiv);

    popupHeader = document.createElement('div');
    popupHeader.className = 'popup-header-notifier';
    popupHeader.innerHTML = 'Notifications';
    popupHeader.style.borderBottom = '2px solid #7D9EC0';
    popupHeader.style.backgroundColor = '#FFFFFF';
    popupHeader.style.paddingTop = '5px';
    popupHeader.style.paddingLeft = '5px';
    popupHeader.style.borderRadius = '15px 15px 0 0';
    popupHeader.style.fontSize = '14pt';
    popupHeader.style.fontWeight = 'bolder';


    popupDiv.appendChild(popupHeader);
    popupData = document.createElement('div');
    popupData.className = 'popup-data-notifier';
    popupData.innerHTML = "Test Data Heidlshdlshdlshdlhsdlsdhl"
    popupData.style.fontSize = '18pt';
    popupData.style.fontWeight = 'bolder';
    popupData.style.textAlign = 'center';
    popupDiv.appendChild(popupData);
    popupFooter = document.createElement('div');
    popupFooter.className = 'popup-footer-notifier';
    popupFooter.style.position = 'absolute';
    popupFooter.style.marginBottom = '60px';

    popupCover = document.createElement('div');
    popupCover.className = 'popup-cover-notifier';
    popupCover.style.position = 'absolute';
    popupCover.style.backgroundColor = 'black';
    popupCover.style.width = '100%';
    popupCover.style.height = '102%';
    popupCover.style.left = '0%';
    popupCover.style.top = '0%';
    popupCover.style.zIndex = '990';
    popupCover.style.opacity = '0.65';
    content.appendChild(popupCover);
}

function hideNotifier(){
    popupCover = document.getElementsByClassName("popup-cover-notifier")[0];
    popupDiv = document.getElementsByClassName("popup-div-notifier")[0];
    if (popupCover) popupCover.parentNode.removeChild(popupCover);
    if (popupDiv) popupDiv.parentNode.removeChild(popupDiv);
}


function cancelFastTrackPopup(){
    hideLibPopup();
}

var notifierInterval = window.setInterval("hideNotifier();", 2000);