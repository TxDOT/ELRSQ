/**
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 * @param {*} arrayToQuery 
 * @param {*} headerRowPresent 
 * @param {*} field_indices 
 * @param {*} constrainToRouteName a binary value of whether results should be filtered to match on route name
 * @param {*} rtenmformat an alphanumeric format for the input route name
 */
async function queryLrsByArray(convertSessionParams, formEntryParams, arrayToQuery, field_indicesObj) {
  resetGraphics();
  resetCurrentPagination();

  if (GLOBALSETTINGS.UseMap == 1) {
    clearGraphicsFromMap(); //this only removes graphics
  }

  GreenToYellow();
  resetProgressAndDownloads();
  $("#bulk-convert-progress-bar").show();
  $("#input-toolbar-msg").hide();

  let lrm_indices0 = field_indicesObj.lrm_indices0;
  let lrm_indices1 = field_indicesObj.lrm_indices1;
  let rte_nm_lrm_indices = field_indicesObj.rte_nm_lrm_indices;
  let other_indices = field_indicesObj.other_indices;

  // make array for output
  let lrsQueryObjsArr = [];

  // process rows
  for (let rowToQuery = formEntryParams.headerRowPresent; rowToQuery < arrayToQuery.length; rowToQuery++) {
    if (GLOBALSETTINGS.PrintIterations == 1) { console.log("processing row " + rowToQuery + " of " + (arrayToQuery.length - formEntryParams.headerRowPresent)); }

    let lrsQueryObj = {};
    lrsQueryObj.url = [];
    lrsQueryObj.resultswide = [];
    lrsQueryObj.resultsnarrow = [];
    lrsQueryObj.data = [];
    lrsQueryObj.geojson = []; // this is now an array to account for multiple returns
    lrsQueryObj.matcherror = 0;

    let currentRow = arrayToQuery[rowToQuery];

    // build url & perform query
    let url0 = buildUrl(convertSessionParams.currentLrmNo, currentRow, lrm_indices0);
    lrsQueryObj.url[0] = url0;
    let results0 = await queryService(url0);
    var results0_filtered = results0.map(function (e) { e = _.pick(e, fieldsKeep); return e; });
    lrsQueryObj.resultswide[0] = results0;
    lrsQueryObj.resultsnarrow[0] = results0_filtered;
    if (GLOBALSETTINGS.PrintUrls == 1) { console.log(url0); }

    if (convertSessionParams.calcGeomType == "Route") {
      let url1 = buildUrl(convertSessionParams.currentLrmNo, currentRow, lrm_indices1);
      lrsQueryObj.url[1] = url1;
      let results1 = await queryService(url1);
      var results1_filtered = results1.map(function (e) { e = _.pick(e, fieldsKeep); return e; });
      lrsQueryObj.resultswide[1] = results1;
      lrsQueryObj.resultsnarrow[1] = results1_filtered;
      if (GLOBALSETTINGS.PrintUrls == 1) { console.log(url1); }
    }

    if (GLOBALSETTINGS.PrintIterations == 1) { console.log("returned " + results0_filtered.length + " results for row: " + rowToQuery); }
    // end build url & perform query

    let featureDescription = $("#description").val() || 'feature';
    let featureColor = $("#color").val() || "#14375a";
    let featureWidth = $("#width").val() || "3";

    // get row header data
    let otherAttributesKey = (convertSessionParams.inputMethod == "table") ? other_indices.map(i => arrayToQuery[0][i]) : ["Feature", "Color", "Width"];
    let otherAttributesValue = (convertSessionParams.inputMethod == "table") ? other_indices.map(i => currentRow[i]) : [featureDescription, featureColor, featureWidth];
    let otherAttributesObj = {};
    otherAttributesKey.forEach((otherAttributesKey, i) => otherAttributesObj[otherAttributesKey] = otherAttributesValue[i]);

    // return single geom filtered on route name, or return multiple results
    if (formEntryParams.constrainToRouteName == 1) {
      // in this case only a single element is pushed to lrsQueryObj.data
      let user_input_rte_nm = getRightRouteName_Pre(convertSessionParams.inputMethod, formEntryParams.rtenmformat, rte_nm_lrm_indices, currentRow);
      let matchObj = await matchOutputOnRteNm(convertSessionParams, lrsQueryObj.resultsnarrow, user_input_rte_nm);
      lrsQueryObj.matcherror = matchObj.matcherror;
      lrsQueryObj.data.push({ ...otherAttributesObj, ...matchObj.match }); // this makes an object from the attribute values and lrs values and pushes it to an array
      if (lrsQueryObj.matcherror < 0) { $("#input-toolbar-msg").show() };
    }

    else {
      // in this case multiple elements are pushed to lrsQueryObj.data
      // process multiple returns
      let matchObj = filterMultipleReturns(convertSessionParams, lrsQueryObj.resultswide);
      lrsQueryObj.matcherror = matchObj.matcherror;
      lrsQueryObj.resultsnarrow[0] = matchObj.filteredresults.map(function (e) { e = _.pick(e, fieldsKeep); return e; });

      for (let aRowResult = 0; aRowResult < lrsQueryObj.resultsnarrow[0].length; aRowResult++) {
        if (GLOBALSETTINGS.PrintIterations == 1) { console.log("processing result: " + (aRowResult + 1) + " of " + (lrsQueryObj.resultsnarrow[0].length)); }
        lrsQueryObj.data.push({ ...otherAttributesObj, ...lrsQueryObj.resultsnarrow[0][aRowResult] });
        if (lrsQueryObj.resultsnarrow[0][aRowResult].RTE_DEFN_LN_NM == null) { lrsQueryObj.matcherror = -1; };
        if (lrsQueryObj.matcherror < 0) { $("#input-toolbar-msg").show() };
      }
    }
    // end return single geom filtered on route name, or return multiple results

    if (lrsQueryObj.matcherror >= 0) {
      if (convertSessionParams.calcGeomType == "Point") {
        try {
          for (let i = 0; i < lrsQueryObj.data.length; i = i + 1) {
            let projObj = objectifyPointProject(lrsQueryObj.data[i]);
            let aProjectFeatureArr = jsonFromLrsApiToPointGeoJson(projObj);
            lrsQueryObj.geojson.push(aProjectFeatureArr);
          }
        } catch { }
      }

      if (convertSessionParams.calcGeomType == "Route") {
        try {
          for (let i = 0; i < lrsQueryObj.data.length; i = i + 1) {
            let projObj = objectifyRouteProject(lrsQueryObj.data[i]);
            let results = await queryRoadwayServiceByLine(projObj);
            let aProjectFeatureArr = jsonFromAgoApiToRouteGeoJson(results, projObj);
            lrsQueryObj.geojson.push(aProjectFeatureArr); // this is an array with one or many features
          }
        } catch { }
      }
    }

    lrsQueryObjsArr.push(lrsQueryObj);
    updateProgressBar(rowToQuery, (arrayToQuery.length - formEntryParams.headerRowPresent));
  }
  // end process rows for loop
  console.log("process rows for loop complete");

  SESSIONHISTORYARR.push(lrsQueryObjsArr);

  resultsShow(convertSessionParams.calcGeomType);
  resultsExport(convertSessionParams.calcGeomType);

  YellowToGreen();
}


