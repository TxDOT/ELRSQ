async function lrsSinglePointQuery(currentLRMno, lrm_indices, rowFromArray) {
  // single 
  // point
  let inputMethod = "html";


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
    // no header row
    console.log("processing row " + rowToQuery + " of 1");
    let pointQueryOutput = [];

    // build url
    let url = makeLrsQueryUrl(inputMethod, currentLRMno, lrm_indices, rowFromArray, 0);
    // blank line
    console.log(url);
    // blank line
    // end build url

    // perform query
    let P_results = await queryService(url);
    console.log("returned " + P_results.length + " results for row: " + rowToQuery);
    // end perform query



    // get row header data
    let rowhead = ''; // get from HTML

    // assemble data



    // process multiple returns
    for (let aRowResult = 0; aRowResult < P_results.length; aRowResult++) {
      console.log("processing result: " + (aRowResult + 1) + " of " + (P_results.length));
      let aRowResultObj = P_results[aRowResult];
      // Object.assign(aRowResultObj, { Feature: rowhead }); // may need to change this to concat for Objects?
      refinedData.push(aRowResultObj);
    }
  }

  // set column heads // can this be moved to after the loop?
  let customhead = ["Feature"];
  let standardhead = lrsApiFields;
  let colhead = customhead.concat(standardhead);

  // prepend column heads
  // refinedData.unshift(colhead);


  // show results
  showResults(refinedData);

  // export data
  tabularPointsConvertExport(refinedData);

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}