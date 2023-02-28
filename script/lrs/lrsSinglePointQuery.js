async function lrsSinglePointQuery(currentLRMno, lrm_indices, rowFromArray) {
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
      let queryOutput = [];
  
      // build url
      let url0 = makeLrsQueryUrl(inputMethod, currentLRMno, lrm_indices, rowFromArray, 0);
      // blank line
      console.log(url0);
      // blank line
      // end build url
  
      // perform query
      let results0 = await queryService(url0);
      console.log("returned " + results0.length + " results for row: " + rowToQuery);
      // end perform query
  
      // TODO make route dropdown???
  
      // get row header data
      let rowhead = ''; // get from HTML
  
      // assemble data
  
  
  
  
      // process multiple returns
      for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
        console.log("processing result: " + (aRowResult + 1) + " of " + (results0.length));
        let aRowResultObj = results0[aRowResult];
        // Object.assign(aRowResultObj, { Feature: rowhead }); // may need to change this to concat for Objects?
        refinedData.push(aRowResultObj);
      }
    }
  
    // set column heads
    let customhead = ["Feature"];
    let standardhead = lrsApiFields;
    let colhead = customhead.concat(standardhead);
  
    // prepend column heads
    // refinedData.unshift(colhead);
  
  
    // show results
    showPointResults(refinedData);
  
    // export data
    tabularPointsConvertExport(refinedData);
  
    if (useMap == 1) {
      showPointResultsOnMap(refinedData);
    }
  
    YellowToGreen();
  }