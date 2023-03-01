async function lrsBulkQuery(currentLRMno, fileContents, rtenmformat) {
  let headerRowPresent = 1;
  let constrainToRouteName = (calcGeomType == "Route") ? 1 : 0;
  //TODO use regex to detect rtenmformat
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = [];
  let other_indices = [];

  // read in data
  // read user-supplied table
  // input CSV
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  // set fields
  let field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  console.log(field_indices);
  lrm_indices0 = field_indices[0][0];
  lrm_indices1 = field_indices[0][1];
  rte_nm_lrm_indices = field_indices[1];
  other_indices = field_indices[2];
  // end set fields

  // pre-process data
  // fix route name field
  if (typeof rte_nm_lrm_indices !== 'undefined' && rtenmformat == "AAdddd") { //FIXME is this supposed to be and or or???
    for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
      parsedInputCSV[rowToQuery][rte_nm_lrm_indices] = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    }
  }
  // end pre-process data

  // end read user-supplied table
  // end read in data

  queryLrsByArray(inputMethod, parsedInputCSV, headerRowPresent, field_indices, constrainToRouteName, rtenmformat);
}