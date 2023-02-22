
build-routes.html
<button type="button" onclick="queryProjectGeometry(projects)" class="btn btn-primary" Convert</button>

//iterates over projects array
//for each project, queries queryRecordFromServiceGeometry

async function queryProjectGeometry(myProjects) {
    projectLines = [];

    //get segment is called within a loop, for each project
    for (var i = 0; i < myProjects.length; i++) {
        let myProjectData = myProjects[i]
        await queryRoadwayServiceByLine(myProjectData);
    }
}


async function queryRoadwayServiceByLine(myProjectData) {

    url = "https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Roadways/FeatureServer/0" + "/query?f=json&where=" + "RTE_NM" + "='" +
        myProjectData.RTE_NM +
        "'&returnGeometry=true&outSR=4326&geometryPrecision=3&returnM=true&orderByFields=BEGIN_DFO"

    const results = await queryRoadwayService(url);
    myClippedLine = getSegment(results, myProjectData, projects);
    projectLines.push(myClippedLine);
}


async function queryRoadwayService(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return response.json(); // parses JSON response into native JavaScript objects
}


function getSegment(myData, myPrjAttributes, myProjects) {
  if (myData.features.length == 0) {
    myProjects.pop();
    makeRouteProjectsTable(myProjects);
    return;
  }

  var numberOfFeatures = myData.features.length - 1;
  var maxCoordsLength = myData.features[numberOfFeatures].geometry.paths[0].length - 1;
  var maxFeatureM = roundToDecimalPlace(myData.features[numberOfFeatures].geometry.paths[0][maxCoordsLength][2], 3);

  var theFrom = roundToDecimalPlace(myPrjAttributes.BDFO, 3);
  var theTo = roundToDecimalPlace(myPrjAttributes.EDFO, 3);

  //Checking END_DFO against Max Feature M value
  if (theTo > maxFeatureM) { theTo = maxFeatureM; }



  //vertex numbers
  var returnedFeatureGeomPart = [];
  var returnedFeatureGeom = [];

  for (var a = 0; a < myData.features.length; a++) {
    let vertexNumbers = setVertexNumbers(myData, a, theFrom, theTo)

    if (vertexNumbers[0] == vertexNumbers[1]) {
      //nothing
    }
    else {
      for (var x = vertexNumbers[0]; x <= vertexNumbers[1]; x++) {
        returnedFeatureGeomPart.push([myData.features[a].geometry.paths[0][x][0], myData.features[a].geometry.paths[0][x][1], myData.features[a].geometry.paths[0][x][2]]);
      }

      returnedFeatureGeom.push(returnedFeatureGeomPart);
    }
  }

  //Clipping to desired From and To

  clippedLine = clipFromToAndMakeGeoJson(returnedFeatureGeom, theFrom, theTo, myPrjAttributes);
  return clippedLine;
}




