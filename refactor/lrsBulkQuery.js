async function lrsBulkQuery(currentLRMno, fileContents) {
  let inputMethod = "table";
  let headerRowPresent = 1;

  // read in data
  // read user-supplied table
  // input CSV
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  // set fields
  let field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  let lrm_indices0 = field_indices[0][0];
  let lrm_indices1 = field_indices[0][1];
  let rte_nm_lrm_indices = field_indices[2];
  let other_indices = field_indices[1];
  // end set fields

  // pre-process data
  // fix route name field
  if (typeof rte_nm_lrm_indices !== 'undefined' || rtenmformat == "AAdddd") {
    for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
      parsedInputCSV[rowToQuery][rte_nm_lrm_indices] = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    }
  }
  // end pre-process data
  
  // end read user-supplied table
  // end read in data

  queryLrsByArray(parsedInputCSV, headerRowPresent, constrainToRouteName, rtenmformat, rte_nm_lrm_indices, other_indices);
}
