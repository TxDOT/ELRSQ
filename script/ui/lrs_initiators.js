
let inputMethod = '';


//FIXME this is not always true
let currentLRM = `coordinates-tab`;
let currentLRMno = 1;
// let lrm_indices = [0, 1];
// let routlrm_indices1 = [0, 1, 2, 3];
// default_templatlrm_indices1 = [2, 1];
// let currentPointFieldOrder = ['inputLatitude', 'inputLongitude'];
// let currentRouteFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];

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
    // lrm_indices = [0, 1, 2];
    // routlrm_indices1 = [0, 1, 2, 3, 4];
    // default_templatlrm_indices1 = [1, 2, 3];
    // currentPointFieldOrder = ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement'];
    // currentRouteFieldOrder = ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'];
  } else if (currentLRM == `controlsection-tab`) {
    currentLRMno = 3;
    // lrm_indices = [0, 1];
    // routlrm_indices1 = [0, 1, 2, 3];
    // default_templatlrm_indices1 = [1, 2];
    // currentPointFieldOrder = ['inputControlSection', 'inputMilepointMeasure'];
    // currentRouteFieldOrder = ['inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure'];
  } else if (currentLRM == `distancefromorigin-tab`) {
    currentLRMno = 4;
    // lrm_indices = [0, 1];
    // routlrm_indices1 = [0, 1, 2];
    // default_templatlrm_indices1 = [1, 2];
    // currentPointFieldOrder = ['inputRouteName_4', 'inputDistanceFromOrigin'];
    // currentRouteFieldOrder = ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'];
  } else {
    currentLRMno = 1;
    // lrm_indices = [0, 1];
    // routlrm_indices1 = [0, 1, 2, 3];
    // default_templatlrm_indices1 = [2, 1];
    // currentPointFieldOrder = ['inputLatitude', 'inputLongitude'];
    // currentRouteFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];
  }

});

// end get current LRM

// begin event handler

if (calcGeomType == "Point") {
  // 1-point

  $(".convert-1point").on('click', function () {
    inputMethod = "html";
    lrsSinglePointQuery(currentLRMno, inputMethod);
  });


  // 1-point
  // bulk

  // add event handlers to drop zones on page load
  $(document).ready(function () {

    // FIXME Bulk Upload: change to use Convert button instead of automatic
    // FIXME close modal on button press
    // FIXME get away from using ids
    const myDropZone = document.getElementById("fieldset-uploadCsv-bulk");
    dragDropEventHandlers(myDropZone);
    /**
      const dropZones = document.querySelectorAll('.upload_dropZone');
      for (const zone of dropZones) {
        dragDropEventHandlers(zone);
      }
    */

    $(".upload_dropZone").on('drop', async function (e) {
      console.log(e.dataTransfer.files[0]);
      GreenToYellow();
      const fileContents = await readFile(e.dataTransfer.files[0])
      YellowToGreen();
      lrsBulkPointQuery(currentLRMno, default_templatlrm_indices1, fileContents);
    });

    $(".uploadCsv-bulk").on('change', async function (e) {
      GreenToYellow();
      const fileContents = await readFile(e.target.files[0])
      YellowToGreen();
      inputMethod = "table";
      lrsBulkPointQuery(currentLRMno, fileContents);
    });


  });





  // 1-point
  // single
  // wizard

  /**
    $(document).ready(function () {
  
      $("wizard_form-component").load("components/html/wizard_form.html", function (response, status, xhr) {
        if (status == "error") { $("wizard_form-component").html(staticWizard_Form); }
        $("#missingControlSection").on('click', function () { noControlSection(); });
        $("#convert3-wizard").on('click', function () { lrsSinglePointQuery(3, [0, 1], ['inputControlSection', 'inputMilepointMeasure']); });
        $("#missingMilepointMeasure").on('click', function () { noMilepointMeasure(); });
        $("#missingRouteName").on('click', function () { noRouteName(); });
        $("#convert4-wizard").on('click', function () { lrsSinglePointQuery(4, [0, 1], ['inputRouteName_4', 'inputDistanceFromOrigin']); });
        $("#missingDistanceFromOrigin").on('click', function () { noDistanceFromOrigin(); });
        $("#convert2-wizard").on('click', function () { lrsSinglePointQuery(2, [0, 1, 2], ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement']); });
        $("#missingReferenceMarker").on('click', function () { noReferenceMarker(); });
        $("#convert1-wizard").on('click', function () { lrsSinglePointQuery(1, [0, 1], ['inputLatitude', 'inputLongitude']); });
        $("#missingCoordinates").on('click', function () { restartWizard(); });
      });
  
    });
  */


}

// begin event handler
if (calcGeomType == "Route") {
  // 2-point
  // single

  $(".convert-2point").on('click', function () {
    inputMethod = "html";
    lrsSingleRouteQuery(currentLRMno, inputMethod);
  });


  // 2-point
  // bulk

  // add certain page elements and event handlers on page load
  $(document).ready(function () {

    // FIXME Bulk Upload: change to use Convert button instead of automatic
    // FIXME close modal on button press
    // FIXME get away from using ids
    // const myDropZone = document.getElementById("fieldset-uploadCsv-bulk");
    // dragDropEventHandlers(myDropZone);
    const dropZones = document.querySelectorAll('.upload_dropZone');
    for (const zone of dropZones) {
      dragDropEventHandlers(zone);
    }


    $(".upload_dropZone").on('drop', async function (e) {
      console.log(e.dataTransfer.files[0]);
      GreenToYellow();
      const fileContents = await readFile(e.dataTransfer.files[0])
      YellowToGreen();
      lrsBulkRouteQuery(currentLRMno, routlrm_indices1, fileContents);
    });

    $(".uploadCsv-bulk").on('change', async function (e) {
      GreenToYellow();
      const fileContents = await readFile(e.target.files[0])
      YellowToGreen();
      inputMethod = "table";
      lrsBulkRouteQuery(currentLRMno, fileContents);
    });


  });

}


