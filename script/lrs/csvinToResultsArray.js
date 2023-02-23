async function csvinToResultsArray(text, method, ...index_coord) {
  let parsedInputCSV = Papa.parse(text, { "skipEmptyLines": true }).data;
  console.log(parsedInputCSV);

  GreenToYellow();

  ////const titleKeys = Object.keys(outputArray[0][0])
  let titleKeys = lrsApiFields;
  titleKeys.unshift("Feature");
  let refinedData = [];
  //refinedData.push(titleKeys)
  // skipping 0 header row
  for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
    console.log("processing row: " + rowToQuery + " of " + (parsedInputCSV.length));

    let url = makeLrsQueryUrlFromIndex(method, parsedInputCSV[rowToQuery], index_coord);
    console.log(url);
    rowResults = await queryService(url);
    console.log("returned " + rowResults.length + " results for row: " + rowToQuery);

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

  console.log("refinedData");
  console.log(refinedData);
  tabularPointsConvertExport(refinedData);

  YellowToGreen();

}