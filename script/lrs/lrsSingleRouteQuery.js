async function lrsSingleQuery(currentLRMno, inputMethod) {
  let headerRowPresent = 0;
  let constrainToRouteName = (calcGeomType == "Route") ? 1 : 0;
  let rtenmformat = "AAdddd_dash_KG"; //TODO use regex to detect
  let rte_nm_lrm_indices = [];

  // read in data
  // read user-entered input fields
  // requires currentLRMno, rtenmformat
  // set fields
  let field_indices = setIndicesByLrmAndGeom(currentLRMno);
  rte_nm_lrm_indices = field_indices[1];
  let currentFieldOrder = field_indices[2];
  // end set fields

  // pre-process data
  // retrieve data from input fields
  // putting in a loop for option of processing sequential entries
  let coordinateArr = [];

  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
    let coordinateArr0 = [];
    for (let i = 0; i < currentFieldOrder.length; i++) {
      let value = $('#' + currentFieldOrder[i]).val();
      if ((currentLRMno == 2 || currentLRMno == 4) && rtenmformat == "AAdddd" && i == 0) {
        value = fixThisVerySpecificTextFormat(value);
      }
      coordinateArr0.push(value);
    }
    coordinateArr.push(coordinateArr0);
  }

  // end pre-process data
  // outputs coordinateArr, an array of user-entered values
  // end read user-entered input fields
  // end read in data

  queryLrsByArray(inputMethod, coordinateArr, headerRowPresent, field_indices, constrainToRouteName, rtenmformat);
}