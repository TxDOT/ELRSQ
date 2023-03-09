GLOBALSETTINGS.CalcGeomType = 'Route'; // these are not always valid
GLOBALSETTINGS.CurrentLrmNo = 2;

$(document).ready(function () {
  $("#topnav_route").on('click', function () { set_topnav_route(); });

  $("#btn_lrm_method_referencemarker").on('click', function () { set_lrm_method_referencemarker(); });
  $("#btn_lrm_method_controlsection").on('click', function () { set_lrm_method_controlsection(); });
  $("#btn_lrm_method_dfo").on('click', function () { set_lrm_method_dfo(); });
  $("#btn_lrm_method_coordinates").on('click', function () { set_lrm_method_coordinates(); });


  function set_topnav_route() {
    GLOBALSETTINGS.CalcGeomType = 'Route';
    console.log("setting CALCGEOMTYPE to: " + GLOBALSETTINGS.CalcGeomType);

    $("#input-route-form-card").show();
    $("#input-route-form").show();

    $("#results-table-route-card").show();

    $("#bulk-route-templates-toolbar").show();

  }

  function set_lrm_method_referencemarker() {
    GLOBALSETTINGS.CurrentLrmNo = 2;

    $("#kbRouteInputRouteName").show();
    $("#kbRouteInputReferenceMarker").show();
    $("#kbRouteInputControlSection").hide();
    $("#kbRouteInputDistanceFromOrigin").hide();
    $("#kbRouteInputRouteName_optional").hide();
    $("#kbRouteInputCoordinates").hide();




  }

  function set_lrm_method_controlsection() {
    GLOBALSETTINGS.CurrentLrmNo = 3;


    $("#kbRouteInputRouteName").hide();
    $("#kbRouteInputReferenceMarker").hide();
    $("#kbRouteInputControlSection").show();
    $("#kbRouteInputDistanceFromOrigin").hide();
    $("#kbRouteInputRouteName_optional").hide();
    $("#kbRouteInputCoordinates").hide();



  }

  function set_lrm_method_dfo() {
    GLOBALSETTINGS.CurrentLrmNo = 4;


    $("#kbRouteInputRouteName").show();
    $("#kbRouteInputReferenceMarker").hide();
    $("#kbRouteInputControlSection").hide();
    $("#kbRouteInputDistanceFromOrigin").show();
    $("#kbRouteInputRouteName_optional").hide();
    $("#kbRouteInputCoordinates").hide();



  }

  function set_lrm_method_coordinates() {
    GLOBALSETTINGS.CurrentLrmNo = 1;


    $("#kbRouteInputRouteName").hide();
    $("#kbRouteInputReferenceMarker").hide();
    $("#kbRouteInputControlSection").hide();
    $("#kbRouteInputDistanceFromOrigin").hide();
    $("#kbRouteInputRouteName_optional").show();
    $("#kbRouteInputCoordinates").show();



  }

});

$(document).ready(function () {

  $(".convert").on('click', function () {
    GLOBALSETTINGS.InputMethod = "html";
    lrsSingleRouteQuery_RPM();
  });








});








