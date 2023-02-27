async function lrsSingleRouteQuery(currentLRMno, inputMethod) {
  let headerRowPresent = 0;
  let constrainToRouteName = 1;
  let rtenmformat = "AAdddd_dash_KG";
  let rte_nm_lrm_indices = [];
  let other_indices = [];

  // read in data
  // read user-entered input fields
  // requires currentLRMno, rtenmformat
  // set fields
  let field_indices = setIndicesByLrmAndGeom(currentLRMno, calcGeomType);
  let lrm_indices0 = field_indices[0][0];
  let lrm_indices1 = field_indices[0][1];
  rte_nm_lrm_indices = field_indices[1];
  let currentFieldOrder = field_indices[2];
  // end set fields

  // pre-process data
  // retrieve data from input fields
  // putting in a loop for option of processing sequential entries
  let coordinateArr = [];

  // revision to keep everything in one array // much cleaner

  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
    let coordinateArr0 = [];
    for (let i = 0; i < currentFieldOrder.length; i++) {
      let value = $('#' + currentFieldOrder[i]).val();
      if ((currentLRMno == 2 || currentLRMno == 4) && rtenmformat == "AAdddd" && i == 0) {
        value = fixThisVerySpecificTextFormat(value);
      }
      coordinateArr0.push(value);
    }
    coordinateArr.push(coordinateArr0);
  }

  // end pre-process data
  // outputs coordinateArr, an array of user-entered values
  // end read user-entered input fields
  // end read in data


  let arrayToQuery = coordinateArr;

  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  // make array for output
  let refinedData = [];

  // process rows
  for (let rowToQuery = headerRowPresent; rowToQuery < arrayToQuery.length; rowToQuery++) {
    console.log("processing row " + rowToQuery + " of " + (arrayToQuery.length - headerRowPresent));
    let currentRow = arrayToQuery[rowToQuery];
    let url0 = '';
    let url1 = '';

    // build url
    if (inputMethod == "html") {
      // url0 = makeLrsQueryUrl(inputMethod, currentLRMno, lrm_indices0, currentRouteFieldOrder, 0);
      // url0 = buildUrl(currentLRMno, currentRow);
      url0 = buildUrl(currentLRMno, currentRow, lrm_indices0);
      console.log(url0);
      if (calcGeomType == "Route") {
        // url1 = makeLrsQueryUrl(inputMethod, currentLRMno, lrm_indices1, currentRouteFieldOrder, 0); 
        // url1 = buildUrl(currentLRMno, currentRow);
        url1 = buildUrl(currentLRMno, currentRow, lrm_indices1);
      }
    } else if (inputMethod == "table") {
      url0 = buildUrl(currentLRMno, currentRow, lrm_indices0);
      console.log(url0);
      if (calcGeomType == "Route") { }
    }
    // end build url

    // perform query
    let results0 = await queryService(url0);
    let results1 = '';
    if (calcGeomType == "Route") { results1 = await queryService(url1); }
    console.log("returned " + results0.length + " results for row: " + rowToQuery);
    // end perform query

    // get row header data
    let rowhead = (inputMethod == "table") ? other_indices.map(i => currentRow[i]) : '';

    // return single geom filtered on route name, or return multiple results
    if (constrainToRouteName == 1) {
      // get right route
      if (rtenmformat == "AAdddd") {
      } else {
        user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? currentRow[rte_nm_lrm_indices] : '';
        //user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? $('#' + currentRouteFieldOrder[rte_nm_lrm_indices]).val() : '';
      }
      console.log(results0);
      console.log(results1);
      let unfilteredArr = (calcGeomType == "Point") ? [results0, results0] : [results0, results1];
      let resultsArr = await matchOutputOnRteNm(inputMethod, currentLRMno, unfilteredArr, user_input_rte_nm);
      // let resultsArr = await matchOutputOnCommonRteNm("html", currentLRMno, results0, results1, user_input_rte_nm);
      // end get right route
      // assemble data
      let fullRowData = rowhead.concat(resultsArr); // this is an array
      refinedData.push(fullRowData);
    } else {
      // process multiple returns
      for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
        console.log("processing result: " + (aRowResult + 1) + " of " + (results0.length));
      }
    }
    // end return single geom filtered on route name, or return multiple results

  }
  // end process rows

  // set column heads
  let customhead = (inputMethod == "table") ? other_indices.map(i => arrayToQuery[0][i]) : ["Feature"];
  let standardhead = (calcGeomType == "Point") ? lrsApiFields : lrsApiFields.map(i => 'BEGIN_' + i).concat(lrsApiFields.map(i => 'END_' + i));
  let colhead = customhead.concat(standardhead);

  // prepend column heads
  // refinedData.unshift(colhead);


  // show results
  showRouteResults(refinedData[0]);

  // export data
  // tabularRoutesConvertExport(refinedData); // TODO tabular export for routes

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}
