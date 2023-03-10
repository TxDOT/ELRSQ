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


function getSegment(myRoadwayQueryResults, myPrjAttributes, myProjectDrawParameters) {
  //// multiple results are orderByFields=BEGIN_DFO

  if (myRoadwayQueryResults.features.length == 0) {
    myProjectDrawParameters.pop();
    makeRouteProjectsTable(myProjectDrawParameters);
    return;
  }

  var theFrom = roundToDecimalPlace(myPrjAttributes.BDFO, 3);
  var theTo = roundToDecimalPlace(myPrjAttributes.EDFO, 3);

  //// this targets the last (if > 1) feature returned by the roadway query (has highest BDFO)
  let maxFeatureM = roundToDecimalPlace(myRoadwayQueryResults.features.last().geometry.paths[0].last()[2], 3);

  //// Checking END_DFO against Max Feature M value
  if (theTo > maxFeatureM) {
    theTo = maxFeatureM;
    alert("End DFO reduced to Max Road DFO (" + theTo + ") for project " + myPrjAttributes.RTE_NM);
  }

  //vertex numbers
  var returnedFeatureGeom = [];
  for (var aFeature = 0; aFeature < myRoadwayQueryResults.features.length; aFeature++) {
    var returnedLineString = [];
    let vertexNumbers = setVertexNumbers(myRoadwayQueryResults.features[aFeature], theFrom, theTo);
    if (!(vertexNumbers.vertexBeginNumber == vertexNumbers.vertexEndNumber)) {
      for (var vertex = vertexNumbers.vertexBeginNumber; vertex <= vertexNumbers.vertexEndNumber; vertex++) {
        returnedLineString.push(myRoadwayQueryResults.features[aFeature].geometry.paths[0][vertex]);
      }
      returnedFeatureGeom.push(returnedLineString);
    }
  }

  //Clipping to desired From and To
  let aFeatureCollectionObj = clipFromToAndMakeGeoJson(returnedFeatureGeom, theFrom, theTo, myPrjAttributes);
  return aFeatureCollectionObj;
}


//function setVertexNumbers(theData, a, theFrom, theTo)
function setVertexNumbers(feature, myFrom, myTo) {
  //returnedFeatureGeomPart = [];
  var vertexBeginNumber = 0;
  var vertexEndNumber = 0;

  //Check Event M's vs. Feature M's 
  var minFeatureM = roundToDecimalPlace(feature.geometry.paths[0][0][2], 3);
  var maxFeatureM = roundToDecimalPlace(feature.geometry.paths[0].last()[2], 3);

  //Take the whole thing
  if (myFrom <= minFeatureM && myTo >= maxFeatureM) {
    vertexBeginNumber = 0;
    vertexEndNumber = feature.geometry.paths[0].length - 1;
  }

  //If the From value is only on this segment
  if (myFrom >= minFeatureM && myFrom <= maxFeatureM && myTo > maxFeatureM) {
    vertexBeginNumber = 0;
    vertexEndNumber = feature.geometry.paths[0].length - 1;

    for (var j = 1; j < feature.geometry.paths[0].length; j++) {
      prevCoordM = roundToDecimalPlace(feature.geometry.paths[0][j - 1][2], 3);
      curCoordM = roundToDecimalPlace(feature.geometry.paths[0][j][2], 3);

      if (myFrom >= prevCoordM && myFrom <= curCoordM) {
        vertexBeginNumber = j - 1;
      }
    }
  }

  //Find the middle
  if (myFrom >= minFeatureM && myTo <= maxFeatureM) {
    for (var j = 1; j < feature.geometry.paths[0].length; j++) {
      prevCoordM = roundToDecimalPlace(feature.geometry.paths[0][j - 1][2], 3);
      curCoordM = roundToDecimalPlace(feature.geometry.paths[0][j][2], 3);

      if (myFrom >= prevCoordM && myFrom <= curCoordM) {
        vertexBeginNumber = j - 1;
      }

      if (myTo >= prevCoordM && myTo <= curCoordM) {
        vertexEndNumber = j;
      }
    }
  }

  //If the To value is only on this segment
  if (myTo >= minFeatureM && myTo <= maxFeatureM && myFrom < minFeatureM) {
    vertexBeginNumber = 0;
    for (var j = 1; j < feature.geometry.paths[0].length; j++) {
      prevCoordM = roundToDecimalPlace(feature.geometry.paths[0][j - 1][2], 3);
      curCoordM = roundToDecimalPlace(feature.geometry.paths[0][j][2], 3);

      if (myTo >= prevCoordM && myTo <= curCoordM) {
        vertexEndNumber = j;
      }
    }
  }

  var vertexNumbers = JSON.parse(`{"vertexBeginNumber": ${vertexBeginNumber}, "vertexEndNumber": ${vertexEndNumber}}`);
  return vertexNumbers;
}


