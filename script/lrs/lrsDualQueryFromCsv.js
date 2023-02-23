// function which takes method to query lrs service for a single point
async function lrsDualQueryFromCsv(method, parsedInputCSV, lrm_indices, other_indices) {

  let b_lrm_indices = [];
  let e_lrm_indices = [];
  let rte_nm_lrm_indices = '';

  GreenToYellow();

  let refinedData = [];
  let titleKeys = other_indices.map(i => parsedInputCSV[0][i]).concat(lrsApiFields.map(i => 'BEGIN_' + i)).concat(lrsApiFields.map(i => 'END_' + i)); //FIXME use all caps and underscore

  if (method == 1) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1]];
    e_lrm_indices = [lrm_indices[3], lrm_indices[3]];
    rte_nm_lrm_indices = lrm_indices[4];
  }

  else if (method == 2) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1], lrm_indices[2]];
    e_lrm_indices = [lrm_indices[0], lrm_indices[3], lrm_indices[4]];
    rte_nm_lrm_indices = lrm_indices[0];
  }

  else if (method == 3) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1]];
    e_lrm_indices = [lrm_indices[3], lrm_indices[3]];
    rte_nm_lrm_indices = lrm_indices[4];
  }

  else if (method == 4) {
    b_lrm_indices = [lrm_indices[0], lrm_indices[1]];
    e_lrm_indices = [lrm_indices[0], lrm_indices[2]];
    rte_nm_lrm_indices = lrm_indices[0];
  }


  // skipping 0 header row
  for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
    console.log("row " + (rowToQuery + 1) + " of " + parsedInputCSV.length);
    let routeQueryOutput = [];

    let user_input_rte_nm = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);

    let B_url = new_makeLrsQueryUrlFromIndex(method, parsedInputCSV[rowToQuery], b_lrm_indices, 1); // FIXME have this take function as argument
    let E_url = new_makeLrsQueryUrlFromIndex(method, parsedInputCSV[rowToQuery], e_lrm_indices, 1);

    console.log(B_url);
    console.log(E_url);

    const B_results = await queryService(B_url);
    const E_results = await queryService(E_url);

    let routeResulrsArr = rteOutputAssembler(routeQueryOutput, method, B_results, E_results, user_input_rte_nm);
    let rowhead = other_indices.map(i => parsedInputCSV[rowToQuery][i]);
    let fullRowData = rowhead.concat(routeResulrsArr);
    refinedData.push(fullRowData);
  }

  refinedData.unshift(titleKeys);

  //TODO tabular export
  tabularRoutesConvertExport(refinedData);

  YellowToGreen();

}
