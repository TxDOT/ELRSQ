// function which takes method to query lrs service for a single point
async function lrsDualQueryFromHtml(method, useMap, ...id_coord) {
  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  let routeQueryOutput = [];

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

  let B_url = makeLrsQueryUrlFromHtml(method, b_coord);
  let E_url = makeLrsQueryUrlFromHtml(method, e_coord);

  const B_results = await queryService(B_url);
  const E_results = await queryService(E_url);

  await rteDfoAssembler(routeQueryOutput, method, B_results, E_results, rte_nm);

  showRouteResults(routeQueryOutput);

  //TODO tabular export
  //tabularRoutesConvertExport(routeQueryOutput);

  YellowToGreen();
}
