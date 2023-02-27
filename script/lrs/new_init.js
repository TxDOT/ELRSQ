let currentLRM = `coordinates-tab`;
let currentLRMno = 1;

// get current LRM

$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
  currentLRM = $(e.target).attr("id") // activated tab


  if (currentLRM == `mapcursor-tab`) {
    $("#viewDiv").css('cursor', 'crosshair');
  } else {
    $("#viewDiv").css('cursor', 'move');
  }

  if (currentLRM == `referencemarker-tab`) {
    currentLRMno = 2;
  } else if (currentLRM == `controlsection-tab`) {
    currentLRMno = 3;
  } else if (currentLRM == `distancefromorigin-tab`) {
    currentLRMno = 4;
  } else {
    currentLRMno = 1;
  }

});

// end get current LRM

// begin event handler

if (calcGeomType == "Point") {
  // 1-point

  $(".convert-1point").on('click', function () {
    lrsSinglePointQuery(currentLRMno);
  });


  // 1-point
  // bulk

  // add event handlers to drop zones on page load
  $(document).ready(function () {
    $(".uploadCsv-bulk").on('change', async function (e) {
      GreenToYellow();
      const fileContents = await readFile(e.target.files[0])
      YellowToGreen();
      lrsBulkPointQuery(currentLRMno, fileContents);
    });


  });


}

// begin event handler
if (calcGeomType == "Route") {
  // 2-point
  // single

  $(".convert-2point").on('click', function () {
    lrsSingleRouteQuery(currentLRMno);
  });


  // 2-point
  // bulk

  // add certain page elements and event handlers on page load
  $(document).ready(function () {
    $(".uploadCsv-bulk").on('change', async function (e) {
      GreenToYellow();
      const fileContents = await readFile(e.target.files[0])
      YellowToGreen();
      lrsBulkRouteQuery(currentLRMno, fileContents);
    });


  });

}


