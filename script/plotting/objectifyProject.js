/**
 * 
 * @param {*} currentResult is an object with route characteristics
 * @returns a project object consisting of route, DFOs, and drawing characteristics
 */
function objectifyRouteProject(currentResult) {
  let projObj = new Object();
  projObj.RTE_NM = currentResult['BEGIN_RTE_DEFN_LN_NM'];
  projObj.BDFO = currentResult['BEGIN_RTE_DFO'];
  projObj.EDFO = currentResult['END_RTE_DFO'];
  projObj.Color = currentResult['Color'];
  projObj.Width = currentResult['Width'];
  projObj.Desc = currentResult['Feature'];

  if (GLOBALSETTINGS.PrintProjGeom == 1) {
    let projString = JSON.stringify(projObj);
    console.log("objectifyRouteProject: ");
    console.log(projString);
  }

  return projObj;

}
