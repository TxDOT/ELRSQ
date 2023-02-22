//// validate that there is an input
//// validate that input is a KG
//// retrieve position within projects array
//// add to projects array if it is not a duplicate

//do not delete
function addProjectToArray_old(myProjects) {
  console.log("addProjectToArray");
  projString = [document.input.RTE_NM.value, document.input.BDFO.value, document.input.EDFO.value,
  document.input.Color.value, + document.input.Width.value, document.input.Desc.value]

  if (myProjects.indexOf(projString) < 0) {
    myProjects.push(projString);
  }
  console.log("addProjectToArray calling listQueries");
  listQueries(myProjects);
}



function addProjectToArray(myProjects) {
  console.log("addProjectToArray");
  let RTE_NM = $(outputFieldIDs.RTE_DEFN_LN_NM).html();
  let BDFO = $(outputFieldIDs.BDFO).html();
  let EDFO = $(outputFieldIDs.EDFO).html();
  let Color = $('#colors').val();
  let Width = $('#width').val();
  let Desc = $('#description').val();

  // projString = [RTE_NM, BDFO, EDFO, Color, Width, Desc];

  // if (myProjects.indexOf(projString) < 0) {
  //   myProjects.push(projString);
  // }

  let projObj = new Object();
  projObj.RTE_NM = RTE_NM;
  projObj.BDFO = BDFO;
  projObj.EDFO = EDFO;
  projObj.Color = Color;
  projObj.Width = Width;
  projObj.Desc = Desc;
  let projString = JSON.stringify(projObj);
  console.log(projString);

  if (myProjects.indexOf(projObj) < 0) {
    myProjects.push(projObj);
  }


  //console.log("addProjectToArray calling listQueries");
  listQueries(myProjects);
}



//// validate that there is an input
//function routeNameValidator()

//// validate that input is a KG
//function routeCenterlineValidator()


function listQueries(myProjects) {
  //console.log("listQueries");
  var arrayForTable = [["ID", "Route", "From", "To", "Color", "Width", "Description"]];

  for (var i = 0; i < myProjects.length; i++) {
    arrayForTable.push([i + 1].concat(myProjects[i]));
  }

  if (myProjects.length == 0) {
    $('#routes-table').html("");
  } else {
    $('#routes-table').html(makeTableFromArray(arrayForTable));
  }
}


// removes last project in projects array
function removeLastProject(myProjects, myProjectLines) {
  console.log("removeLastProject");
  myProjects.pop();

  if (myProjects.length == 0) {
    clearProjectArrays(myProjects, myProjectLines);
  }

  myProjectLines.pop();
  console.log("removeLastProject calling listQueries");
  listQueries(myProjects);
  console.log("removeLastProject calling parseGeometryToGeoJSON");
  parseGeometryToGeoJSON(myProjectLines);
}


//clears the arrays
function clearProjectArrays(myProjects, myProjectLines) {
  console.log("clearProjectArrays");
  myProjects = [];
  myProjectLines = [];
  console.log("clearProjectArrays calling listQueries");
  listQueries(myProjects);
  console.log("clearProjectArrays calling parseGeometryToGeoJSON");
  parseGeometryToGeoJSON(myProjectLines);
}


// function getSegment(myData, myPrjAttributes, myProjects) {
//   console.log("getSegment");
//   console.log(Object.keys(myData));
//   console.log(Object.keys(myPrjAttributes));
//   console.log(Object.keys(myProjects));

//   if (myData.features.length == 0) {
//     //alert("Route not found, please check the Route Name and try again.");
//     myProjects.pop();
//     listQueries(myProjects);
//     return;
//   }
//   console.log(myPrjAttributes);
//   // var theFrom = roundToDecimalPlace(myPrjAttributes[1], 3);
//   // var theTo = roundToDecimalPlace(myPrjAttributes[2], 3);

//   var theFrom = roundToDecimalPlace(myPrjAttributes.BDFO, 3);
//   var theTo = roundToDecimalPlace(myPrjAttributes.EDFO, 3);

