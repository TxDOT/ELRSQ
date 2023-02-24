async function lrsSingleRouteQueryFromHtml(method, useMap, id_coord) {
  // single 
  // route

  currentLRMno = 4; //FIXME set this programatically
  currentRouteFieldOrder = ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'];


  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  // make array for output
  let routeQueryOutput = [];


  // get indices
  if (method == 1) {
    b_coord = id_coord.slice(0, 2);
    e_coord = id_coord.slice(2, 4);
    rte_nm = '';
  }

  else if (method == 2) {
    b_coord = [id_coord[0], id_coord[1], id_coord[2]];
    e_coord = [id_coord[0], id_coord[3], id_coord[4]];
    rte_nm = $("#" + id_coord[0]).val();
    routeQueryOutput.push(rte_nm);
  }

  else if (method == 3) {
    b_coord = id_coord.slice(0, 2);
    e_coord = id_coord.slice(2, 4);
    rte_nm = '';
  }

  else if (method == 4) {
    b_coord = [id_coord[0], id_coord[1]];
    e_coord = [id_coord[0], id_coord[2]];
    rte_nm = $("#" + id_coord[0]).val();
    routeQueryOutput.push(rte_nm);
  }
  // end get indices


  // process rows

  // build url
  let B_url = makeLrsQueryUrlFromHtml(method, b_coord);
  let E_url = makeLrsQueryUrlFromHtml(method, e_coord);
  // end build url


  // perform query
  const B_results = await queryService(B_url);
  const E_results = await queryService(E_url);
  // end perform query



  //get right route
  await rteDfoAssembler(routeQueryOutput, method, B_results, E_results, rte_nm);
  // end get right route

  // show results
  showRouteResults(routeQueryOutput);

  // export data
  //TODO tabular export
  //tabularRoutesConvertExport(routeQueryOutput);

  YellowToGreen();
}
