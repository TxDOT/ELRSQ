let currentLRM = `coordinates-tab`;
let currentLRMno = 1;
let route_lrm_indices = [0, 1, 2, 3];
let currentRouteFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];

// get current LRM

$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
  currentLRM = $(e.target).attr("id") // activated tab
  console.log(currentLRM);


  if (currentLRM == `mapcursor-tab`) {
    $("#viewDiv").css('cursor', 'crosshair');
  } else {
    $("#viewDiv").css('cursor', 'move');
  }

  if (currentLRM == `referencemarker-tab`) {
    currentLRMno = 2;
    route_lrm_indices = [0, 1, 2, 3, 4];
    currentRouteFieldOrder = ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'];
  } else if (currentLRM == `controlsection-tab`) {
    currentLRMno = 3;
    route_lrm_indices = [0, 1, 2, 3];
    currentRouteFieldOrder = ['inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure'];
  } else if (currentLRM == `distancefromorigin-tab`) {
    currentLRMno = 4;
    route_lrm_indices = [0, 1, 2];
    currentRouteFieldOrder = ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'];
  } else {
    currentLRMno = 1;
    route_lrm_indices = [0, 1, 2, 3];
    currentRouteFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];
  }

});

// end get current LRM



if (calcGeomType == "Route") {
  // 2-point
  // single

  $(".convert-2point").on('click', function () { 
    inputMethod = "html";
    lrsSingleRouteQuery_RPM(currentLRMno, inputMethod); });
}


