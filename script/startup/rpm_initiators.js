GLOBALSETTINGS.currentLRM = `coordinates-tab`;
GLOBALSETTINGS.CurrentLrmNo = 1;
let route_lrm_indices = [0, 1, 2, 3];
let currentRouteFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];

// get current LRM

$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
  GLOBALSETTINGS.currentLRM = $(e.target).attr("id") // activated tab

  if (GLOBALSETTINGS.currentLRM == `mapcursor-tab`) {
    $("#viewDiv").css('cursor', 'crosshair');
  } else {
    $("#viewDiv").css('cursor', 'move');
  }

  if (GLOBALSETTINGS.currentLRM == `referencemarker-tab`) {
    GLOBALSETTINGS.CurrentLrmNo = 2;
    route_lrm_indices = [0, 1, 2, 3, 4];
    currentRouteFieldOrder = ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'];
  } else if (GLOBALSETTINGS.currentLRM == `controlsection-tab`) {
    GLOBALSETTINGS.CurrentLrmNo = 3;
    route_lrm_indices = [0, 1, 2, 3];
    currentRouteFieldOrder = ['inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure'];
  } else if (GLOBALSETTINGS.currentLRM == `distancefromorigin-tab`) {
    GLOBALSETTINGS.CurrentLrmNo = 4;
    route_lrm_indices = [0, 1, 2];
    currentRouteFieldOrder = ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'];
  } else {
    GLOBALSETTINGS.CurrentLrmNo = 1;
    route_lrm_indices = [0, 1, 2, 3];
    currentRouteFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];
  }

});

// end get current LRM



if (GLOBALSETTINGS.CalcGeomType == "Route") {
  // 2-point
  // single

  $(".convert-2point").on('click', function () { 
    GLOBALSETTINGS.InputMethod = "html";
    lrsSingleRouteQuery_RPM(); });
}


