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
    clearResultsFromMap(); //this only removes graphics
  }

  GreenToYellow();
  resetProgressAndDownloads();
  $("#bulk-convert-progress-bar").show();

  let lrm_indices0 = field_indicesObj.lrm_indices0;
  let lrm_indices1 = field_indicesObj.lrm_indices1;
  let rte_nm_lrm_indices = field_indicesObj.rte_nm_lrm_indices;
  let other_indices = field_indicesObj.other_indices;

  // make array for output
  let lrsQueryObjsArr = [];

  // process rows
  for (let rowToQuery = formEntryParams.headerRowPresent; rowToQuery < arrayToQuery.length; rowToQuery++) {
    if (GLOBALSETTINGS.PrintIterations == 1) {
      console.log("processing row " + rowToQuery + " of " + (arrayToQuery.length - formEntryParams.headerRowPresent));
    }

    let lrsQueryObj = {};
    lrsQueryObj.url = [];
    lrsQueryObj.results = [];
    lrsQueryObj.data = [];
    lrsQueryObj.geojson = []; // this is now an array to account for multiple returns

    let currentRow = arrayToQuery[rowToQuery];
    let unfilteredResultsArr = [];

    // build url & perform query
    let url0 = buildUrl(convertSessionParams.currentLrmNo, currentRow, lrm_indices0);
    lrsQueryObj.url[0] = url0;
    let results0 = await queryService(url0);
    lrsQueryObj.results[0] = results0;
    if (GLOBALSETTINGS.PrintUrls == 1) { console.log(url0); }

    if (convertSessionParams.calcGeomType == "Route") {
      let url1 = buildUrl(convertSessionParams.currentLrmNo, currentRow, lrm_indices1);
      lrsQueryObj.url[1] = url1;
      let results1 = await queryService(url1);
      lrsQueryObj.results[1] = results1;
      unfilteredResultsArr = [results0, results1];
      if (GLOBALSETTINGS.PrintUrls == 1) { console.log(url1); }
    } else {
      unfilteredResultsArr = [results0, results0];
    }

    if (GLOBALSETTINGS.PrintIterations == 1) { console.log("returned " + results0.length + " results for row: " + rowToQuery); }
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
      let matchObj = await matchOutputOnRteNm(convertSessionParams, unfilteredResultsArr, user_input_rte_nm);
      lrsQueryObj.data.push({ ...otherAttributesObj, ...matchObj }); // this makes an object from the attribute values and lrs values and pushes it to an array

    } else {
      // in this case multiple elements are pushed to lrsQueryObj.data
      // process multiple returns
      for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
        if (GLOBALSETTINGS.PrintIterations == 1) { console.log("processing result: " + (aRowResult + 1) + " of " + (results0.length)); }
        lrsQueryObj.data.push({ ...otherAttributesObj, ...results0[aRowResult] });
      }
    }
    // end return single geom filtered on route name, or return multiple results

    if (convertSessionParams.calcGeomType == "Point") {
      try {
        let projObj = objectifyPointProject(lrsQueryObj.data[0]); // TODO this may need to have a loop somewhere
        let aProjectFeatureArr = jsonFromLrsApiToPointGeoJson(projObj);
        lrsQueryObj.geojson = aProjectFeatureArr;
      } catch { }
    }

    if (convertSessionParams.calcGeomType == "Route") {
      try {
        let projObj = objectifyRouteProject(lrsQueryObj.data[0]);
        let results = await queryRoadwayServiceByLine(projObj);
        let aProjectFeatureArr = jsonFromAgoApiToRouteGeoJson(results, projObj);
        lrsQueryObj.geojson = aProjectFeatureArr; // this is an array with one or many features
      } catch { }
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
  ONSCREENMATCH = SESSIONHISTORYARR.last()[0];

  setProjectGeometry(formEntryReturnedData); // FIXME add results caching
  // WATCH sets GLOBAL-PROJECT-DATA.ProjectGeometry equal to flattenedQueryObjData

  if (calcGeomType == "Point") {
    paginatedResultsSequence(formEntryReturnedData, readOutPointResults);
    paginationUpdater("#result-pagination", formEntryReturnedData.length);
    fillInPointHtmlTable(ONSCREENMATCH.data[0]);
    localPointGeoJSONToMap(ONSCREENMATCH.geojson);
  }

  if (calcGeomType == "Route") {
    paginatedResultsSequence(formEntryReturnedData, readOutRouteResults);
    paginationUpdater("#result-pagination", formEntryReturnedData.length);
    fillInRouteHtmlTable(ONSCREENMATCH.data[0]);
    localRouteGeoJSONToMap(ONSCREENMATCH.geojson);
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
