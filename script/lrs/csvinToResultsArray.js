async function csvinToResultsArray(text, method, index_coord) {

  // input CSV
  let parsedInputCSV = Papa.parse(text, { "skipEmptyLines": true }).data;
  console.log(parsedInputCSV);

  GreenToYellow();



  // make array for output
  let refinedData = [];
  //refinedData.push(titleKeys)
  // skipping 0 header row

  // set title keys

  let titleKeys = lrsApiFields;
  ////const titleKeys = Object.keys(outputArray[0][0])
  titleKeys.unshift("Feature");

  // get indices

  // end get indices


  // process rows
  for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
    console.log("processing row: " + rowToQuery + " of " + (parsedInputCSV.length));

    // build url
    let url = makeLrsQueryUrlFromIndex(method, parsedInputCSV[rowToQuery], index_coord);
    console.log(url);
    // end build url

    // perform query
    rowResults = await queryService(url);
    console.log("returned " + rowResults.length + " results for row: " + rowToQuery);
    // end perform query

    // assemble data
    rowhead = (parsedInputCSV[rowToQuery])[0];
    console.log("rowhead");
    console.log(rowhead);

    for (let aRowResult = 0; aRowResult < rowResults.length; aRowResult++) {
      console.log("processing result: " + aRowResult + " of " + (rowResults.length));
      console.log(aRowResult);
      let aRowResultObj = rowResults[aRowResult];
      Object.assign(aRowResultObj, { Feature: rowhead });
      refinedData.push(aRowResultObj);
    }
  }

  // export data
  console.log("refinedData");
  console.log(refinedData);
  tabularPointsConvertExport(refinedData);

  YellowToGreen();

}