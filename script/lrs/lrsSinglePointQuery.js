async function lrsSinglePointQuery(method, lrm_indices, rowFromArray) {
  // single 
  // point


  resetGraphics();
  resetCurrentPagination();

  let useMap =  1; //FIXME make parameter again, or make a global parameter not passed in function
  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();










  // build url
  // url = makeLrsQueryUrlFromHtml(method, id_coord); //FIXME change me back maybe
  url = makeLrsQueryUrl("html", method, lrm_indices, rowFromArray, 0)
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