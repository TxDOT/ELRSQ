async function lrsSinglePointQuery(currentLRMno, lrm_indices, rowFromArray) {
  // single 
  // point


  resetGraphics();
  resetCurrentPagination();

  let useMap = 1; //FIXME make parameter again, or make a global parameter not passed in function
  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();




  // make array for output
  let refinedData = [];

  // set title keys
  let titleKeys = ["Feature"].concat(lrsApiFields);





  // build url
  let url = makeLrsQueryUrl("html", currentLRMno, lrm_indices, rowFromArray, 0);

  // end build url

  // perform query
  let P_results = await queryService(url);

  // end perform query




  // get row header data
  let rowhead = ''; // get from HTML

  // assemble data



  // process multiple returns
  // append feature info
  // show results
  showResults(P_results);

  // export data
  tabularPointsConvertExport(P_results);

  if (useMap == 1) {
    showPointResultsOnMap(P_results);
  }

  YellowToGreen();
}