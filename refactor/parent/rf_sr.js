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

  $(".convert-2point").on('click', function () {
    lrsSingleRouteQuery(currentLRMno);
  });

}
// end event handler



async function lrsSingleRouteQuery(currentLRMno) {
  let inputMethod = "html";

  // read in data
  // read user-entered input fields
  // requires currentLRMno, rtenmformat

  // set fields
  if (currentLRMno == 2) {
    lrm_indices0 = [0, 1, 2];
    lrm_indices1 = [0, 3, 4];
    rte_nm_lrm_indices = [0];
    currentRouteFieldOrder = ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'];
  } else if (currentLRMno == 3) {
    lrm_indices0 = [0, 1];
    lrm_indices1 = [2, 3];
    currentRouteFieldOrder = ['inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure'];
  } else if (currentLRMno == 4) {
    lrm_indices0 = [0, 1];
    lrm_indices1 = [0, 2];
    rte_nm_lrm_indices = [0];
    currentRouteFieldOrder = ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'];
  } else if (currentLRMno == 1) {
    lrm_indices0 = [0, 1];
    lrm_indices1 = [2, 3];
    currentRouteFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];
  }
  // end set fields

  // retrieve data from input fields
  // putting in a loop for option of processing sequential entries
  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {



    let coordinateArr0 = [];
    for (let i = 0; i < lrm_indices0.length; i++) {
      let value = $('#' + currentRouteFieldOrder[lrm_indices0[i]]).val();

      if ((currentLRMno == 2 || currentLRMno == 4) && rtenmformat == "AAdddd" && i == 0) {
        value = fixThisVerySpecificTextFormat(value);
      }

      coordinateArr0.push(value);
    }

    let coordinateArr1 = [];
    for (let i = 0; i < lrm_indices1.length; i++) {
      let value = $('#' + currentRouteFieldOrder[lrm_indices1[i]]).val();

      if ((currentLRMno == 2 || currentLRMno == 4) && rtenmformat == "AAdddd" && i == 0) {
        value = fixThisVerySpecificTextFormat(value);
      }

      coordinateArr1.push(value);
    }

  }
  // outputs coordinateArr, an array of user-entered values
  // end read user-entered input fields
  // end read in data

  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();


  // make array for output
  let refinedData = [];


  let arrayToQuery = [[coordinateArr0, coordinateArr1]];
  let headerRowPresent = 0;

  // process rows
  for (let rowToQuery = headerRowPresent; rowToQuery < arrayToQuery.length; rowToQuery++) {
    let currentRow = arrayToQuery[rowToQuery];
    let queryOutput = [];

    // build 0 url
    let url = '';

    let coordinateArr = currentRow[0];

    if (currentLRMno == 1) {
      lat = coordinateArr[0];
      lon = coordinateArr[1];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
    }

    else if (currentLRMno == 2) {
      routeName = coordinateArr[0];
      refMarker = coordinateArr[1];
      displacement = coordinateArr[2];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
    }

    else if (currentLRMno == 3) {
      controlSecNum = coordinateArr[0];
      milePointMeasure = coordinateArr[1];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
    }

    else if (currentLRMno == 4) {
      routeName = coordinateArr[0];
      dfo = coordinateArr[1];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
    }

    let url0 = url;
    // end build 0 url

    // build 1 url
    let url = '';

    let coordinateArr = currentRow[1];

    if (currentLRMno == 1) {
      lat = coordinateArr[0];
      lon = coordinateArr[1];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
    }

    else if (currentLRMno == 2) {
      routeName = coordinateArr[0];
      refMarker = coordinateArr[1];
      displacement = coordinateArr[2];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
    }

    else if (currentLRMno == 3) {
      controlSecNum = coordinateArr[0];
      milePointMeasure = coordinateArr[1];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
    }

    else if (currentLRMno == 4) {
      routeName = coordinateArr[0];
      dfo = coordinateArr[1];
      url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
    }

    let url1 = url;
    // end build 1 url

    // perform query
    let results0 = await queryService(url0);
    let results1 = await queryService(url1);
    // end perform query

    // get row header data
    let rowhead = '';



    if (constrainToRouteName == 1) {
      // get right route
      if (rtenmformat == "AAdddd") {
        user_input_rte_nm = fixThisVerySpecificTextFormat(xcoordinateArr[rte_nm_lrm_indices]);
      } else {
        user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? xcoordinateArr[rte_nm_lrm_indices] : '';
      }
      let routeResultsArr = await matchOutputOnCommonRteNm("html", currentLRMno, results0, results1, user_input_rte_nm);
      // end get right route

      // assemble data
      let fullRowData = rowhead.concat(routeResultsArr);
      refinedData.push(fullRowData);
    } else {
      // process multiple returns
    }

  }

  // set column heads
  let customhead = ["Feature"];
  let standardhead = lrsApiFields.map(i => 'BEGIN_' + i).concat(lrsApiFields.map(i => 'END_' + i));
  let colhead = customhead.concat(standardhead);

  // prepend column heads
  refinedData.unshift(colhead);


  // show results
  showRouteResults(refinedData[0]);

  // export data
  tabularRoutesConvertExport(refinedData);

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}