//   var returnedFeatureGeomPart = [];
//   var returnedFeatureGeom = [];
//   // var maxCoordsLength;
//   // var maxFeatureM;

//   // why are we subtracting 1 here?
//   // var numberOfFeatures = myData.features.length - 1;
//   // var numberOfFeatures = myData.features.length - 0; //change me back later
//   // maxCoordsLength = myData.features[numberOfFeatures].geometry.paths[0].length - 1;
//   // maxFeatureM = roundToDecimalPlace(myData.features[numberOfFeatures].geometry.paths[0][maxCoordsLength][2], 3);


//   // maxCoordsLength = myData.features.last().geometry.paths[0].length - 1;
//   // maxFeatureM = roundToDecimalPlace(myData.features.last().geometry.paths[0][maxCoordsLength][2], 3);


//   // maxCoordsLength = myData.features.last().geometry.paths[0].length - 1;
//   let maxFeatureM = roundToDecimalPlace(myData.features.last().geometry.paths[0].last()[2], 3);



//   //Checking END_DFO against Max Feature M value
//   if (theTo > maxFeatureM) {
//     theTo = maxFeatureM;
//     alert("End DFO reduced to Max Road DFO (" + theTo + ") for project " + myPrjAttributes[0]);
//   }

//   //vertex numbers
//   for (var a = 0; a < myData.features.length; a++) {
//     console.log("myData.features.length : " + myData.features.length);

//     //console.log("getSegment calling setVertexNumbers");
//     //console.log("feature count: " + myData.features.length);
//     //let vertexNumbers = setVertexNumbers(myData, a, theFrom, theTo) // why is this not acting on myData.features ???
//     let vertexNumbers = setVertexNumbers(myData.features[a], theFrom, theTo) // why is this not acting on myData.features ???

//     if (vertexNumbers[0] == vertexNumbers[1]) {
//       //nothing
//     }
//     else {
//       for (var x = vertexNumbers[0]; x <= vertexNumbers[1]; x++) {
//         //returnedFeatureGeomPart.push([myData.features[a].geometry.paths[0][x][0], myData.features[a].geometry.paths[0][x][1], myData.features[a].geometry.paths[0][x][2]]);
//         returnedFeatureGeomPart.push(myData.features[a].geometry.paths[0][x]);
//       }
//       returnedFeatureGeom.push(returnedFeatureGeomPart);
//     }
//   }

//   //Clipping to desired From and To
//   //console.log("getSegment calling clipFromTo");
//   clippedLine = clipFromTo(returnedFeatureGeom, theFrom, theTo, myPrjAttributes);

//   return clippedLine;
// }





function getSegment(myRoadwayQueryResults, myPrjAttributes, myProjects) {
  console.log("getSegment");
  // console.log(Object.keys(myRoadwayQueryResults));
  // console.log(Object.keys(myPrjAttributes));
  // console.log(Object.keys(myProjects));

  //// multiple results are orderByFields=BEGIN_DFO

  if (myRoadwayQueryResults.features.length == 0) {
    myProjects.pop();
    listQueries(myProjects);
    return;
  }
  //console.log(myPrjAttributes);

  var theFrom = roundToDecimalPlace(myPrjAttributes.BDFO, 3);
  var theTo = roundToDecimalPlace(myPrjAttributes.EDFO, 3);

  // this targets the last (if > 1) feature returned by the roadway query (has highest BDFO)
  let maxFeatureM = roundToDecimalPlace(myRoadwayQueryResults.features.last().geometry.paths[0].last()[2], 3);

  //Checking END_DFO against Max Feature M value
  if (theTo > maxFeatureM) {
    theTo = maxFeatureM;
    alert("End DFO reduced to Max Road DFO (" + theTo + ") for project " + myPrjAttributes.RTE_NM);
  }

  //vertex numbers
  //console.log("myRoadwayQueryResults.features.length : " + myRoadwayQueryResults.features.length);
  var returnedFeatureGeom = [];
  for (var aFeature = 0; aFeature < myRoadwayQueryResults.features.length; aFeature++) {
    var returnedLineString = [];
    let vertexNumbers = setVertexNumbers(myRoadwayQueryResults.features[aFeature], theFrom, theTo)
    if (!(vertexNumbers[0] == vertexNumbers[1])) {
      //console.log(vertexNumbers);
      for (var vertex = vertexNumbers[0]; vertex <= vertexNumbers[1]; vertex++) {
        //console.log("pushing " + myPrjAttributes.RTE_NM + " vertex");
        returnedLineString.push(myRoadwayQueryResults.features[aFeature].geometry.paths[0][vertex]);
      }
      //console.log("pushing " + myPrjAttributes.RTE_NM + " linestring");
      returnedFeatureGeom.push(returnedLineString);
    }
  }

  //Clipping to desired From and To
  clippedLine = clipFromTo(returnedFeatureGeom, theFrom, theTo, myPrjAttributes);

  return clippedLine;
}






