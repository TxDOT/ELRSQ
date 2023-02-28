async function lrsBulkPointQuery(currentLRMno, lrm_indices, fileContents) {
  // bulk 
  // point
  let inputMethod = "table";

  // input CSV
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  // set fields
  // let field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  // lrm_indices = field_indices[0]; // why is this replaced the passed data?
  // let other_indices = field_indices[1];


  //let lrm_indices = [];

  // make array for output
  let refinedData = [];




  // process rows
  for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
    // skipping 0 header row
    console.log("processing row " + rowToQuery + " of " + (parsedInputCSV.length - 1));
    let pointQueryOutput = [];

    // build url
    let url = makeLrsQueryUrlFromIndex(currentLRMno, parsedInputCSV[rowToQuery], lrm_indices);
    // blank line
    console.log(url);
    // blank line
    // end build url

    // perform query
    let results0 = await queryService(url);
    console.log("returned " + results0.length + " results for row: " + rowToQuery);
    // end perform query



    // get row header data
    // let rowhead = other_indices.map(i => parsedInputCSV[rowToQuery][i]);
    let rowhead = (parsedInputCSV[rowToQuery])[0];


    // assemble data



    // process multiple returns
    for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
      console.log("processing result: " + (aRowResult + 1) + " of " + (results0.length));
      let aRowResultObj = results0[aRowResult];
      Object.assign(aRowResultObj, { Feature: rowhead }); // may need to change this to concat for Objects?
      refinedData.push(aRowResultObj);
    }
  }

  // set column heads // can this be moved to after the loop?
  let customhead = ["Feature"]
  // let customhead = other_indices.map(i => parsedInputCSV[0][i]);
  let standardhead = lrsApiFields;
  let colhead = customhead.concat(standardhead);

  // prepend column heads
  // refinedData.unshift(colhead);


  // show results
  // future feature showBulkPointResults(refinedData);

  // export data
  tabularPointsConvertExport(refinedData);

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}