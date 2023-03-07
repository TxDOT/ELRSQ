async function queryLrsByArray_sr(inputMethod, arrayToQuery, headerRowPresent, field_indices, constrainToRouteName, rtenmformat) {
  console.log(constrainToRouteName + ", " + rtenmformat);
  resetGraphics();
  resetCurrentPagination();

  if (USEMAP == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  lrm_indices0 = field_indices[0][0];
  lrm_indices1 = field_indices[0][1];
  rte_nm_lrm_indices = field_indices[1];
  let currentFieldOrder = field_indices[2];

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
      url0 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices0);
      console.log(url0);
      if (CALCGEOMTYPE == "Route") { url1 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices1); }
    } else if (inputMethod == "table") {
      url0 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices0);
      console.log(url0);
      if (CALCGEOMTYPE == "Route") { url1 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices1); }
    }
    // end build url

    // perform query
    let results0 = await queryService(url0);
    let results1 = '';
    if (CALCGEOMTYPE == "Route") { results1 = await queryService(url1); }
    console.log("returned " + results0.length + " results for row: " + rowToQuery);
    // end perform query

    // get row header data
    let rowhead = (inputMethod == "table") ? other_indices.map(i => currentRow[i]) : ['feature'];

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
      let unfilteredArr = (CALCGEOMTYPE == "Point") ? [results0, results0] : [results0, results1];
      let resultsArr = await matchOutputOnRteNm(inputMethod, CURRENTLRMNO, unfilteredArr, user_input_rte_nm);
      // end get right route
      // assemble data
      let fullRowData = resultsArr;
      if (typeof rowhead !== 'undefined' && rowhead !== '') {
        fullRowData = rowhead.concat(resultsArr);
      }

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
  let standardhead = (CALCGEOMTYPE == "Point") ? lrsApiFields : lrsApiFields.map(i => 'BEGIN_' + i).concat(lrsApiFields.map(i => 'END_' + i));
  let colhead = customhead.concat(standardhead);

  // prepend column heads
  if (CALCGEOMTYPE == "Route") {
    refinedData.unshift(colhead); // ON for single route
  }




  // export data
  tabularRoutesConvertExport(refinedData);

  if (USEMAP == 1) {
    showPointResultsOnMap(refinedData);
  }

  // resultsShowExport(refinedData, inputMethod);

  YellowToGreen();
}
