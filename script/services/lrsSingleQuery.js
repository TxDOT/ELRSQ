/**
 *
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 *
 * adds values to coordinateArr
 * starts queryLrsByArray
 */
async function lrsSingleQuery(convertSessionParams) {
  let formEntryParams = new Object();
  formEntryParams.headerRowPresent = 0;
  formEntryParams.constrainToRouteName = (convertSessionParams.calcGeomType == "Route") ? 1 : 0;
  formEntryParams.rtenmformat = "AAdddd_dash_KG";

  let coordinateArr = [];

  let field_indicesObj = setIndicesByLrmAndGeom(convertSessionParams);
  let currentFieldOrder = field_indicesObj.currentFieldOrder;

  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
    let coordinateArr0 = [];
    for (let i = 0; i < currentFieldOrder.length; i++) {
      let value = $('#' + currentFieldOrder[i]).val();
      if ((convertSessionParams.currentLrmNo == 2 || convertSessionParams.currentLrmNo == 4) && formEntryParams.rtenmformat == "AAdddd" && i == 0) {
        value = fixThisVerySpecificTextFormat(value);
      }
      coordinateArr0.push(value);
    }
    coordinateArr.push(coordinateArr0);
  }

  queryLrsByArray(convertSessionParams, formEntryParams, coordinateArr, field_indicesObj);
}
