async function lrsSingleRouteQuery(currentLRMno, lrm_indices, currentRouteFieldOrder) {
  // single 
  // route
  let inputMethod = "html";


  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  //set begin indices
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  //set begin indices

  let rte_nm_lrm_indices = '';

  // make array for output
  let refinedData = [];



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

  // process rows
  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
    // no header row
    console.log("processing row " + rowToQuery + " of 1");
    let routeQueryOutput = [];

    // build url
    let url0 = makeLrsQueryUrl("html", currentLRMno, lrm_indices0, currentRouteFieldOrder, 0);
    let url1 = makeLrsQueryUrl("html", currentLRMno, lrm_indices1, currentRouteFieldOrder, 0);
    console.log(url0);
    console.log(url1);
    // end build url

    // perform query
    let results0 = await queryService(url0);
    let results1 = await queryService(url1);
    // end perform query

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

  // set column heads // can this be moved to after the loop?
  let customhead = ["Feature"];
  let standardhead = lrsApiFields.map(i => 'BEGIN_' + i).concat(lrsApiFields.map(i => 'END_' + i));
  // let colhead = customhead.concat(standardhead);

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