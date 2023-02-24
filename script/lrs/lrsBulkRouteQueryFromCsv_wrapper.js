async function lrsBulkRouteQueryFromCsv_wrapper(fileContents) {
  // bulk 
  // route

  // input CSV
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  currentLRMno = 2; //FIXME set this programatically
  //lrm_indices = [0, 1, 2];
  currentPointFieldOrder = ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement'];
  currentRouteFieldOrder = ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'];

  // set fields
  let field_indices = await setTableFieldsByMethod(currentLRMno, parsedInputCSV);
  let lrm_indices = field_indices[0];
  let other_indices = field_indices[1];

  await lrsBulkRouteQueryFromCsv(currentLRMno, parsedInputCSV, lrm_indices, other_indices);
}


