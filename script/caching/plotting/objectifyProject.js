/**
 * 
 * @param {*} currentResult is an object with route characteristics
 * @returns a project object consisting of route, DFOs, and drawing characteristics
 */
function objectifyRouteProject(currentResult) {
  //WATCH this is on the data to geojson to map chain
  console.log("objectify-Route-Project: currentResult: " + currentResult);
  let projObj = new Object();
  projObj.RTE_NM = currentResult['BEGIN_RTE_DEFN_LN_NM'];
  projObj.BDFO = currentResult['BEGIN_RTE_DFO'];
  projObj.EDFO = currentResult['END_RTE_DFO'];
  projObj.Color = currentResult['Color'];
  projObj.Width = currentResult['Width'];
  projObj.Desc = currentResult['Feature'];

  if (GLOBALSETTINGS.PrintProjGeom == 1) {
    let projString = JSON.stringify(projObj);
    console.log("objectify-Route-Project: " + projString);
  }

  return projObj;
}



function objectifyPointProject(currentResult) {
  //WATCH this could be on the data to geojson to map chain
  console.log("objectify-Point-Project: currentResult: " + currentResult);
  let projObj = new Object();
  projObj.RTE_NM = currentResult['RTE_DEFN_LN_NM'];
  projObj.LAT = currentResult['LAT'];
  projObj.LON = currentResult['LON'];
  projObj.Color = currentResult['Color'];
  projObj.Width = currentResult['Width'];
  projObj.Desc = currentResult['Feature'];

  if (GLOBALSETTINGS.PrintProjGeom == 1) {
    let projString = JSON.stringify(projObj);
    console.log("objectify-Point-Project: " + projString);
  }

  return projObj;
}
