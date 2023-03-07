function resultsShowExport(refinedData, inputMethod) {

  // show TABULAR results
  if (inputMethod == "html") {

    if (CALCGEOMTYPE == "Point") {
      paginatedResultsSequence(refinedData);
      readOutPointResults(refinedData);
    } else if (CALCGEOMTYPE == "Route") {
      //showRouteResults(refinedData);
    }

  } else if (inputMethod == "table") {

    if (CALCGEOMTYPE == "Point") {
      paginatedResultsSequence(refinedData);
      readOutPointResults(refinedData);
      //showBulkPointResults(refinedData);
    } else if (CALCGEOMTYPE == "Route") {
      //showBulkRouteResults(refinedData);
    }

  }


  // export data
  if (CALCGEOMTYPE == "Point") {
    tabularPointsConvertExport(refinedData);
  } else if (CALCGEOMTYPE == "Route") {
    tabularRoutesConvertExport(refinedData);
  }


  // plot to map
  if (USEMAP == 1) {
    showPointResultsOnMap(refinedData);

    if (CALCGEOMTYPE == "Point") {
      showPointResultsOnMap(refinedData);

    } else if (CALCGEOMTYPE == "Route") {
      //showLineResultsOnMap(refinedData);
    }
  }
}
