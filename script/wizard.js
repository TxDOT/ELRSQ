function noControlSection() {
    $("#rowInputControlSection").hide();
    $("#rowInputMilepointMeasure").hide();
    $("#rowInputRouteName").show();
    $("#rowInputDistanceFromOrigin").show();
}

function noMilepointMeasure() {
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
}

function noReferenceMarker() {
    $("#rowInputReferenceMarker").hide();
    $("#rowInputCoordinates").show();
}

function restartWizard() {
    $("#rowInputCoordinates").hide();
    $("#rowInputRouteName").hide();
    $("#rowInputDistanceFromOrigin").hide();
    $("#rowInputReferenceMarker").hide();
    $("#rowInputControlSection").show();
    $("#rowInputMilepointMeasure").show();
}


