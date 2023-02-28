async function lrsSinglePointQuery(currentLRMno, inputMethod) {
  let headerRowPresent = 0;
  let constrainToRouteName = 0;
  let rtenmformat = "AAdddd_dash_KG"; //TODO use regex to detect
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = [];
  let other_indices = [];

  // read in data
  // read user-entered input fields
  // requires currentLRMno, rtenmformat
  // set fields
  let field_indices = setIndicesByLrmAndGeom(currentLRMno, calcGeomType);
  lrm_indices0 = field_indices[0][0];
  lrm_indices1 = field_indices[0][1];
  rte_nm_lrm_indices = field_indices[1];
  let currentFieldOrder = field_indices[2];
  // end set fields

  // pre-process data
  // retrieve data from input fields
  // putting in a loop for option of processing sequential entries
  let coordinateArr = [];

  // revision to keep everything in one array // much cleaner

  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
    let coordinateArr0 = [];
    for (let i = 0; i < currentFieldOrder.length; i++) {
      let value = $('#' + currentFieldOrder[i]).val();
      if ((currentLRMno == 2 || currentLRMno == 4) && rtenmformat == "AAdddd" && i == 0) {

      }
      coordinateArr0.push(value);
    }
    coordinateArr.push(coordinateArr0);
  }

  // end pre-process data
  // outputs coordinateArr, an array of user-entered values
  // end read user-entered input fields
  // end read in data

  queryLrsByArray_sp(inputMethod, coordinateArr, headerRowPresent, constrainToRouteName, rtenmformat, rte_nm_lrm_indices, other_indices);
}