// //function setVertexNumbers(theData, a, theFrom, theTo)
// function setVertexNumbers(myData, a, myFrom, myTo) {
//   //console.log("setVertexNumbers");
//   returnedFeatureGeomPart = [];
//   var vertexBeginNumber = 0;
//   var vertexEndNumber = 0;

//   //Check Event M's vs. Feature M's 
//   maxCoordsLength = myData.features[a].geometry.paths[0].length - 1;
//   var minFeatureM = roundToDecimalPlace(myData.features[a].geometry.paths[0][0][2], 3);
//   var maxFeatureM = roundToDecimalPlace(myData.features[a].geometry.paths[0][maxCoordsLength][2], 3);

//   //Take the whole thing
//   if (myFrom <= minFeatureM && myTo >= maxFeatureM) {
//     vertexBeginNumber = 0;
//     vertexEndNumber = maxCoordsLength;
//   }

//   //If the From value is only on this segment
//   if (myFrom >= minFeatureM && myFrom <= maxFeatureM && myTo > maxFeatureM) {
//     vertexBeginNumber = 0;
//     vertexEndNumber = maxCoordsLength;

//     for (var j = 1; j < myData.features[a].geometry.paths[0].length; j++) {
//       prevCoordM = roundToDecimalPlace(myData.features[a].geometry.paths[0][j - 1][2], 3);
//       curCoordM = roundToDecimalPlace(myData.features[a].geometry.paths[0][j][2], 3);

//       if (myFrom >= prevCoordM && myFrom <= curCoordM) {
//         vertexBeginNumber = j - 1;
//       }
//     }
//   }

//   //Find the middle
//   if (myFrom >= minFeatureM && myTo <= maxFeatureM) {
//     for (var j = 1; j < myData.features[a].geometry.paths[0].length; j++) {
//       prevCoordM = roundToDecimalPlace(myData.features[a].geometry.paths[0][j - 1][2], 3);
//       curCoordM = roundToDecimalPlace(myData.features[a].geometry.paths[0][j][2], 3);

//       if (myFrom >= prevCoordM && myFrom <= curCoordM) {
//         vertexBeginNumber = j - 1;
//       }

//       if (myTo >= prevCoordM && myTo <= curCoordM) {
//         vertexEndNumber = j;
//       }
//     }
//   }

//   //If the To value is only on this segment
//   if (myTo >= minFeatureM && myTo <= maxFeatureM && myFrom < minFeatureM) {
//     vertexBeginNumber = 0;
//     for (var j = 1; j < myData.features[a].geometry.paths[0].length; j++) {
//       prevCoordM = roundToDecimalPlace(myData.features[a].geometry.paths[0][j - 1][2], 3);
//       curCoordM = roundToDecimalPlace(myData.features[a].geometry.paths[0][j][2], 3);

//       if (myTo >= prevCoordM && myTo <= curCoordM) {
//         vertexEndNumber = j;
//       }
//     }
//   }

//   var vertexNumbers = [vertexBeginNumber, vertexEndNumber];
//   //console.log(vertexNumbers);
//   return vertexNumbers;
// }




