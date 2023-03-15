function objectifyRouteProject(currentResult) {
  console.log("objectifyRouteProject: currentResult: ");
  console.log(currentResult);
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



function objectifyPointProject(currentResult) {
  console.log("objectifyPointProject: currentResult: ");
  console.log(currentResult);
  let projObj = new Object();
  projObj.RTE_NM = currentResult['RTE_DEFN_LN_NM'];
  projObj.LAT = currentResult['LAT'];
  projObj.LON = currentResult['LON'];
  projObj.Color = currentResult['Color'];
  projObj.Width = currentResult['Width'];
  projObj.Desc = currentResult['Feature'];

  if (GLOBALSETTINGS.PrintProjGeom == 1) {
    let projString = JSON.stringify(projObj);
    console.log("objectifyPointProject: ");
    console.log(projString);
  }

  return projObj;

}
