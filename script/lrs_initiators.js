//FIXME this is not always true
let currentLRM = `coordinates-tab`;
let currentLRMno = 1;
let lrm_indices = [0, 1];
let route_lrm_indices = [0, 1, 2, 3];
default_template_lrm_indices = [2, 1];
let currentPointFieldOrder = ['inputLatitude', 'inputLongitude'];
let currentRouteFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];

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

  if (currentLRM == `referencemarker-tab`) {
    currentLRMno = 2;
    lrm_indices = [0, 1, 2];
    route_lrm_indices = [0, 1, 2, 3, 4];
    default_template_lrm_indices = [1, 2, 3];
    currentPointFieldOrder = ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement'];
    currentRouteFieldOrder = ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'];
  } else if (currentLRM == `controlsection-tab`) {
    currentLRMno = 3;
    lrm_indices = [0, 1];
    route_lrm_indices = [0, 1, 2, 3];
    default_template_lrm_indices = [1, 2];
    currentPointFieldOrder = ['inputControlSection', 'inputMilepointMeasure'];
    currentRouteFieldOrder = ['inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure'];
  } else if (currentLRM == `distancefromorigin-tab`) {
    currentLRMno = 4;
    lrm_indices = [0, 1];
    route_lrm_indices = [0, 1, 2];
    default_template_lrm_indices = [1, 2];
    currentPointFieldOrder = ['inputRouteName_4', 'inputDistanceFromOrigin'];
    currentRouteFieldOrder = ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'];
  } else {
    currentLRMno = 1;
    lrm_indices = [0, 1];
    route_lrm_indices = [0, 1, 2, 3];
    default_template_lrm_indices = [2, 1];
    currentPointFieldOrder = ['inputLatitude', 'inputLongitude'];
    currentRouteFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];
  }

});

// end get current LRM



if (calcGeomType == "Point") {
  // 1-point

  $(".convert-1point").on('click', function () { lrsSinglePointQuery(currentLRMno, lrm_indices, currentPointFieldOrder); });


  // 1-point
  // bulk

  // add event handlers to drop zones on page load
  $(document).ready(function () {

    /**
      const myDropZone = document.getElementById("fieldset-uploadCsv-bulk");
      dragDropEventHandlers(myDropZone);
    */

    $(".upload_dropZone").on('drop', async function (e) {
      console.log(e.dataTransfer.files[0]);
      GreenToYellow();
      const fileContents = await readFile(e.dataTransfer.files[0])
      YellowToGreen();
      lrsBulkPointQuery(currentLRMno, default_template_lrm_indices, fileContents);
    });

    $(".uploadCsv-bulk").on('change', async function (e) {
      GreenToYellow();
      const fileContents = await readFile(e.target.files[0])
      YellowToGreen();
      lrsBulkPointQuery(currentLRMno, default_template_lrm_indices, fileContents);
    });


  });


}

if (calcGeomType == "Route") {
  // 2-point
  // single

  $(".convert-2point").on('click', function () { lrsSingleRouteQuery(currentLRMno, route_lrm_indices, currentRouteFieldOrder); });


  // 2-point
  // bulk

  // add certain page elements and event handlers on page load
  $(document).ready(function () {

    const dropZones = document.querySelectorAll('.upload_dropZone');
    for (const zone of dropZones) {
      dragDropEventHandlers(zone);
    }


    $(".upload_dropZone").on('drop', async function (e) {
      console.log(e.dataTransfer.files[0]);
      GreenToYellow();
      const fileContents = await readFile(e.dataTransfer.files[0])
      YellowToGreen();
      lrsBulkRouteQuery(currentLRMno, route_lrm_indices, fileContents);
    });

    $(".uploadCsv-bulk").on('change', async function (e) {
      GreenToYellow();
      const fileContents = await readFile(e.target.files[0])
      YellowToGreen();
      lrsBulkRouteQuery(currentLRMno, route_lrm_indices, fileContents);
    });


  });

}


