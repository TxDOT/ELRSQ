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

  $(".convert-1point").on('click', function () {
    lrsSinglePointQuery(currentLRMno);
  });

}
// end event handler



async function lrsSinglePointQuery(currentLRMno) {
  let inputMethod = "html";

  // read in data
  // read user-entered input fields
  // requires currentLRMno, rtenmformat

  // set fields
  if (currentLRMno == 2) {
    lrm_indices = [0, 1, 2];
    rte_nm_lrm_indices = [0];
    currentPointFieldOrder = ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement'];
  } else if (currentLRMno == 3) {
    lrm_indices = [0, 1];
    rte_nm_lrm_indices = [2]; // optional
    currentPointFieldOrder = ['inputControlSection', 'inputMilepointMeasure'];
  } else if (currentLRMno == 4) {
    lrm_indices = [0, 1];
    rte_nm_lrm_indices = [0];
    currentPointFieldOrder = ['inputRouteName_4', 'inputDistanceFromOrigin'];
  } else if (currentLRMno == 1) {
    lrm_indices = [0, 1];
    rte_nm_lrm_indices = [2]; // optional
    currentPointFieldOrder = ['inputLatitude', 'inputLongitude'];
  }
  // end set fields

  // retrieve data from input fields
  // putting in a loop for option of processing sequential entries
  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {



    let coordinateArr = [];
    for (let i = 0; i < lrm_indices.length; i++) {
      let value = $('#' + currentPointFieldOrder[lrm_indices[i]]).val();

      if ((currentLRMno == 2 || currentLRMno == 4) && rtenmformat == "AAdddd" && i == 0) {
        value = fixThisVerySpecificTextFormat(value);
      }

      coordinateArr.push(value);
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


  let arrayToQuery = [coordinateArr];
  let headerRowPresent = 0;

  // process rows
  for (let rowToQuery = headerRowPresent; rowToQuery < arrayToQuery.length; rowToQuery++) {
    let currentRow = arrayToQuery[rowToQuery];
    let queryOutput = []; // this is not used because rows are pushed one by one instead of in batches

    // build 0 url
    let url = '';

    let coordinateArr = currentRow; // need to test this

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

    // perform query
    let results0 = await queryService(url0);
    // end perform query

    // get row header data
    let rowhead = '';



    if (constrainToRouteName == 1) {
      // get right route
      if (rtenmformat == "AAdddd") {
        user_input_rte_nm = fixThisVerySpecificTextFormat(coordinateArr[rte_nm_lrm_indices]);
      } else {
        user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? coordinateArr[rte_nm_lrm_indices] : '';
      }
      let pointResultsArr = await matchOutputOnRteNm("html", currentLRMno, results0, user_input_rte_nm);
      // end get right route

      // assemble data
      let fullRowData = rowhead.concat(pointResultsArr);
      refinedData.push(fullRowData);
    } else {
      // process multiple returns
      for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
        let aRowResultObj = results0[aRowResult];
        // Object.assign(aRowResultObj, { Feature: rowhead }); // may need to change this to concat for Objects?
        refinedData.push(aRowResultObj);
      }
    }

  }

  // set column heads
  let customhead = ["Feature"];
  let standardhead = lrsApiFields;
  let colhead = customhead.concat(standardhead);

  // prepend column heads
  refinedData.unshift(colhead);


  // show results
  showPointResults(refinedData);

  // export data
  tabularPointsConvertExport(refinedData);

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}