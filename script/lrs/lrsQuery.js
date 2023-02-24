async function lrsQuery(method, useMap, ...id_coord) {
  // single 
  // point


  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();










  // build url
  url = makeLrsQueryUrlFromHtml(method, id_coord);
  // end build url

  // perform query
  const results = await queryService(url);
  // end perform query

  showResults(results);

  // export data
  tabularPointsConvertExport(results);

  if (useMap == 1) {
    showPointResultsOnMap(results);
  }

  YellowToGreen();
}