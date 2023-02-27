async function lrsBulkPointQuery(currentLRMno, fileContents) {
  let headerRowPresent = 1;
  let constrainToRouteName = 0;
  let rtenmformat = "AAdddd"; //TODO use regex to detect
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = [];
  let other_indices = [];

  // read in data
  // read user-supplied table
  // input CSV
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  // set fields
  let field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  lrm_indices0 = field_indices[0][0];
  lrm_indices1 = field_indices[0][1];
  rte_nm_lrm_indices = field_indices[2];
  other_indices = field_indices[1];
  // end set fields



  let arrayToQuery = parsedInputCSV;

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
      url0 = buildUrl(currentLRMno, currentRow);
      console.log(url0);
      if (calcGeomType == "Route") { url1 = buildUrl(currentLRMno, currentRow); }
    } else if (inputMethod == "table") {
      url0 = buildUrl(currentLRMno, currentRow, lrm_indices0);
      console.log(url0);
      if (calcGeomType == "Route") { url1 = buildUrl(currentLRMno, currentRow, lrm_indices1); }
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
        user_input_rte_nm = fixThisVerySpecificTextFormat(currentRow[rte_nm_lrm_indices]);
      } else {
        user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? currentRow[rte_nm_lrm_indices] : '';
      }

      let resultsArr = await matchOutputOnRteNm(inputMethod, currentLRMno, results0, user_input_rte_nm);
      // end get right route
      // assemble data
      let fullRowData = rowhead.concat(resultsArr); // this is an array
      refinedData.push(fullRowData);
    } else {
      // process multiple returns
      for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
        console.log("processing result: " + (aRowResult + 1) + " of " + (results0.length));
        let aRowResultObj = results0[aRowResult]; // but this is an object
        // Object.assign(aRowResultObj, { Feature: rowhead }); 
        refinedData.push(aRowResultObj);
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
  // future feature showBulkPointResults(refinedData);

  // export data
  tabularPointsConvertExport_2(refinedData); //FIXME need JS and KML support

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}
