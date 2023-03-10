//// validate that there is an input
//// validate that input is a KG
//// retrieve position within GLOBALPROJECTDATA.ProjectDrawParameters array
//// add to GLOBALPROJECTDATA.ProjectDrawParameters array if it is not a duplicate

function addProjectToArray(currentResult) {
  /**
    let RTE_NM = currentResult['BEGIN_RTE_DEFN_LN_NM'];
    let BDFO = currentResult['BEGIN_RTE_DFO'];
    let EDFO = currentResult['END_RTE_DFO'];
    let Color = currentResult['Color'];
    let Width = currentResult['Width'];
    let Desc = currentResult['Feature'];
  */

  let projObj = new Object();
  projObj.RTE_NM = currentResult['BEGIN_RTE_DEFN_LN_NM'];
  projObj.BDFO = currentResult['BEGIN_RTE_DFO'];
  projObj.EDFO = currentResult['END_RTE_DFO'];
  projObj.Color = currentResult['Color'];
  projObj.Width = currentResult['Width'];
  projObj.Desc = currentResult['Feature'];
  let projString = JSON.stringify(projObj);

  if (GLOBALSETTINGS.PrintProjGeom == 1) {
    console.log("addProjectToArray: ");
    console.log(projString);
  }

  if (GLOBALPROJECTDATA.ProjectDrawParameters.indexOf(projObj) < 0) {
    GLOBALPROJECTDATA.ProjectDrawParameters.push(projObj);
  }

}


function addProjectToArray_pg(currentResult) {
  let projObj = new Object();
  projObj.RTE_NM = currentResult['BEGIN_RTE_DEFN_LN_NM'];
  projObj.BDFO = currentResult['BEGIN_RTE_DFO'];
  projObj.EDFO = currentResult['END_RTE_DFO'];
  projObj.Color = currentResult['Color'];
  projObj.Width = currentResult['Width'];
  projObj.Desc = currentResult['Feature'];
  let projString = JSON.stringify(projObj);

  if (GLOBALSETTINGS.PrintProjGeom == 1) {
    console.log("addProjectToArray_pg: ");
    console.log(projString);
  }

return projObj;

}




function addProjectToArray_sequential(myProjectDrawParameters) {
  /**
    let RTE_NM = $(outputFieldIDs.RTE_DEFN_LN_NM_ROUTE).html();
    let BDFO = $(outputFieldIDs.RTE_DFO_BEGIN).html();
    let EDFO = $(outputFieldIDs.RTE_DFO_END).html();
    let Color = $('#color').val();
    let Width = $('#width').val();
    let Desc = $('#description').val();
  */

  let projObj = new Object();
  projObj.RTE_NM = $(outputFieldIDs.RTE_DEFN_LN_NM_ROUTE).html();
  projObj.BDFO = $(outputFieldIDs.RTE_DFO_BEGIN).html();
  projObj.EDFO = $(outputFieldIDs.RTE_DFO_END).html();
  projObj.Color = $('#color').val();
  projObj.Width = ('#width').val();
  projObj.Desc = $('#description').val();
  let projString = JSON.stringify(projObj);

  if (GLOBALSETTINGS.PrintProjGeom == 1) {
    console.log("addProjectToArray: ");
    console.log(projString);
  }

  if (myProjectDrawParameters.indexOf(projObj) < 0) {
    myProjectDrawParameters.push(projObj);
  }

  makeRouteProjectsTable(myProjectDrawParameters);
}


//// validate that there is an input
//function routeNameValidator()

//// validate that input is a KG
//function routeCenterlineValidator()


function makeRouteProjectsTable(myProjectDrawParameters) {
  var arrayForTable = [["ID", "Route", "From", "To", "Color", "Width", "Description"]];

  for (var projectno = 0; projectno < myProjectDrawParameters.length; projectno++) {
    arrayForTable.push(
      [projectno + 1].concat(
        Object.values(myProjectDrawParameters[projectno])
      ));
  }

  if (myProjectDrawParameters.length == 0) {
    $('#routes-table').html("");
  } else {
    $('#routes-table').html(makeTableFromArray(arrayForTable));
  }
}


// removes last project in myProjectDrawParameters array
function dropLastProjectFromArray(myProjectDrawParameters, myProjectFeatureCollections) {
  console.log("dropLastProjectFromArray");
  myProjectDrawParameters.pop();

  if (myProjectDrawParameters.length == 0) {
    clearProjectsFromArray(myProjectDrawParameters, myProjectFeatureCollections);
  }

  myProjectFeatureCollections.pop();
  makeRouteProjectsTable(myProjectDrawParameters);
  // parseGeometryToGeoJSON(myProjectFeatureCollections); // lost function
}


//clears the arrays
function clearProjectsFromArray(myProjectDrawParameters, myProjectFeatureCollections) {
  console.log("clearProjectsFromArray");
  resetProjectDrawParameters();
  resetProjectFeatureCollections();
  makeRouteProjectsTable(myProjectDrawParameters);
  // parseGeometryToGeoJSON(myProjectFeatureCollections); // lost function
}