/**
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} formEntryReturnedData 
 */
async function resultsShow(calcGeomType) {
  let formEntryReturnedData = SESSIONHISTORYARR.last().map(queryObj => queryObj.data).flat(); // data may have multiple elements
  let formEntryReturnedGeom = SESSIONHISTORYARR.last().map(queryObj => queryObj.geojson).flat(); // data may have multiple elements
  ONSCREENMATCH = SESSIONHISTORYARR.last()[0];

  setProjectGeometry(formEntryReturnedData); // FIXME add results caching

  if (calcGeomType == "Point") {
    paginatedResultsSequence(formEntryReturnedData, readOutPointResults);
    paginationUpdater("#result-pagination", formEntryReturnedData.length);
    fillInPointHtmlTable(ONSCREENMATCH.data[0]);
    localPointGeoJSONToMap(ONSCREENMATCH.geojson[0]);
  }

  if (calcGeomType == "Route") {
    paginatedResultsSequence(formEntryReturnedData, readOutRouteResults);
    paginationUpdater("#result-pagination", formEntryReturnedData.length);
    fillInRouteHtmlTable(ONSCREENMATCH.data[0]);
    localRouteGeoJSONToMap(ONSCREENMATCH.geojson[0]);
  }

}


/**
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} formEntryReturnedData 
 */
function resultsExport(calcGeomType) {
  let sessionHistoryArr = SESSIONHISTORYARR;
  let queryObjsArr = sessionHistoryArr.last();
  let formEntryReturnedData = queryObjsArr.map(queryObj => queryObj.data).flat(); // data may have multiple elements

  if (calcGeomType == "Point") { tabularPointsConvertExport(formEntryReturnedData); }
  if (calcGeomType == "Route") { tabularRoutesConvertExport(formEntryReturnedData); }
}
