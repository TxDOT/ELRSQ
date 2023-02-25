async function lrsBulkPointQuery(currentLRMno, lrm_indices, fileContents) {
  let inputMethod = "table";

  // input CSV
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  // set fields
  let field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  lrm_indices = field_indices[0]; // why is this replaced the passed data?
  let other_indices = field_indices[1];

  let rte_nm_lrm_indices = '';

  // make array for output
  let refinedData = [];



  // get indices
  if (currentLRMno == 1) {
    rte_nm_lrm_indices = lrm_indices[4]; // optional
  }

  else if (currentLRMno == 2) {
    rte_nm_lrm_indices = lrm_indices[0];
  }

  else if (currentLRMno == 3) {
    rte_nm_lrm_indices = lrm_indices[4]; // optional
  }

  else if (currentLRMno == 4) {
    rte_nm_lrm_indices = lrm_indices[0];
  }
  // end get indices

  // process rows
  for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
    // skipping 0 header row
    console.log("processing row " + rowToQuery + " of " + (parsedInputCSV.length - 1));
    let queryOutput = [];

    // build url
    let P_url = makeLrsQueryUrlFromIndex(currentLRMno, parsedInputCSV[rowToQuery], lrm_indices, 1);
    // blank line
    console.log(P_url);
    // blank line
    // end build url

    // perform query
    let P_results = await queryService(P_url);
    console.log("returned " + P_results.length + " results for row: " + rowToQuery);
    // end perform query

    // get right route
    let rtenmformat = "AAdddd"; //TODO use regex to detect
    if (rtenmformat == "AAdddd") {
      let user_input_rte_nm = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    } else {
      let user_input_rte_nm = parsedInputCSV[rowToQuery][rte_nm_lrm_indices];
    }
    let routeResultsArr = await matchOutputOnRteNm("table", currentLRMno, P_results, user_input_rte_nm);
    console.log("routeResultsArr.length");
    console.log(routeResultsArr.length);
    // end get right route

    // get row header data
    let rowhead = other_indices.map(i => parsedInputCSV[rowToQuery][i]);

    // assemble data
    // FIXME need to fix multiple return functionality
    let fullRowData = rowhead.concat(routeResultsArr);
    refinedData.push(fullRowData);

    // process multiple returns
    /**
      for (let aRowResult = 0; aRowResult < P_results.length; aRowResult++) {
        console.log("processing result: " + (aRowResult + 1) + " of " + (P_results.length));
        let aRowResultObj = P_results[aRowResult];
        Object.assign(aRowResultObj, { Feature: rowhead }); // may need to change this to concat for Objects?
        refinedData.push(aRowResultObj);
      }
    */
  }

  // set column heads
  let customhead = other_indices.map(i => parsedInputCSV[0][i]);
  let standardhead = lrsApiFields;
  let colhead = customhead.concat(standardhead);

  // prepend column heads
  refinedData.unshift(colhead);


  // show results
  // future feature showBulkPointResults(refinedData);

  // export data
  tabularPointsConvertExport_2(refinedData); //FIXME

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}