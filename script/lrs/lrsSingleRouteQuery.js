async function lrsSingleRouteQuery(currentLRMno, lrm_indices, currentRouteFieldOrder) {
  // single 
  // route

  /**
    currentLRMno = 4; //FIXME set this programatically
    currentRouteFieldOrder = ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'];
  */

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

  //let rte_nm_lrm_indices = '';

  // make array for output
  let routeQueryOutput = [];

  // set title keys
  // let titleKeys = ["Feature"].concat(lrsApiFields.map(i => 'BEGIN_' + i)).concat(lrsApiFields.map(i => 'END_' + i));


  // get indices
  if (currentLRMno == 1) {
    b_coord = lrm_indices.slice(0, 2);
    e_coord = lrm_indices.slice(2, 4);
    rte_nm = '';
  }

  else if (currentLRMno == 2) {
    b_coord = [lrm_indices[0], lrm_indices[1], lrm_indices[2]];
    e_coord = [lrm_indices[0], lrm_indices[3], lrm_indices[4]];
    rte_nm = $('#' + currentRouteFieldOrder[lrm_indices[0]]).val();
    routeQueryOutput.push(rte_nm);
  }

  else if (currentLRMno == 3) {
    b_coord = lrm_indices.slice(0, 2);
    e_coord = lrm_indices.slice(2, 4);
    rte_nm = '';
  }

  else if (currentLRMno == 4) {
    b_coord = [lrm_indices[0], lrm_indices[1]];
    e_coord = [lrm_indices[0], lrm_indices[2]];
    rte_nm = $('#' + currentRouteFieldOrder[lrm_indices[0]]).val();
    routeQueryOutput.push(rte_nm);
  }
  // end get indices

  // process rows

  // build url
  let B_url = makeLrsQueryUrl("html", currentLRMno, b_coord, currentRouteFieldOrder, 0);
  let E_url = makeLrsQueryUrl("html", currentLRMno, e_coord, currentRouteFieldOrder, 0);

  console.log(B_url);
  console.log(E_url);
  // end build url

  // perform query
  const B_results = await queryService(B_url);
  const E_results = await queryService(E_url);
  // end perform query

  //get right route
  await rteDfoAssembler(routeQueryOutput, "html", currentLRMno, B_results, E_results, rte_nm);
  // end get right route

  // get row header data
  // let rowhead = ''; // get from HTML

  // assemble data
  // let fullRowData = rowhead.concat(routeResulrsArr);
  // refinedData.push(fullRowData);






  // append feature info
  // refinedData.unshift(titleKeys);


  // show results
  showRouteResults(routeQueryOutput);

  // export data
  //TODO tabular export
  //tabularRoutesConvertExport(routeQueryOutput);

  YellowToGreen();
}