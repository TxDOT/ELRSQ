// bulk conversion functions

async function bwd_setMethodAndFields(fileContents) {
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  // set fields
  let field_indices = await bwd_setFields(parsedInputCSV);
  let lrm_indices = field_indices[0];
  let other_indices = field_indices[1];

  await bwd_lrsDualQuery(parsedInputCSV, lrm_indices, other_indices); // need to determine template
}