//function setVertexNumbers(theData, a, theFrom, theTo)
function setVertexNumbers(feature, myFrom, myTo) {
  //console.log("setVertexNumbers");
  returnedFeatureGeomPart = [];
  var vertexBeginNumber = 0;
  var vertexEndNumber = 0;

  //Check Event M's vs. Feature M's 
  //maxCoordsLength = feature.geometry.paths[0].last();
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

  var vertexNumbers = [vertexBeginNumber, vertexEndNumber];
  //console.log(vertexNumbers);
  return vertexNumbers;
}







// // clips
// function clipFromTo(myReturnedFeatureGeom, myFrom, myTo, myPrjAttributes) {
//   let aClippedLine = [];
//   console.log("clipFromTo myReturnedFeatureGeom.length : " + myReturnedFeatureGeom.length);
//   //Clipping to desired From and To
//   if (myReturnedFeatureGeom.length == 1) {
//     var newBeginPoint = locatePointOnLine(myReturnedFeatureGeom[0], myFrom);
//     var newEndPoint = locatePointOnLine(myReturnedFeatureGeom[0], myTo);

//     //Replace first item
//     myReturnedFeatureGeom[0].shift();
//     myReturnedFeatureGeom[0].splice(0, 1, [newBeginPoint[0], newBeginPoint[1], myFrom]);

//     //Replace last item
//     myReturnedFeatureGeom[0].pop();
//     myReturnedFeatureGeom[0].push([newEndPoint[0], newEndPoint[1], myTo]);

//     aClippedLine.push([myReturnedFeatureGeom[0], myPrjAttributes]);
//   }
//   if (myReturnedFeatureGeom.length == 2) {
//     var newBeginPoint = locatePointOnLine(myReturnedFeatureGeom[0], myFrom);
//     var newEndPoint = locatePointOnLine(myReturnedFeatureGeom[1], myTo);

//     //Replace first item on first piece
//     myReturnedFeatureGeom[0].shift();
//     myReturnedFeatureGeom[0].splice(0, 1, [newBeginPoint[0], newBeginPoint[1], myFrom]);

//     //Replace last item on second piece
//     myReturnedFeatureGeom[1].pop();
//     myReturnedFeatureGeom[1].push([newEndPoint[0], newEndPoint[1], myTo]);

//     aClippedLine.push([myReturnedFeatureGeom[0], myPrjAttributes]);
//     aClippedLine.push([myReturnedFeatureGeom[1], myPrjAttributes]);
//   }
//   if (myReturnedFeatureGeom.length > 2) {
//     var lastSegmentNumber = myReturnedFeatureGeom.length - 1;
//     var newBeginPoint = locatePointOnLine(myReturnedFeatureGeom[0], myFrom);
//     var newEndPoint = locatePointOnLine(myReturnedFeatureGeom[lastSegmentNumber], myTo);

//     //Replace first item on first piece
//     myReturnedFeatureGeom[0].shift();
//     myReturnedFeatureGeom[0].splice(0, 1, [newBeginPoint[0], newBeginPoint[1], myFrom]);

//     //Replace last item on last piece
//     myReturnedFeatureGeom[lastSegmentNumber].pop();
//     myReturnedFeatureGeom[lastSegmentNumber].push([newEndPoint[0], newEndPoint[1], myTo]);

//     //Place all items in project list
//     for (var b = 0; b < myReturnedFeatureGeom.length; b++) {
//       aClippedLine.push([myReturnedFeatureGeom[b], myPrjAttributes]); // do attributes need to be joined each time?
//     }
//   }

//   return aClippedLine;
// }






// clips
function clipFromTo(myReturnedFeatureGeom, myFrom, myTo, myPrjAttributes) {
  let aClippedLine = [];
  console.log("clipFromTo myReturnedFeatureGeom.length : " + myReturnedFeatureGeom.length);

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
    aClippedLine.push([myReturnedFeatureGeom[b], myPrjAttributes]); // do attributes need to be joined each time?
  }

  return aClippedLine;
}


//The Line with Geometry and Desired M value
function locatePointOnLine(theLine, pointMeasure) {
  //console.log("locatePointOnLine");
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
      //return pointLocation;
    }
  }

  return pointLocation;
}

