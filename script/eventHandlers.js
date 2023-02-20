
$("#convert1").on('click', function () { lrsQuery(1, 1, 'inputLatitude', 'inputLongitude'); });
$("#convert2").on('click', function () { lrsQuery(2, 1, 'inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement'); });
$("#convert3").on('click', function () { lrsQuery(3, 1, 'inputControlSection', 'inputMilepointMeasure'); });
$("#convert4").on('click', function () { lrsQuery(4, 1, 'inputRouteName_4', 'inputDistanceFromOrigin'); });


$("#convert1-2point").on('click', function () { lrsDualQuery(1, 0, 'inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude','inputEndLongitude'); });
$("#convert2-2point").on('click', function () { lrsDualQuery(2, 0, 'inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'); });
$("#convert3-2point").on('click', function () { lrsDualQuery(3, 0, 'inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure'); });
$("#convert4-2point").on('click', function () { lrsDualQuery(4, 0, 'inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'); });




//TODO change to use selector other than ID
$("#reset1").on('click', function () { clearResults(); });
$("#reset2").on('click', function () { clearResults(); });
$("#reset3").on('click', function () { clearResults(); });
$("#reset4").on('click', function () { clearResults(); });
$("#reset-mapcursor").on('click', function () { clearResults(); });

$("#reset1").on('click', function () { clearResultsFromMap(); });
$("#reset2").on('click', function () { clearResultsFromMap(); });
$("#reset3").on('click', function () { clearResultsFromMap(); });
$("#reset4").on('click', function () { clearResultsFromMap(); });
$("#reset-mapcursor").on('click', function () { clearResultsFromMap(); });

//return to point on map
$("#returnToPoint").on('click', function () { returnToPoint(); });

//route builder
$("#addRow").on('click', function () { addProjectToArray(projects); });
$("#dropRow").on('click', function () { removeLastProject(projects, projectLines); });
$("#clearRows").on('click', function () { clearProjectArrays(projects, projectLines); });








// toggle buttons for showing/hiding layers
// TODO do this for route builder too
$('#demo-mode-toggle').change(function () {
    if ($(this).prop('checked')) {
        console.log("demo checked");
        $("#inputLatitude").val("29.39780972");
        $("#inputLongitude").val("-94.98759004");
        $("#inputRouteName_2").val("US0077-KG");
        $("#inputReferenceMarker").val("622");
        $("#inputDisplacement").val("0.065");
        $("#inputRouteName_4").val("FM1818-KG");
        $("#inputDistanceFromOrigin").val("1.606");
        $("#inputControlSection").val("012201");
        $("#inputMilepointMeasure").val("2.394");


    } else {
        console.log("demo unchecked");
        $("#inputLatitude").val('');
        $("#inputLongitude").val('');
        $("#inputRouteName_2").val('');
        $("#inputReferenceMarker").val('');
        $("#inputDisplacement").val('');
        $("#inputRouteName_4").val('');
        $("#inputDistanceFromOrigin").val('');
        $("#inputControlSection").val('');
        $("#inputMilepointMeasure").val('');


    }
})

// set input min-max values
// TODO do this for route builder too
$(document).ready(function () {
    console.log("setting min-max values");
    $("#inputLatitude").attr({
        "max": 37,
        "min": 24,
        "step": 0.00001
    });

    $("#inputLongitude").attr({
        "max": -93,
        "min": -107,
        "step": 0.00001
    });

    $("#inputReferenceMarker").attr({
        "max": 1000,
        "min": 0,
        "step": 1
    });

    $("#inputDisplacement").attr({
        "max": 10,
        "min": 0,
        "step": 0.001
    });

    $("#inputDistanceFromOrigin").attr({
        "max": 1000,
        "min": 0,
        "step": 0.001
    });

    $("#inputMilepointMeasure").attr({
        "max": 1000,
        "min": 0,
        "step": 0.001
    });
});








