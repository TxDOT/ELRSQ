// status functions

function GreenToYellow() {
  $('#readyIndicator').removeClass('green');
  $('#busyIndicator').addClass('yellow');
  $('#readyBadge').hide();
  $('#busyBadge').show();
}

function YellowToGreen() {
  $('#busyIndicator').removeClass('yellow');
  $('#readyIndicator').addClass('green');
  $('#busyBadge').hide();
  $('#readyBadge').show();
}

function ToRed() {
  $('#busyIndicator').removeClass('yellow');
  $('#readyIndicator').removeClass('green');
  $('#busyBadge').hide();
  $('#readyBadge').hide();
  $('#errorIndicator').addClass('red');
  $('#errorBadge').show();
}

function ToGreen() {
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


// get current LRM

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

  if (currentLRM == `mapcursor-tab`) {
    $("#viewDiv").css('cursor', 'crosshair');
  } else {
    $("#viewDiv").css('cursor', 'move');
  }
});

// end get current LRM