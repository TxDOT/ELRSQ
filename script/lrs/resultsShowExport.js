function resultsShowExport(refinedData) {
  // show results
  if (inputMethod == "html") {
    if (calcGeomType == "Point") {
      showPointResults(refinedData);
    } else if (calcGeomType == "Line") {
      showRouteResults(refinedData);
    }
  } else if (inputMethod == "table") {
    if (calcGeomType == "Point") {
      showBulkPointResults(refinedData);
    } else if (calcGeomType == "Line") {
      showBulkRouteResults(refinedData);
    }
  }

  // export data
  if (calcGeomType == "Point") {
    tabularPointsConvertExport(refinedData);
  } else if (calcGeomType == "Line") {
    tabularRoutesConvertExport(refinedData);
  }

  if (useMap == 1) {
    showPointResultsOnMap(refinedData);
  }
}
