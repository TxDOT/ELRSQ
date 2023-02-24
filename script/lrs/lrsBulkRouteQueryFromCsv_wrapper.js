
async function lrsBulkRouteQueryFromCsv_wrapper(fileContents) {
  // bulk 
  // route


  // input CSV
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  let method = 2; //FIXME set this programatically

  // set fields
  let field_indices = await setTableFieldsByMethod(method, parsedInputCSV);
  let lrm_indices = field_indices[0];
  let other_indices = field_indices[1];

  await lrsBulkRouteQueryFromCsv(method, parsedInputCSV, lrm_indices, other_indices);
}


