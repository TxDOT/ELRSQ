// FIXME this changes the DOM
function resetDropdowns() {
  dropDownDepopulator("#bcontrolsection_field");
  dropDownDepopulator("#bdfo_field");
  dropDownDepopulator("#bdisplacement_field");
  dropDownDepopulator("#blat_field");
  dropDownDepopulator("#blon_field");
  dropDownDepopulator("#bmilepoint_field");
  dropDownDepopulator("#breferencemarker_field");
  dropDownDepopulator("#controlsection_field");
  dropDownDepopulator("#dfo_field");
  dropDownDepopulator("#displacement_field");
  dropDownDepopulator("#edfo_field");
  dropDownDepopulator("#edisplacement_field");
  dropDownDepopulator("#elat_field");
  dropDownDepopulator("#elon_field");
  dropDownDepopulator("#emilepoint_field");
  dropDownDepopulator("#ereferencemarker_field");
  dropDownDepopulator("#lat_field");
  dropDownDepopulator("#lon_field");
  dropDownDepopulator("#milepoint_field");
  dropDownDepopulator("#point_rte_nm_field");
  dropDownDepopulator("#referencemarker_field");
  dropDownDepopulator("#route_rte_nm_field");
  dropDownDepopulator("#rte_nm_field");
}

function resetKeyboard() {
  $("#kbPointInputControlSection").hide();
  $("#kbPointInputCoordinates").hide();
  $("#kbPointInputDistanceFromOrigin").hide();
  $("#kbPointInputReferenceMarker").hide();
  $("#kbPointInputRouteName_optional").hide();
  $("#kbPointInputRouteName").hide();
  $("#kbRouteInputControlSection").hide();
  $("#kbRouteInputCoordinates").hide();
  $("#kbRouteInputDistanceFromOrigin").hide();
  $("#kbRouteInputReferenceMarker").hide();
  $("#kbRouteInputRouteName_optional").hide();
  $("#kbRouteInputRouteName").hide();
}

function resetBulkUpload() {
  $("#csvPointInputControlSection").hide();
  $("#csvPointInputCoordinates").hide();
  $("#csvPointInputDistanceFromOrigin").hide();
  $("#csvPointInputReferenceMarker").hide();
  $("#csvPointInputRouteName_optional").hide();
  $("#csvPointInputRouteName").hide();
  $("#csvRouteInputControlSection").hide();
  $("#csvRouteInputCoordinates").hide();
  $("#csvRouteInputDistanceFromOrigin").hide();
  $("#csvRouteInputReferenceMarker").hide();
  $("#csvRouteInputRouteName_optional").hide();
  $("#csvRouteInputRouteName").hide();
}

function resetTemplates() {
  $(".controlsection-template").hide();
  $(".coordinates-template").hide();
  $(".dfo-template").hide();
  $(".referencemarker-template").hide();
}