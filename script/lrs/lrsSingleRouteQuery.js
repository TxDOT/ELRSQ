async function lrsSingleRouteQuery(currentLRMno, lrm_indices, currentRouteFieldOrder) {
  // single 
  // route


  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  //set begin indices
  let b_coord = [];
  let e_coord = [];
  //set begin indices

  let rte_nm_lrm_indices = '';


  // make array for output
  let refinedData = [];

  // set column heads // can this be moved to after the loop?
  let customhead = ["Feature"];
  let standardhead = lrsApiFields.map(i => 'BEGIN_' + i).concat(lrsApiFields.map(i => 'END_' + i));
  // let colhead = customhead.concat(standardhead);


  // get indices
  if (currentLRMno == 1) {
    b_coord = lrm_indices.slice(0, 2);
    e_coord = lrm_indices.slice(2, 4);
    // blank line
  }

  else if (currentLRMno == 2) {
    b_coord = [lrm_indices[0], lrm_indices[1], lrm_indices[2]];
    e_coord = [lrm_indices[0], lrm_indices[3], lrm_indices[4]];
    rte_nm_lrm_indices = lrm_indices[0];
  }

  else if (currentLRMno == 3) {
    b_coord = lrm_indices.slice(0, 2);
    e_coord = lrm_indices.slice(2, 4);
    // blank line
  }

  else if (currentLRMno == 4) {
    b_coord = [lrm_indices[0], lrm_indices[1]];
    e_coord = [lrm_indices[0], lrm_indices[2]];
    rte_nm_lrm_indices = lrm_indices[0];
  }
  // end get indices

  // process rows
  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
    // no header row
    console.log("processing row " + rowToQuery + " of 1");
    let routeQueryOutput = [];

    // build url
    let B_url = makeLrsQueryUrl("html", currentLRMno, b_coord, currentRouteFieldOrder, 0);
    let E_url = makeLrsQueryUrl("html", currentLRMno, e_coord, currentRouteFieldOrder, 0);
    console.log(B_url);
    console.log(E_url);
    // end build url

    // perform query
    let B_results = await queryService(B_url);
    let E_results = await queryService(E_url);
    // end perform query

    // get right route
    if (currentLRMno == 1 || currentLRMno == 3) {
      rte_nm = '';
    } else if (currentLRMno == 2 || currentLRMno == 4) {
      rte_nm = $('#' + currentRouteFieldOrder[rte_nm_lrm_indices]).val();
      routeQueryOutput.push(rte_nm);
    }
    await rteDfoAssembler(routeQueryOutput, "html", currentLRMno, B_results, E_results, rte_nm);
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
  // tabularRoutesConvertExport(routeQueryOutput); // TODO tabular export

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}