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
async function _queryLrsByArray(convertSessionParams, formEntryParams, arrayToQuery, field_indicesObj) {
  resetGraphics();
  resetCurrentPagination();

  if (GLOBALSETTINGS.UseMap == 1) {
    clearGraphicsFromMap(); //this only removes graphics
  }

  resetProgressAndDownloads();
  $("#convert-progress-bar").show();
  console.log("#convert-progress-bar");
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
    lrsQueryObj.results = [];
    lrsQueryObj.data = [];
    lrsQueryObj.geojson = "";

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

      lrsQueryObj.data.push({ ...otherAttributesObj, ...matchObj.match }); // this makes an object from the attribute values and lrs values and pushes it to an array

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
        let pointGeoJson = jsonFromLrsApiToPointGeoJson(lrsQueryObj.data);
        lrsQueryObj.geojson = pointGeoJson;
      } catch { }
    }

    if (convertSessionParams.calcGeomType == "Route") {
      try {
        let projObj = objectifyRouteProject(lrsQueryObj.data[0]); // this objectifies the drawing data
        let results = await queryRoadwayServiceByLine(projObj);
        let aProjectFeatureCollection = jsonFromAgoApiToRouteGeoJson(results, projObj); // this creates a geoJSON feature collection of routes
        lrsQueryObj.geojson = aProjectFeatureCollection;
      } catch { }
    }

    lrsQueryObjsArr.push(lrsQueryObj);
    updateProgressBar(rowToQuery, (arrayToQuery.length - formEntryParams.headerRowPresent));
  }
  // end process rows for loop
  console.log("process rows for loop complete");

  let flattenedQueryObjData = lrsQueryObjsArr.map(queryObj => queryObj.data).flat(); // data may have multiple elements

  console.log(lrsQueryObjsArr);

  if (GLOBALSETTINGS.PrintIterations == 1) { console.log(flattenedQueryObjData); }

  resultsExport(convertSessionParams.calcGeomType, flattenedQueryObjData);
  console.log("hello");
  await resultsShow(convertSessionParams.calcGeomType, convertSessionParams.inputMethod, flattenedQueryObjData);
}


/**
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} formEntryReturnedData 
 */
async function _resultsShow(calcGeomType, inputMethod, formEntryReturnedData) {
  let confirmed = 0;


  if (inputMethod == "table") {
    console.log("confirmResultsShow");
    confirmed = ~~await confirmResultsShow("#view-results");
    console.log(confirmed);
  } else {
    confirmed = 1;
  }

  if (confirmed == 1) {
    setProjectGeometry(formEntryReturnedData); // FIXME add results caching

    if (calcGeomType == "Point") {
      // show TABULAR results
      // this sets prev/next event handlers to cycle through formEntryReturnedData and use readOutPointResults to fill in table and plot on map
      paginatedResultsSequence(formEntryReturnedData, readOutPointResults);
      // this fill in table using object values from formEntryReturnedData, and then showThisPointResultOnMap using graphics
      readOutPointResults(formEntryReturnedData);
    }

    if (calcGeomType == "Route") {
      // show TABULAR results
      // this sets prev/next event handlers to cycle through formEntryReturnedData and use readOutRouteResults to fill in table and plot on map
      paginatedResultsSequence(formEntryReturnedData, readOutRouteResults);
      // this fill in table using object values from formEntryReturnedData, and then showThisRouteResultOnMap using geoJSON
      readOutRouteResults(formEntryReturnedData);
    }
  }

}


/**
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} formEntryReturnedData 
 */
function _resultsExport(calcGeomType, formEntryReturnedData) {

  if (calcGeomType == "Point") { tabularPointsConvertExport(formEntryReturnedData); }
  if (calcGeomType == "Route") { tabularRoutesConvertExport(formEntryReturnedData); }
}
