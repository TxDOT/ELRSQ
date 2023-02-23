// if result has multiple rows, write each row individually
function breakMultipleResults(parsedInputCSV, rowToQuery, rowResults) {
  let out_rows = [];
  console.log("breakMultipleResults");

  rowhead = (parsedInputCSV[rowToQuery])[0];
  console.log("rowhead");
  console.log(rowhead);

  for (let aRowResult = 0; aRowResult < rowResults.length; aRowResult++) {
    let aRowResultObj = rowResults[aRowResult];
    Object.assign(aRowResultObj, { Feature: rowhead });
    out_rows.push(aRowResultObj);
  }

  return out_rows;
}
