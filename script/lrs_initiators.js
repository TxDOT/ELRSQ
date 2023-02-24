//FIXME this is not always true
let currentLRM = `coordinates-tab`;

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



if (calcGeomType == "Point") {
  // 1-point
  // single

  $("#convert1").on('click', function () { lrsQuery(1, [0, 1], ['inputLatitude', 'inputLongitude']); });
  $("#convert2").on('click', function () { lrsQuery(2, [0, 1, 2], ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement']); });
  $("#convert3").on('click', function () { lrsQuery(3, [0, 1], ['inputControlSection', 'inputMilepointMeasure']); });
  $("#convert4").on('click', function () { lrsQuery(4, [0, 1], ['inputRouteName_4', 'inputDistanceFromOrigin']); });

  // 1-point
  // bulk

  // add event handlers to drop zones on page load
  $(document).ready(function () {

    // FIXME Bulk Upload: change to use Convert button instead of automatic
    // FIXME close modal on button press
    const myDropZone = document.getElementById("fieldset-uploadCsv-bulk");
    dragDropEventHandlers(myDropZone);

    document.getElementById("fieldset-uploadCsv-bulk").addEventListener('drop', async function (e) {
      console.log(e.dataTransfer.files[0]);
      GreenToYellow();
      const fileContents = await readFile(e.dataTransfer.files[0])
      YellowToGreen();
      thenConvertCSVByMethod(fileContents);
    });

    document.getElementById("uploadCsv-bulk").addEventListener('change', async function (e) {
      GreenToYellow();
      const fileContents = await readFile(e.target.files[0])
      YellowToGreen();
      thenConvertCSVByMethod(fileContents);
    });

  });






  // 1-point
  // single
  // wizard

  $(document).ready(function () {

    $("wizard_form-component").load("components/html/wizard_form.html", function (response, status, xhr) {
      if (status == "error") { $("wizard_form-component").html(staticWizard_Form); }
      $("#missingControlSection").on('click', function () { noControlSection(); });
      $("#convert3-wizard").on('click', function () { lrsQuery(3, [0, 1], ['inputControlSection', 'inputMilepointMeasure']); });
      $("#missingMilepointMeasure").on('click', function () { noMilepointMeasure(); });
      $("#missingRouteName").on('click', function () { noRouteName(); });
      $("#convert4-wizard").on('click', function () { lrsQuery(4, [0, 1], ['inputRouteName_4', 'inputDistanceFromOrigin']); });
      $("#missingDistanceFromOrigin").on('click', function () { noDistanceFromOrigin(); });
      $("#convert2-wizard").on('click', function () { lrsQuery(2, [0, 1, 2], ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement']); });
      $("#missingReferenceMarker").on('click', function () { noReferenceMarker(); });
      $("#convert1-wizard").on('click', function () { lrsQuery(1, [0, 1], ['inputLatitude', 'inputLongitude']); });
      $("#missingCoordinates").on('click', function () { restartWizard(); });
    });

  });




}

if (calcGeomType == "Route") {
  // 2-point
  // single

  $("#convert1-2point").on('click', function () { lrsDualQueryFromHtml(1, 0, ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude']); });
  $("#convert2-2point").on('click', function () { lrsDualQueryFromHtml(2, 0, ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement']); });
  $("#convert3-2point").on('click', function () { lrsDualQueryFromHtml(3, 0, ['inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure']); });
  $("#convert4-2point").on('click', function () { lrsDualQueryFromHtml(4, 0, ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin']); });

  // 2-point
  // bulk

  /**
    // add certain page elements and event handlers on page load
    $(document).ready(function () {
    
      // FIXME Bulk Upload: change to use Convert button instead of automatic
      // FIXME close modal on button press
    
      document.getElementById("fieldset-uploadCsv-bulk").addEventListener('drop', async function (e) {
        console.log(e.dataTransfer.files[0]);
        GreenToYellow();
        const fileContents = await readFile(e.dataTransfer.files[0])
        YellowToGreen();
        setMethodAndFields(fileContents);
      });
    
      document.getElementById("uploadCsv-bulk").addEventListener('change', async function (e) {
        GreenToYellow();
        const fileContents = await readFile(e.target.files[0])
        YellowToGreen();
        //thenConvertCSVByMethod(fileContents);
        setMethodAndFields(fileContents);
      });
    
    });
  */



  // add certain page elements and event handlers on page load
  $(document).ready(function () {

    // FIXME Bulk Upload: change to use Convert button instead of automatic
    // FIXME close modal on button press
    const myDropZone = document.getElementById("fieldset-uploadCsv-bulk");
    dragDropEventHandlers(myDropZone);

    document.getElementById("fieldset-uploadCsv-bulk").addEventListener('drop', async function (e) {
      console.log(e.dataTransfer.files[0]);
      GreenToYellow();
      const fileContents = await readFile(e.dataTransfer.files[0])
      YellowToGreen();
      setMethodAndFields(fileContents);
    });

    document.getElementById("uploadCsv-bulk").addEventListener('change', async function (e) {
      GreenToYellow();
      const fileContents = await readFile(e.target.files[0])
      YellowToGreen();
      setMethodAndFields(fileContents);
    });

  });

}

