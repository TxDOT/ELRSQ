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
if (calcGeomType == "Route") {

  $(document).ready(function () {
    $(".uploadCsv-bulk").on('change', async function (e) {
      GreenToYellow();
      const fileContents = await readFile(e.target.files[0])
      YellowToGreen();
      lrsBulkRouteQuery(currentLRMno, fileContents);
    });
  });

}
// end event handler



async function lrsBulkRouteQuery(currentLRMno, fileContents) {
  let inputMethod = "table";

  // read in data
  // read user-supplied table
  // input CSV

  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  // set fields
  let field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  let lrm_indices = field_indices[0];
  let other_indices = field_indices[1];

  if (currentLRMno == 2) {
    lrm_indices0 = [lrm_indices[0], lrm_indices[1], lrm_indices[2]];
    lrm_indices1 = [lrm_indices[0], lrm_indices[3], lrm_indices[4]];
  } else if (currentLRMno == 3) {
    lrm_indices0 = [lrm_indices[0], lrm_indices[1]];
    lrm_indices1 = [lrm_indices[2], lrm_indices[3]];
  } else if (currentLRMno == 4) {
    lrm_indices0 = [lrm_indices[0], lrm_indices[1]];
    lrm_indices1 = [lrm_indices[0], lrm_indices[2]];
  } else if (currentLRMno == 1) {
    lrm_indices0 = [lrm_indices[0], lrm_indices[1]];
    lrm_indices1 = [lrm_indices[2], lrm_indices[3]];
  }
  // end set fields

  // get route name index
  let rte_nm_lrm_indices = '';
  if (currentLRMno == 1 || currentLRMno == 3) {
    rte_nm_lrm_indices = lrm_indices[4]; // optional
  } else if (currentLRMno == 2 || currentLRMno == 4) {
    rte_nm_lrm_indices = lrm_indices[0];
  }
  // end get route name index



// fix route name field
  if (typeof rte_nm_lrm_indices !== 'undefined' || rtenmformat == "AAdddd") {
    for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
      parsedInputCSV[rowToQuery][rte_nm_lrm_indices] = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    }
  }

  // end read user-supplied table
  // end read in data

  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();


  // make array for output
  let refinedData = [];


  let arrayToQuery = parsedInputCSV;
  let headerRowPresent = 1;

  // process rows
  for (let rowToQuery = headerRowPresent; rowToQuery < arrayToQuery.length; rowToQuery++) {
    let currentRow = arrayToQuery[rowToQuery];
    let queryOutput = [];

    // build 0 url
    let url = '';

    let coordinateArr = currentRow; // need to test this

    if (currentLRMno == 1) {
      lat = coordinateArr[lrm_indices0[0]];
      lon = coordinateArr[lrm_indices0[1]];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
    }

    else if (currentLRMno == 2) {
      routeName = coordinateArr[lrm_indices0[0]];
      refMarker = coordinateArr[lrm_indices0[1]];
      displacement = coordinateArr[lrm_indices0[2]];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
    }

    else if (currentLRMno == 3) {
      controlSecNum = coordinateArr[lrm_indices0[0]];
      milePointMeasure = coordinateArr[lrm_indices0[1]];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
    }

    else if (currentLRMno == 4) {
      routeName = coordinateArr[lrm_indices0[0]];
      dfo = coordinateArr[lrm_indices0[1]];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
    }

    let url0 = url;
    // end build 0 url

    // build 1 url
    let url = '';

    if (format_rte_nm == 1) {
      routeName = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][lrm_indices1[0]]);
    } else {
      routeName = parsedInputCSV[rowToQuery][lrm_indices1[0]];
    }

    if (currentLRMno == 1) {
      lat = coordinateArr[lrm_indices1[0]];
      lon = coordinateArr[lrm_indices1[1]];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
    }

    else if (currentLRMno == 2) {
      routeName = coordinateArr[lrm_indices1[0]];
      refMarker = coordinateArr[lrm_indices1[1]];
      displacement = coordinateArr[lrm_indices1[2]];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
    }

    else if (currentLRMno == 3) {
      controlSecNum = coordinateArr[lrm_indices1[0]];
      milePointMeasure = coordinateArr[lrm_indices1[1]];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
    }

    else if (currentLRMno == 4) {
      routeName = coordinateArr[lrm_indices1[0]];
      dfo = coordinateArr[lrm_indices1[1]];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
    }

    let url1 = url;
    // end build 1 url

    // perform query
    let results0 = await queryService(url0);
    let results1 = await queryService(url1);
    // end perform query

    // get row header data
    let rowhead = other_indices.map(i => currentRow[i]);



    if (constrainToRouteName == 1) {
      // get right route
      if (rtenmformat == "AAdddd") {
        user_input_rte_nm = fixThisVerySpecificTextFormat(coordinateArr[rte_nm_lrm_indices]);
      } else {
        user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? coordinateArr[rte_nm_lrm_indices] : '';
      }
      let routeResultsArr = await matchOutputOnCommonRteNm("table", currentLRMno, results0, results1, user_input_rte_nm);
      // end get right route

      // assemble data
      let fullRowData = rowhead.concat(routeResultsArr);
      refinedData.push(fullRowData);
    } else {
      // process multiple returns
    }

  }

  // set column heads
  let customhead = other_indices.map(i => arrayToQuery[0][i]);
  let standardhead = lrsApiFields.map(i => 'BEGIN_' + i).concat(lrsApiFields.map(i => 'END_' + i));
  let colhead = customhead.concat(standardhead);

  // prepend column heads
  refinedData.unshift(colhead);


  // show results
  showBulkRouteResults(refinedData);

  // export data
  tabularRoutesConvertExport(refinedData);

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}