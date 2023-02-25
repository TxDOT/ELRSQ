async function lrsBulkRouteQuery(fileContents) {
  // bulk 
  // route

  // input CSV
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  /**
    currentLRMno = 2; //FIXME set this programatically
    //lrm_indices = [0, 1, 2];
    currentPointFieldOrder = ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement'];
    currentRouteFieldOrder = ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'];
  */

  // set fields
  let field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  let lrm_indices = field_indices[0];
  let other_indices = field_indices[1];

  //set begin indices
  let b_lrm_indices = [];
  let e_lrm_indices = [];
  //set begin indices

  let rte_nm_lrm_indices = '';

  GreenToYellow();

  // make array for output
  let refinedData = [];

  // set title keys
  let titleKeys = other_indices.map(i => parsedInputCSV[0][i]).concat(lrsApiFields.map(i => 'BEGIN_' + i)).concat(lrsApiFields.map(i => 'END_' + i));


  // get indices
  if (currentLRMno == 1) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1]];
    e_lrm_indices = [lrm_indices[2], lrm_indices[3]];
    rte_nm_lrm_indices = lrm_indices[4];
  }

  else if (currentLRMno == 2) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1], lrm_indices[2]];
    e_lrm_indices = [lrm_indices[0], lrm_indices[3], lrm_indices[4]];
    rte_nm_lrm_indices = lrm_indices[0];
  }

  else if (currentLRMno == 3) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1]];
    e_lrm_indices = [lrm_indices[2], lrm_indices[3]];
    rte_nm_lrm_indices = lrm_indices[4];
  }

  else if (currentLRMno == 4) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1]];
    e_lrm_indices = [lrm_indices[0], lrm_indices[2]];
    rte_nm_lrm_indices = lrm_indices[0];
  }
  // end get indices

  // process rows
  for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
    // skipping 0 header row
    console.log("row " + (rowToQuery + 1) + " of " + parsedInputCSV.length);
    let routeQueryOutput = [];

    let user_input_rte_nm = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);

    // build url
    let B_url = makeLrsQueryUrlFromIndex(currentLRMno, parsedInputCSV[rowToQuery], b_lrm_indices, 1); // FIXME have this take function as argument
    let E_url = makeLrsQueryUrlFromIndex(currentLRMno, parsedInputCSV[rowToQuery], e_lrm_indices, 1);

    console.log(B_url);
    console.log(E_url);
    // end build url

    // perform query
    const B_results = await queryService(B_url);
    const E_results = await queryService(E_url);
    // end perform query

    // get right route
    let routeResultsArr = await rteOutputAssembler(routeQueryOutput, "table", currentLRMno, B_results, E_results, user_input_rte_nm);
    // end get right route

    // get row header data
    let rowhead = other_indices.map(i => parsedInputCSV[rowToQuery][i]);

    // assemble data
    let fullRowData = rowhead.concat(routeResultsArr);
    refinedData.push(fullRowData);





  }

  // append feature info
  refinedData.unshift(titleKeys);


  // show results
  // future feature showBulkRouteResults(refinedData);

  // export data
  //TODO tabular export
  tabularRoutesConvertExport(refinedData);

  YellowToGreen();

}