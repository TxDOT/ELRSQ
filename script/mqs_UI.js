function GreenToYellow(){
    document.getElementById('readyIndicator').classList.replace('green', 'yellow');
}

function YellowToGreen(){
    document.getElementById('readyIndicator').classList.replace('yellow', 'green');
}

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


