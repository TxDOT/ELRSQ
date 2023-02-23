// function which takes method to query lrs service for a single point
async function bwd_lrsDualQuery(parsedInputCSV, lrm_indices, other_indices) {

  GreenToYellow();

  let refinedData = [];
  let titleKeys = other_indices.map(i => parsedInputCSV[0][i]).concat(lrsApiFields.map(i => 'Begin ' + i)).concat(lrsApiFields.map(i => 'End ' + i));
  let b_lrm_indices = [lrm_indices[0], lrm_indices[1], lrm_indices[2]];
  let e_lrm_indices = [lrm_indices[0], lrm_indices[3], lrm_indices[4]];
  let rte_nm_lrm_indices = lrm_indices[0];

  // skipping 0 header row
  for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
    console.log("row " + (rowToQuery + 1) + " of " + parsedInputCSV.length);
    let routeQueryOutput = [];

    let user_input_rte_nm = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    let B_url = bwd_makeLrsQueryUrlFromIndex(parsedInputCSV[rowToQuery], b_lrm_indices, 1); // FIXME have this take function as argument
    let E_url = bwd_makeLrsQueryUrlFromIndex(parsedInputCSV[rowToQuery], e_lrm_indices, 1);

    console.log(B_url);
    console.log(E_url);

    const B_results = await queryService(B_url);
    const E_results = await queryService(E_url);

    let routeResulrsArr = bwd_Rte_Output_Assembler(routeQueryOutput, B_results, E_results, user_input_rte_nm);
    let rowhead = other_indices.map(i => parsedInputCSV[rowToQuery][i]);
    let fullRowData = rowhead.concat(routeResulrsArr);
    refinedData.push(fullRowData);
  }

  refinedData.unshift(titleKeys);

  //TODO tabular export
  tabularRoutesConvertExport(refinedData);

  YellowToGreen();

}
