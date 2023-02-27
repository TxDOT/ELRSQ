async function lrsSingleRouteQuery(currentLRMno, lrm_indices, currentRouteFieldOrder) {
  let inputMethod = "html";

  //set begin indices
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  //set begin indices

  let rte_nm_lrm_indices = '';

  // get indices
  if (currentLRMno == 1) {
    lrm_indices0 = [lrm_indices[0], lrm_indices[1]];
    lrm_indices1 = [lrm_indices[2], lrm_indices[3]];
    // blank line
  }

  else if (currentLRMno == 2) {
    lrm_indices0 = [lrm_indices[0], lrm_indices[1], lrm_indices[2]];
    lrm_indices1 = [lrm_indices[0], lrm_indices[3], lrm_indices[4]];
    rte_nm_lrm_indices = lrm_indices[0];
  }

  else if (currentLRMno == 3) {
    lrm_indices0 = [lrm_indices[0], lrm_indices[1]];
    lrm_indices1 = [lrm_indices[2], lrm_indices[3]];
    // blank line
  }

  else if (currentLRMno == 4) {
    lrm_indices0 = [lrm_indices[0], lrm_indices[1]];
    lrm_indices1 = [lrm_indices[0], lrm_indices[2]];
    rte_nm_lrm_indices = lrm_indices[0];
  }
  // end get indices











  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  // make array for output
  let refinedData = [];

  // process rows
  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
    let routeQueryOutput = [];
    let url0 = '';
    let url1 = '';

    // build url
    if (inputMethod == "html") {
      url0 = makeLrsQueryUrl("html", currentLRMno, lrm_indices0, currentRouteFieldOrder, 0);
      if (calcGeomType == "Route") { url1 = makeLrsQueryUrl("html", currentLRMno, lrm_indices1, currentRouteFieldOrder, 0); }
    } else if (inputMethod == "table") {
      url0 = buildUrl(currentLRMno, currentRow, lrm_indices0);
      if (calcGeomType == "Route") { url1 = buildUrl(currentLRMno, currentRow, lrm_indices1); }
    }
    // end build url

    // perform query
    let results0 = await queryService(url0);
    let results1 = '';
    if (calcGeomType == "Route") { results1 = await queryService(url1); }
    // end perform query

    // get row header data
    let rowhead = (inputMethod == "table") ? other_indices.map(i => currentRow[i]) : '';

    // get right route
    if (currentLRMno == 1 || currentLRMno == 3) {
      user_input_rte_nm = '';
    } else if (currentLRMno == 2 || currentLRMno == 4) {
      user_input_rte_nm = $('#' + currentRouteFieldOrder[rte_nm_lrm_indices]).val();
      routeQueryOutput.push(user_input_rte_nm);
    }
    await rteDfoAssembler(routeQueryOutput, "html", currentLRMno, results0, results1, user_input_rte_nm);
    // end get right route



    // assemble data
    // let routeQueryOutput = rowhead.concat(routeResultsArr);
    refinedData.push(routeQueryOutput);





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


  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}
