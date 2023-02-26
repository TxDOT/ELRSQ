async function lrsBulkRouteQuery(currentLRMno, lrm_indices, fileContents) {
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
  let field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  lrm_indices = field_indices[0]; // why is this replaced the passed data?
  let other_indices = field_indices[1];


  //set begin indices
  let b_lrm_indices = [];
  let e_lrm_indices = [];
  let rte_nm_lrm_indices = '';
  //set begin indices

  // make array for output
  let refinedData = [];



  // get indices
  if (currentLRMno == 1) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1]];
    e_lrm_indices = [lrm_indices[2], lrm_indices[3]];
    rte_nm_lrm_indices = lrm_indices[4]; // optional
  }

  else if (currentLRMno == 2) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1], lrm_indices[2]];
    e_lrm_indices = [lrm_indices[0], lrm_indices[3], lrm_indices[4]];
    rte_nm_lrm_indices = lrm_indices[0];
  }

  else if (currentLRMno == 3) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1]];
    e_lrm_indices = [lrm_indices[2], lrm_indices[3]];
    rte_nm_lrm_indices = lrm_indices[4]; // optional
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
    console.log("processing row " + rowToQuery + " of " + (parsedInputCSV.length - 1));
    let queryOutput = [];

    // build url
    let B_url = makeLrsQueryUrlFromIndex(currentLRMno, parsedInputCSV[rowToQuery], b_lrm_indices, 1); // FIXME have this take function as argument
    let E_url = makeLrsQueryUrlFromIndex(currentLRMno, parsedInputCSV[rowToQuery], e_lrm_indices, 1);
    // let B_url = makeLrsQueryUrl("table", currentLRMno, b_coord, parsedInputCSV[rowToQuery], 0); //FIXME fix table import
    // let E_url = makeLrsQueryUrl("table", currentLRMno, e_coord, parsedInputCSV[rowToQuery], 0);
    console.log(B_url);
    console.log(E_url);
    // end build url

    // perform query
    let B_results = await queryService(B_url);
    let E_results = await queryService(E_url);
    // end perform query

    // get right route
    let rtenmformat = "AAdddd"; //TODO use regex to detect
    let user_input_rte_nm = '';
    if (rtenmformat == "AAdddd") {
      user_input_rte_nm = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    } else {
      user_input_rte_nm = parsedInputCSV[rowToQuery][rte_nm_lrm_indices];
    }
    let routeResultsArr = await matchOutputOnCommonRteNm("table", currentLRMno, B_results, E_results, user_input_rte_nm);
    console.log("routeResultsArr.length");
    console.log(routeResultsArr.length);
    // end get right route

    // get row header data
    let rowhead = other_indices.map(i => parsedInputCSV[rowToQuery][i]);

    // assemble data
    let fullRowData = rowhead.concat(routeResultsArr);
    refinedData.push(fullRowData);

  }

  // set column heads
  let customhead = other_indices.map(i => parsedInputCSV[0][i]);
  let standardhead = lrsApiFields.map(i => 'BEGIN_' + i).concat(lrsApiFields.map(i => 'END_' + i));
  let colhead = customhead.concat(standardhead);

  // prepend column heads
  refinedData.unshift(colhead);


  // show results
  // future feature showBulkRouteResults(refinedData);

  // export data
  tabularRoutesConvertExport(refinedData);

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }

  YellowToGreen();
}