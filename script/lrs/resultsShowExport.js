function resultsShowExport(refinedData, inputMethod) {

  // show TABULAR results
  if (inputMethod == "html") {

    if (calcGeomType == "Point") {
      paginatedResultsSequence(refinedData);
      readOutPointResults(refinedData);
    } else if (calcGeomType == "Route") {
      //showRouteResults(refinedData);
    }

  } else if (inputMethod == "table") {

    if (calcGeomType == "Point") {
      paginatedResultsSequence(refinedData);
      readOutPointResults(refinedData);
      //showBulkPointResults(refinedData);
    } else if (calcGeomType == "Route") {
      //showBulkRouteResults(refinedData);
    }

  }


  // export data
  if (calcGeomType == "Point") {
    tabularPointsConvertExport(refinedData);
  } else if (calcGeomType == "Route") {
    tabularRoutesConvertExport(refinedData);
  }


  // plot to map
  if (useMap == 1) {
    showPointResultsOnMap(refinedData);

    if (calcGeomType == "Point") {
      showPointResultsOnMap(refinedData);

    } else if (calcGeomType == "Route") {
      //showLineResultsOnMap(refinedData);
    }
  }
}
