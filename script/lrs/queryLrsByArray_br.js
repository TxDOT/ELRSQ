async function queryLrsByArray_br(inputMethod, arrayToQuery, headerRowPresent, constrainToRouteName, rtenmformat, rte_nm_lrm_indices, other_indices, lrm_indices0, lrm_indices1) {
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
      if (inputMethod == "html") {
        if (rtenmformat == "AAdddd") {
          user_input_rte_nm = fixThisVerySpecificTextFormat(currentRow[rte_nm_lrm_indices]);
        } else {
          user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? currentRow[rte_nm_lrm_indices] : '';
        }
      } else if (inputMethod == "table") {
        user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? currentRow[rte_nm_lrm_indices] : '';
      }
      let unfilteredArr = (calcGeomType == "Point") ? [results0, results0] : [results0, results1];
      let resultsArr = await matchOutputOnRteNm(inputMethod, currentLRMno, unfilteredArr, user_input_rte_nm);
      console.log(resultsArr);
      // end get right route
      // assemble data
      let fullRowData = resultsArr;
      console.log(typeof rowhead !== 'undefined' && rowhead !== '');
      if (typeof rowhead !== 'undefined' && rowhead !== '') {
        fullRowData = rowhead.concat(resultsArr); // FIXME only do this if rowheae exists
      }


      // let fullRowData = rowhead.concat(resultsArr); // this is an array



      console.log(fullRowData);
      refinedData.push(fullRowData);
      console.log(refinedData);
      console.log(typeof refinedData);
    } else {
      // process multiple returns
      for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
        console.log("processing result: " + (aRowResult + 1) + " of " + (results0.length));
        let aRowResultObj = results0[aRowResult]; // but this is an object

        // Object.assign(aRowResultObj, { Feature: rowhead }); 
        refinedData.push(aRowResultObj);
        console.log(refinedData);
        console.log(typeof refinedData);
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
  console.log(typeof refinedData);
  refinedData.unshift(colhead); // ON for bulk route



  // show results
  // future feature showBulkRouteResults(refinedData);

  // export data
  tabularRoutesConvertExport(refinedData);

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  // resultsShowExport(refinedData, inputMethod);

  YellowToGreen();
}
