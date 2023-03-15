/**
 *
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 * @param {*} fileContents CSV file to be parsed
 * @param {*} rtenmformat an alphanumeric format for the input route name
 *
 * parses CSV file
 * starts queryLrsByArray
 */
async function lrsBulkQuery(convertSessionParams, fileContents, rtenmformat) {
  let formEntryParams = new Object();
  formEntryParams.headerRowPresent = 1;
  formEntryParams.constrainToRouteName = (convertSessionParams.calcGeomType == "Route") ? 1 : 1; // changing this so bulk points are constrained as well
  formEntryParams.rtenmformat = rtenmformat;

  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  let field_indicesObj = await setTableFieldsByMethod(convertSessionParams, parsedInputCSV);
  let rte_nm_lrm_indices = field_indicesObj.rte_nm_lrm_indices;

  if (typeof rte_nm_lrm_indices !== 'undefined' && rtenmformat == "AAdddd") {
    for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
      parsedInputCSV[rowToQuery][rte_nm_lrm_indices] = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    }
  }

  queryLrsByArray(convertSessionParams, formEntryParams, parsedInputCSV, field_indicesObj);
}