// clips
function clipFromToAndMakeGeoJson(myReturnedFeatureGeom, myFrom, myTo, myPrjAttributes) {
  let aFeatureCollectionArray = [];
  if (GLOBALSETTINGS.PrintIterations == 1) {
    console.log("clipFromToAndMakeGeoJson myReturnedFeatureGeom.length : " + myReturnedFeatureGeom.length);
  }

  //Clipping to desired From and To
  var newBeginPoint = [];
  var newEndPoint = [];

  Array.prototype.push.apply(newBeginPoint, locatePointOnLine(myReturnedFeatureGeom[0], myFrom));
  Array.prototype.push.apply(newEndPoint, locatePointOnLine(myReturnedFeatureGeom.last(), myTo));

  newBeginPoint.push(myFrom);
  newEndPoint.push(myTo);

  myReturnedFeatureGeom[0].shift();
  myReturnedFeatureGeom[0].unshift(newBeginPoint);
  myReturnedFeatureGeom.last().pop();
  myReturnedFeatureGeom.last().push(newEndPoint);

  for (var b = 0; b < myReturnedFeatureGeom.length; b++) {

    let aGeometryObj = new Object();
    aGeometryObj.type = "LineString";
    aGeometryObj.coordinates = myReturnedFeatureGeom[b];

    let aFeatureObj = new Object();
    aFeatureObj.type = "Feature";
    aFeatureObj.properties = myPrjAttributes;
    aFeatureObj.geometry = aGeometryObj;
    aFeatureObj.id = "abc123";

    aFeatureCollectionArray.push(aFeatureObj);
  }

  let metadata = [];
  let aFeatureCollectionObj = new Object();
  aFeatureCollectionObj.type = "FeatureCollection";
  aFeatureCollectionObj.metadata = metadata;
  aFeatureCollectionObj.features = aFeatureCollectionArray;

  return aFeatureCollectionObj;
}


//The Line with Geometry and Desired M value
function locatePointOnLine(theLine, pointMeasure) {
  var pointLocation = [];
  var PrevCoordM;
  var CurCoordM;
  var beginM = 0;
  var endM = 0;
  var beginPoint = [];
  var endPoint = [];
  var totalLength;
  var beginPercentOfWhole;
  var beginRemainderPercent;
  var newX;
  var newY;

  for (var i = 1; i < theLine.length; i++) {
    PrevCoordM = roundToDecimalPlace(theLine[i - 1][2], 3);
    CurCoordM = roundToDecimalPlace(theLine[i][2], 3);

    //Finding the points on either side of the desired measure
    if (pointMeasure >= PrevCoordM && pointMeasure <= CurCoordM) {
      beginM = roundToDecimalPlace(theLine[i - 1][2], 3);
      beginPoint.push(theLine[i - 1][0], theLine[i - 1][1]);

      endM = roundToDecimalPlace(theLine[i][2], 3);
      endPoint.push(theLine[i][0], theLine[i][1]);

      //Total length for calc
      totalLength = roundToDecimalPlace(endM - beginM, 3);

      //Percents of begin/end calc
      beginPercentOfWhole = roundToDecimalPlace((pointMeasure - beginM) / totalLength, 2);
      beginRemainderPercent = 1 - beginPercentOfWhole;

      //New X
      newX = (beginPercentOfWhole * endPoint[0]) + (beginRemainderPercent * beginPoint[0]);

      //New Y
      newY = (beginPercentOfWhole * endPoint[1]) + (beginRemainderPercent * beginPoint[1]);

      pointLocation.push(newX, newY);
    }
  }

  return pointLocation;
}