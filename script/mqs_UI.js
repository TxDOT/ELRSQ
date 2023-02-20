// status functions
function GreenToYellow(){
  $('#readyIndicator').removeClass('green');
  $('#busyIndicator').addClass('yellow');
  $('#readyBadge').hide();
  $('#busyBadge').show();
}

function YellowToGreen(){
  $('#busyIndicator').removeClass('yellow');
  $('#readyIndicator').addClass('green');
  $('#busyBadge').hide();
  $('#readyBadge').show();
}

function ToRed(){
  $('#busyIndicator').removeClass('yellow');
  $('#readyIndicator').removeClass('green');
  $('#busyBadge').hide();
  $('#readyBadge').hide();
  $('#errorIndicator').addClass('red');
  $('#errorBadge').show();
}

function ToGreen(){
  $('#busyIndicator').removeClass('yellow');
  $('#errorIndicator').removeClass('red');
  $('#readyIndicator').addClass('green');
  $('#busyBadge').hide();
  $('#errorBadge').hide();
  $('#readyBadge').show();
}



// end status functions


// wizard functions
function noControlSection() {
    $("#rowInputControlSection").hide();
    $("#rowInputMilepointMeasure").hide();
    $("#rowInputRouteName").show();

    if (!($("#inputRouteName").prop("disabled"))){
        $("#rowInputDistanceFromOrigin").show();
    }
    $("#inputRouteName").prop("disabled", false);
    
}

function noMilepointMeasure() {
    $("#inputControlSection").prop("disabled", true);
    $("#rowInputMilepointMeasure").hide();
    $("#rowInputRouteName").show();
    $("#rowInputDistanceFromOrigin").show();
}

function noDistanceFromOrigin() {
    $("#rowInputDistanceFromOrigin").hide();
    $("#rowInputReferenceMarker").show();
}

function noRouteName() {
    $("#rowInputRouteName").hide();
    $("#rowInputDistanceFromOrigin").hide();
    $("#rowInputReferenceMarker").hide();

    $("#rowInputCoordinates").show();
    $("#inputControlSection").prop("disabled", false);
}

function noReferenceMarker() {
    console.log("noReferenceMarker");
    $("#rowInputReferenceMarker").hide();
    $("#rowInputCoordinates").show();

    if ($("#inputControlSection").prop("disabled")){
         $("#inputRouteName").prop("disabled", true);
    }

    if ($("#inputControlSection").prop("disabled")){
        $("#rowInputMatchCoordinates").show();
    }

    /*if (!($("#rowInputControlSection").prop("hidden"))) {
        $("#rowInputMatchCoordinates").show();
    }*/

}

function restartWizard() {
    $("#rowInputMatchCoordinates").hide();
    $("#rowInputCoordinates").hide();
    $("#inputRouteName").prop("disabled", false);
    $("#rowInputRouteName").hide();
    $("#rowInputDistanceFromOrigin").hide();
    $("#rowInputReferenceMarker").hide();
    $("#inputControlSection").prop("disabled", false);
    $("#rowInputControlSection").show();
    $("#rowInputMilepointMeasure").show();
}

// end wizard functions



// drag and drop functions 
//from https://codepen.io/incentive/pen/mdwoVqO

/* Bootstrap 5 JS included */

// Drag and drop - single or multiple image files
// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
// https://codepen.io/joezimjs/pen/yPWQbd?editors=1000


// Initialise ALL dropzones
const dropZones = document.querySelectorAll('.upload_dropZone');
for (const zone of dropZones) {
  eventHandlers(zone);
}

function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
};

function highlight(event) {
  event.target.classList.add('highlight');
}

function unhighlight(event) {
  event.target.classList.remove('highlight');
}

function getInputRefs(element) {
  console.log("getInputRefs");
  const zone = element.closest('.upload_dropZone') || false;
  const input = zone.querySelector('input[type="file"]') || false;
  return { input: input };
}

function handleDrop(event) {
  console.log("handleDrop");
  const dataRefs = getInputRefs(event.target);
  console.log("dataRefs");
  console.log(dataRefs);
  dataRefs.files = event.dataTransfer.files;
  handleFiles(dataRefs);
  console.log("dataRefs.files");
  console.log(dataRefs.files);
  handleUpload2(dataRefs.files[0]); //experimental
}


function eventHandlers(zone) {

  const dataRefs = getInputRefs(zone);
  if (!dataRefs.input) return;

  // Prevent default drag behaviors
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    zone.addEventListener(event, preventDefaults, false);
    document.body.addEventListener(event, preventDefaults, false);
  });

  // Highlighting drop area when item is dragged over it
  ;['dragenter', 'dragover'].forEach(event => {
    zone.addEventListener(event, highlight, false);
  });
  ;['dragleave', 'drop'].forEach(event => {
    zone.addEventListener(event, unhighlight, false);
  });

  // Handle dropped files
  zone.addEventListener('drop', handleDrop, false);

  // Handle browse selected files
  dataRefs.input.addEventListener('change', event => {
    dataRefs.files = event.target.files;
    handleFiles(dataRefs);
  }, false);

}


// Handle both selected and dropped files
function handleFiles(dataRefs) {
  console.log("handleFiles");

  let files = [...dataRefs.files];
  console.log(files);
  
  if (!files.length) return;
  dataRefs.files = files;
}

// end drag and drop functions


// get current LRM

let currentLRM = `coordinates-tab`;

$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    currentLRM = $(e.target).attr("id") // activated tab
    console.log(currentLRM);

    if (currentLRM == `referencemarker-tab`) {
        $("#tmpl-latlon").hide();
        $("#tmpl-controlsection").hide();
        $("#tmpl-dfo").hide();
        $("#tmpl-field").show();
    } else if (currentLRM == `controlsection-tab`) {
        $("#tmpl-latlon").hide();
        $("#tmpl-controlsection").show();
        $("#tmpl-dfo").hide();
        $("#tmpl-field").hide();
    } else if (currentLRM == `distancefromorigin-tab`) {
        $("#tmpl-latlon").hide();
        $("#tmpl-controlsection").hide();
        $("#tmpl-dfo").show();
        $("#tmpl-field").hide();
    } else {
        $("#tmpl-latlon").show();
        $("#tmpl-controlsection").hide();
        $("#tmpl-dfo").hide();
        $("#tmpl-field").hide();
    }
	
});


// end get current LRM



