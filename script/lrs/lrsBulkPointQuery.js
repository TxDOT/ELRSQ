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
    let url0 = makeLrsQueryUrlFromIndex(currentLRMno, parsedInputCSV[rowToQuery], lrm_indices, 1);
    // blank line
    console.log(url0);
    // blank line
    // end build url

    // perform query
    let results0 = await queryService(url0);
    console.log("returned " + results0.length + " results for row: " + rowToQuery);
    // end perform query

    // get right route
    let rtenmformat = "AAdddd"; //TODO use regex to detect
    let user_input_rte_nm = '';
    if (rtenmformat == "AAdddd") {
      user_input_rte_nm = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    } else {
      user_input_rte_nm = parsedInputCSV[rowToQuery][rte_nm_lrm_indices];
    }
    let routeResultsArr = await matchOutputOnRteNm("table", currentLRMno, results0, user_input_rte_nm);
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
      for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
        console.log("processing result: " + (aRowResult + 1) + " of " + (results0.length));
        let aRowResultObj = results0[aRowResult];
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
  tabularPointsConvertExport_2(refinedData); //FIXME need JS and KML support

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}