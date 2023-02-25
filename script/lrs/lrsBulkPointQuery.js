async function lrsBulkPointQuery(currentLRMno, lrm_indices, fileContents) {
  // bulk 
  // point

  // input CSV
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  // resetGraphics();
  // resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  // set fields
  // let field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  // lrm_indices = field_indices[0];
  // let other_indices = field_indices[1];


  //let lrm_indices = [];

  // make array for output
  let refinedData = [];

  // set title keys
  //let titleKeys = other_indices.map(i => parsedInputCSV[0][i]).concat(lrsApiFields);
  let titleKeys = lrsApiFields;
  titleKeys.unshift("Feature");


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
    let P_results = await queryService(url);
    console.log("returned " + P_results.length + " results for row: " + rowToQuery);
    // end perform query


    // blank line

    // get row header data
    // let rowhead = other_indices.map(i => parsedInputCSV[rowToQuery][i]);
    let rowhead = (parsedInputCSV[rowToQuery])[0];


    // assemble data



    // process multiple returns
    for (let aRowResult = 0; aRowResult < P_results.length; aRowResult++) {
      console.log("processing result: " + (aRowResult + 1) + " of " + (P_results.length));
      let aRowResultObj = P_results[aRowResult];
      Object.assign(aRowResultObj, { Feature: rowhead }); // may need to change this to concat for Objects?
      refinedData.push(aRowResultObj);
    }
  }

  // append feature info
  // refinedData.unshift(titleKeys);


  // show results
  // future feature showBulkPointResults(refinedData);

  // export data
  tabularPointsConvertExport(refinedData);

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}