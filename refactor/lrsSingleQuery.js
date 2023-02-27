async function lrsSingleQuery(currentLRMno) {
  let inputMethod = "html";
  let headerRowPresent = 0;

  // read in data
  // read user-entered input fields
  // requires currentLRMno, rtenmformat
  // set fields
  let field_indices = setIndicesByLrmAndGeom(currentLRMno, calcGeomType);
  let lrm_indices0 = field_indices[0][0];
  let lrm_indices1 = field_indices[0][1];
  let rte_nm_lrm_indices = field_indices[1];
  let currentFieldOrder = field_indices[2];
  // end set fields

  // pre-process data
  // retrieve data from input fields
  // putting in a loop for option of processing sequential entries
  let coordinateArr = [];

  /**
    for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
  
      let coordinateArr0 = [];
      for (let i = 0; i < lrm_indices0.length; i++) {
        let value = $('#' + currentFieldOrder[lrm_indices0[i]]).val();
        if ((currentLRMno == 2 || currentLRMno == 4) && rtenmformat == "AAdddd" && i == 0) {
          value = fixThisVerySpecificTextFormat(value);
        }
        coordinateArr0.push(value);
      }
      coordinateArr.push(coordinateArr0);
  
      let coordinateArr1 = [];
      if (calcGeomType == "Route") {
        for (let i = 0; i < lrm_indices1.length; i++) {
          let value = $('#' + currentFieldOrder[lrm_indices1[i]]).val();
          if ((currentLRMno == 2 || currentLRMno == 4) && rtenmformat == "AAdddd" && i == 0) {
            value = fixThisVerySpecificTextFormat(value);
          }
          coordinateArr1.push(value);
        }
      }
      coordinateArr.push(coordinateArr1);
  
      // or coordinateArr = coordinateArr0.concat(coordinateArr1);
    }
  */

  // revision to keep everything in one array // much cleaner

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

  queryLrsByArray(coordinateArr, headerRowPresent, constrainToRouteName, rtenmformat, rte_nm_lrm_indices, other_indices);
}
