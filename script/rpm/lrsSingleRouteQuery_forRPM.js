async function lrsSingleRouteQuery_RPM(currentLRMno, inputMethod, lrm_indices, currentRouteFieldOrder) {
  let headerRowPresent = 0;
  let constrainToRouteName = (calcGeomType == "Route") ? 1 : 0;
  let rtenmformat = "AAdddd_dash_KG";
  let rte_nm_lrm_indices = [];

  // read in data
  // read user-entered input fields
  // requires currentLRMno, rtenmformat
  // set fields
  let field_indices = setIndicesByLrmAndGeom(currentLRMno);
  rte_nm_lrm_indices = field_indices[1];
  let currentFieldOrder = field_indices[2];
  // end set fields

  // pre-process data
  // retrieve data from input fields
  // putting in a loop for option of processing sequential entries
  let coordinateArr = [];

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




  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  lrm_indices0 = field_indices[0][0];
  lrm_indices1 = field_indices[0][1];
  rte_nm_lrm_indices = field_indices[1];

  // make array for output
  let refinedData = [];

  // process rows
  for (let rowToQuery = 0; rowToQuery < coordinateArr.length; rowToQuery++) {
    let currentRow = coordinateArr[rowToQuery];
    let url0 = '';
    let url1 = '';

    // build url
    url0 = buildUrl(currentLRMno, currentRow, lrm_indices0);
    url1 = buildUrl(currentLRMno, currentRow, lrm_indices1);

    // end build url

    // perform query
    let results0 = await queryService(url0);
    let results1 = '';
    if (calcGeomType == "Route") { results1 = await queryService(url1); }
    console.log("returned " + results0.length + " results for row: " + rowToQuery);
    // end perform query


    let routeQueryOutput = [];

    // get right route
    if (currentLRMno == 1 || currentLRMno == 3) {
      user_input_rte_nm = '';
    } else if (currentLRMno == 2 || currentLRMno == 4) {
      user_input_rte_nm = $('#' + currentRouteFieldOrder[rte_nm_lrm_indices]).val();
      routeQueryOutput.push(user_input_rte_nm);
    }
    await rteDfoAssembler(routeQueryOutput, "html", currentLRMno, results0, results1, user_input_rte_nm);
    // end get right route

    // get row header data
    let rowhead = ''; // get from HTML

    // assemble data
    // let routeQueryOutput = rowhead.concat(routeResultsArr);
    refinedData.push(routeQueryOutput);

  }



  // prepend column heads
  // refinedData.unshift(colhead);


  // show results
  showRouteResults(refinedData[0]);

  // export data
  // tabularRoutesConvertExport(routeQueryOutput); // TODO tabular export for routes

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}