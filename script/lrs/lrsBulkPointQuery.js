async function lrsBulkPointQuery(fileContents, currentLRMno, index_coord) {

  // input CSV
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;
  console.log(parsedInputCSV);


  // set fields
  // field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  //lrm_indices = field_indices[0];
  //let other_indices = field_indices[1];


  //let lrm_indices = [];



  // make array for output
  let refinedData = [];
  //refinedData.push(titleKeys)
  // skipping 0 header row

  // set title keys
  //let titleKeys = other_indices.map(i => parsedInputCSV[0][i]).concat(lrsApiFields);
  let titleKeys = lrsApiFields;
  titleKeys.unshift("Feature");


  // process rows
  for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
    let pointQueryOutput = [];
    console.log("processing row: " + rowToQuery + " of " + (parsedInputCSV.length));


    // build url
    let url = makeLrsQueryUrlFromIndex(currentLRMno, parsedInputCSV[rowToQuery], index_coord);
    console.log(url);
    // end build url

    // perform query
    let P_results = await queryService(url);
    console.log("returned " + P_results.length + " results for row: " + rowToQuery);
    // end perform query


    // get row header data
    //let rowhead = other_indices.map(i => parsedInputCSV[rowToQuery][i]);
    rowhead = (parsedInputCSV[rowToQuery])[0];
    console.log("rowhead");
    console.log(rowhead);

    // assemble data



    // process multiple returns
    for (let aRowResult = 0; aRowResult < P_results.length; aRowResult++) {
      console.log("processing result: " + aRowResult + " of " + (P_results.length));
      console.log(aRowResult);
      let aRowResultObj = P_results[aRowResult];
      Object.assign(aRowResultObj, { Feature: rowhead }); // may need to change this to concat for Objects?
      refinedData.push(aRowResultObj);
    }
  }

  // append feature info
  //refinedData.unshift(titleKeys);


  // show results
  // future feature showBulkPointResults(refinedData);

  // export data
  console.log("refinedData");
  console.log(refinedData);
  tabularPointsConvertExport(refinedData);

  YellowToGreen();

}