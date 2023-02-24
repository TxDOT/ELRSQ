// wizard functions

function noControlSection() {
  $("#rowInputControlSection").hide();
  $("#rowInputMilepointMeasure").hide();
  $("#rowInputRouteName").show();

  if (!($("#inputRouteName").prop("disabled"))) {
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

  if ($("#inputControlSection").prop("disabled")) {
    $("#inputRouteName").prop("disabled", true);
  }

  if ($("#inputControlSection").prop("disabled")) {
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

// end drag and drop functions
