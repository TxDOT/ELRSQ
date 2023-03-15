/**
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 * 
 * adds values to coordinateArr
 * starts queryLrsByArray
 */
async function lrsSingleQuery(calcGeomType, currentLrmNo, inputMethod) {
  let headerRowPresent = 0;
  let constrainToRouteName = (calcGeomType == "Route") ? 1 : 0;
  let rtenmformat = "AAdddd_dash_KG";
  //let rte_nm_lrm_indices = [];

  let field_indices = setIndicesByLrmAndGeom(calcGeomType, currentLrmNo);
  //rte_nm_lrm_indices = field_indices[1];
  let currentFieldOrder = field_indices[2];

  let coordinateArr = [];

  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
    let coordinateArr0 = [];
    for (let i = 0; i < currentFieldOrder.length; i++) {
      let value = $('#' + currentFieldOrder[i]).val();
      if ((currentLrmNo == 2 || currentLrmNo == 4) && rtenmformat == "AAdddd" && i == 0) {
        value = fixThisVerySpecificTextFormat(value);
      }
      coordinateArr0.push(value);
    }
    coordinateArr.push(coordinateArr0);
  }

  queryLrsByArray(calcGeomType, currentLrmNo, inputMethod, coordinateArr, headerRowPresent, field_indices, constrainToRouteName, rtenmformat);
}


/**
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 * @param {*} fileContents CSV file to be parsed
 * @param {*} rtenmformat an alphanumeric format for the input route name
 * 
 * parses CSV file
 * starts queryLrsByArray
 */
async function lrsBulkQuery(calcGeomType, currentLrmNo, inputMethod, fileContents, rtenmformat) {
  let headerRowPresent = 1;
  //let constrainToRouteName = (calcGeomType == "Route") ? 1 : 0;
  let constrainToRouteName = (calcGeomType == "Route") ? 1 : 1; // changing this so bulk points are constrained as well

  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  let field_indices = await setTableFieldsByMethod(calcGeomType, currentLrmNo, parsedInputCSV);
  //let lrm_indices0 = field_indices[0][0];
  //let lrm_indices1 = field_indices[0][1];
  let rte_nm_lrm_indices = field_indices[1];
  //let other_indices = field_indices[2];

  if (typeof rte_nm_lrm_indices !== 'undefined' && rtenmformat == "AAdddd") {
    for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
      parsedInputCSV[rowToQuery][rte_nm_lrm_indices] = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    }
  }

  queryLrsByArray(calcGeomType, currentLrmNo, inputMethod, parsedInputCSV, headerRowPresent, field_indices, constrainToRouteName, rtenmformat);
}


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
async function queryLrsByArray(calcGeomType, currentLrmNo, inputMethod, arrayToQuery, headerRowPresent, field_indices, constrainToRouteName, rtenmformat) {
  // console.log(constrainToRouteName + ", " + rtenmformat);
  resetGraphics();
  resetCurrentPagination();

  if (GLOBALSETTINGS.UseMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();
  resetProgressAndDownloads(); // this hides and resets the progress bar and download buttons
  $("#bulk-convert-progress-bar").show();

  let lrm_indices0 = field_indices[0][0];
  let lrm_indices1 = field_indices[0][1];
  let rte_nm_lrm_indices = field_indices[1];
  let other_indices = field_indices[2];

  // make array for output
  let lrsQueryObjsArr = [];

  // process rows
  for (let rowToQuery = headerRowPresent; rowToQuery < arrayToQuery.length; rowToQuery++) {
    if (GLOBALSETTINGS.PrintIterations == 1) {
      console.log("processing row " + rowToQuery + " of " + (arrayToQuery.length - headerRowPresent));
    }

    let lrsQueryObj = {};
    lrsQueryObj.url = [];
    lrsQueryObj.results = [];
    lrsQueryObj.data = [];
    lrsQueryObj.geojson = "";

    //let refinedRowData = [];
    let currentRow = arrayToQuery[rowToQuery];
    let unfilteredResultsArr = [];
    let results1 = '';

    // build url & perform query
    let url0 = buildUrl(currentLrmNo, currentRow, lrm_indices0);
    lrsQueryObj.url[0] = url0;
    let results0 = await queryService(url0);
    lrsQueryObj.results[0] = results0;
    if (GLOBALSETTINGS.PrintUrls == 1) { console.log(url0); }

    if (calcGeomType == "Route") {
      let url1 = buildUrl(currentLrmNo, currentRow, lrm_indices1);
      lrsQueryObj.url[1] = url1;
      results1 = await queryService(url1);
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
    let otherAttributesKey = (inputMethod == "table") ? other_indices.map(i => arrayToQuery[0][i]) : ["Feature", "Color", "Width"];
    let otherAttributesValue = (inputMethod == "table") ? other_indices.map(i => currentRow[i]) : [featureDescription, featureColor, featureWidth];
    let otherAttributesObj = {};
    otherAttributesKey.forEach((otherAttributesKey, i) => otherAttributesObj[otherAttributesKey] = otherAttributesValue[i]);

    // return single geom filtered on route name, or return multiple results
    if (constrainToRouteName == 1) {
      // in this case only a single element is pushed to lrsQueryObj.data
      let user_input_rte_nm = getRightRouteName_Pre(inputMethod, rtenmformat, rte_nm_lrm_indices, currentRow);
      let matchObj = await matchOutputOnRteNm(calcGeomType, currentLrmNo, inputMethod, unfilteredResultsArr, user_input_rte_nm);
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

    if (calcGeomType == "Point") {
      try {
        let pointGeoJson = jsonFromLrsApiToPointGeoJson(lrsQueryObj.data);
        lrsQueryObj.geojson = pointGeoJson;

        /**
          let projObj = objectifyPointProject(lrsQueryObj.data[0]); // this objectifies the drawing data
          let aProjectFeatureCollection = jsonFromLrsApiToPointGeoJson_singular_B(projObj);
          lrsQueryObj.geojson = aProjectFeatureCollection;
        */
      } catch { }
    }

    if (calcGeomType == "Route") {
      try {
        let projObj = objectifyRouteProject(lrsQueryObj.data[0]); // this objectifies the drawing data
        let results = await queryRoadwayServiceByLine(projObj);
        console.log(results);
        let aProjectFeatureCollection = jsonFromAgoApiToRouteGeoJson(results, projObj); // this creates a geoJSON feature collection of routes
        lrsQueryObj.geojson = aProjectFeatureCollection;
      } catch { }
    }

    console.log("lrsQueryObj.geojson");
    console.log(lrsQueryObj.geojson);

    lrsQueryObjsArr.push(lrsQueryObj);
    updateProgressBar(rowToQuery, (arrayToQuery.length - headerRowPresent));
  }
  // end process rows for loop
  console.log("process rows for loop complete");

  let flattenedQueryObjData = lrsQueryObjsArr.map(queryObj => queryObj.data).flat(); // data may have multiple elements
  if (GLOBALSETTINGS.PrintIterations == 1) { console.log(flattenedQueryObjData); }

  setProjectGeometry(flattenedQueryObjData); // FIXME add results caching

  if (calcGeomType == "Point") {
    // show TABULAR results
    paginatedResultsSequence(flattenedQueryObjData, readOutPointResults);

    //insertPagination(currentPagination, results);
    paginationUpdater("#result-pagination", flattenedQueryObjData);

    fillInPointHtmlTable(flattenedQueryObjData[0]);

    // export data
    tabularPointsConvertExport(flattenedQueryObjData);
  }

  if (calcGeomType == "Route") {
    // show TABULAR results
    paginatedResultsSequence(flattenedQueryObjData, readOutRouteResults);

    //insertPagination(currentPagination, results);
    paginationUpdater("#result-pagination", flattenedQueryObjData);

    fillInRouteHtmlTable(flattenedQueryObjData[0]);

    // export data
    tabularRoutesConvertExport(flattenedQueryObjData);
  }

  if (calcGeomType == "Point") {
    var geojson = jsonFromLrsApiToPointGeoJson(flattenedQueryObjData); // this creates a geoJSON feature collection of points

    showThisPointResultOnMap(flattenedQueryObjData[0]);  // this plots a point graphic using esri graphics
  }

  if (calcGeomType == "Route") {
    let projObj = objectifyRouteProject(flattenedQueryObjData[0]); // this objectifies the drawing data
    let results = await queryRoadwayServiceByLine(projObj);
    let aProjectFeatureCollection = jsonFromAgoApiToRouteGeoJson(results, projObj); // this creates a geoJSON feature collection of routes

    localRouteGeoJSONToMap([aProjectFeatureCollection]); // this plots a line GeoJSONLayer on the map
  }

  YellowToGreen();
}


/**
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @returns an array with field indices and names
 */
function setIndicesByLrmAndGeom(calcGeomType, currentLrmNo) {
  let field_indices = [];
  let lrm_indices = [];
  let lrm_indices0 = [];
  let lrm_indices1 = [];

  if (calcGeomType == "Point") {

    if (currentLrmNo == 1) {
      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['kbInputLatitude', 'kbInputLongitude'];
    }

    else if (currentLrmNo == 2) {
      lrm_indices = lrm_indices0 = [0, 1, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName', 'kbInputReferenceMarker', 'kbInputDisplacement'];
    }

    else if (currentLrmNo == 3) {
      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['kbInputControlSection', 'kbInputMilepointMeasure'];
    }

    else if (currentLrmNo == 4) {
      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName', 'kbInputDistanceFromOrigin'];
    }
  }

  else if (calcGeomType == "Route") {

    if (currentLrmNo == 1) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      rte_nm_lrm_indices = [4]; // optional
      currentFieldOrder = ['kbInputBeginLatitude', 'kbInputBeginLongitude', 'kbInputEndLatitude', 'kbInputEndLongitude'];
    }

    else if (currentLrmNo == 2) {
      lrm_indices0 = [0, 1, 2];
      lrm_indices1 = [0, 3, 4];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName_2', 'kbInputBeginReferenceMarker', 'kbInputBeginDisplacement', 'kbInputEndReferenceMarker', 'kbInputEndDisplacement'];
    }

    else if (currentLrmNo == 3) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [0, 2];
      rte_nm_lrm_indices = [3]; // optional
      currentFieldOrder = ['kbInputBeginControlSection', 'kbInputBeginMilepointMeasure', 'kbInputEndMilepointMeasure'];
    }

    else if (currentLrmNo == 4) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [0, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName_2', 'kbInputBeginDistanceFromOrigin', 'kbInputEndDistanceFromOrigin'];
    }
  }

  field_indices = [[lrm_indices0, lrm_indices1], rte_nm_lrm_indices, currentFieldOrder];

  return field_indices;
}

// this changes the DOM

/**
 * 
 * uses drop downs to get field names
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} parsedInputCSV 
 * @returns 
 */
async function setTableFieldsByMethod(calcGeomType, currentLrmNo, parsedInputCSV) {
  let field_indices = [];
  // let lrm_indices = [];
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = []; //test
  let candidate_fields = parsedInputCSV[0];
  all_fields = [...Array(candidate_fields.length).keys()];

  if (calcGeomType == "Point") {

    if (currentLrmNo == 1) {
      dropDownPopulator("#lat_field", candidate_fields);
      dropDownPopulator("#lon_field", candidate_fields);
      dropDownPopulator("#point_rte_nm_field", candidate_fields);

      let lat_field = ~~await confirmFieldChoice("#btn-lat_field", "#lat_field");
      let lon_field = ~~await confirmFieldChoice("#btn-lon_field", "#lon_field");
      let rte_nm_option = 0;  //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field") : '';

      lrm_indices = lrm_indices0 = [lat_field, lon_field, rte_nm_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (currentLrmNo == 2) {
      dropDownPopulator("#point_rte_nm_field", candidate_fields);
      dropDownPopulator("#referencemarker_field", candidate_fields);
      dropDownPopulator("#displacement_field", candidate_fields);

      let rte_nm_field = ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field");
      let referencemarker_field = ~~await confirmFieldChoice("#btn-referencemarker_field", "#referencemarker_field");
      let displacement_field = ~~await confirmFieldChoice("#btn-displacement_field", "#displacement_field");

      lrm_indices = lrm_indices0 = [rte_nm_field, referencemarker_field, displacement_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (currentLrmNo == 3) {
      dropDownPopulator("#controlsection_field", candidate_fields);
      dropDownPopulator("#milepoint_field", candidate_fields);
      dropDownPopulator("#point_rte_nm_field", candidate_fields);

      let controlsection_field = ~~await confirmFieldChoice("#btn-controlsection_field", "#controlsection_field");
      let milepoint_field = ~~await confirmFieldChoice("#btn-milepoint_field", "#milepoint_field");
      let rte_nm_option = 0;  //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field") : '';

      lrm_indices = lrm_indices0 = [controlsection_field, milepoint_field, rte_nm_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (currentLrmNo == 4) {
      dropDownPopulator("#point_rte_nm_field", candidate_fields);
      dropDownPopulator("#dfo_field", candidate_fields);

      let rte_nm_field = ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field");
      let dfo_field = ~~await confirmFieldChoice("#btn-dfo_field", "#dfo_field");

      lrm_indices = lrm_indices0 = [rte_nm_field, dfo_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }
  }

  else if (calcGeomType == "Route") {

    if (currentLrmNo == 1) {
      dropDownPopulator("#blat_field", candidate_fields);
      dropDownPopulator("#blon_field", candidate_fields);
      dropDownPopulator("#elat_field", candidate_fields);
      dropDownPopulator("#elon_field", candidate_fields);
      dropDownPopulator("#rte_nm_field", candidate_fields);

      let blat_field = ~~await confirmFieldChoice("#btn-blat_field", "#blat_field");
      let blon_field = ~~await confirmFieldChoice("#btn-blon_field", "#blon_field");
      let elat_field = ~~await confirmFieldChoice("#btn-elat_field", "#elat_field");
      let elon_field = ~~await confirmFieldChoice("#btn-elon_field", "#elon_field");
      let rte_nm_option = 0;  //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field") : '';

      lrm_indices = [blat_field, blon_field, elat_field, elon_field, rte_nm_field];
      lrm_indices0 = [blat_field, blon_field];
      lrm_indices1 = [elat_field, elon_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (currentLrmNo == 2) {
      dropDownPopulator("#route_rte_nm_field", candidate_fields);
      dropDownPopulator("#breferencemarker_field", candidate_fields);
      dropDownPopulator("#bdisplacement_field", candidate_fields);
      dropDownPopulator("#ereferencemarker_field", candidate_fields);
      dropDownPopulator("#edisplacement_field", candidate_fields);

      let rte_nm_field = ~~await confirmFieldChoice("#btn-route_rte_nm_field", "#route_rte_nm_field");
      let breferencemarker_field = ~~await confirmFieldChoice("#btn-breferencemarker_field", "#breferencemarker_field");
      let bdisplacement_field = ~~await confirmFieldChoice("#btn-bdisplacement_field", "#bdisplacement_field");
      let ereferencemarker_field = ~~await confirmFieldChoice("#btn-ereferencemarker_field", "#ereferencemarker_field");
      let edisplacement_field = ~~await confirmFieldChoice("#btn-edisplacement_field", "#edisplacement_field");

      lrm_indices = [rte_nm_field, breferencemarker_field, bdisplacement_field, ereferencemarker_field, edisplacement_field];
      lrm_indices0 = [rte_nm_field, breferencemarker_field, bdisplacement_field];
      lrm_indices1 = [rte_nm_field, ereferencemarker_field, edisplacement_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (currentLrmNo == 3) {
      dropDownPopulator("#bcontrolsection_field", candidate_fields);
      dropDownPopulator("#bmilepoint_field", candidate_fields);
      dropDownPopulator("#emilepoint_field", candidate_fields);
      dropDownPopulator("#rte_nm_field", candidate_fields);

      let bcontrolsection_field = ~~await confirmFieldChoice("#btn-bcontrolsection_field", "#bcontrolsection_field");
      let bmilepoint_field = ~~await confirmFieldChoice("#btn-bmilepoint_field", "#bmilepoint_field");
      let emilepoint_field = ~~await confirmFieldChoice("#btn-emilepoint_field", "#emilepoint_field");
      let rte_nm_option = 0;  //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field") : '';

      lrm_indices = [bcontrolsection_field, bmilepoint_field, emilepoint_field, rte_nm_field];
      lrm_indices0 = [bcontrolsection_field, bmilepoint_field];
      lrm_indices1 = [bcontrolsection_field, emilepoint_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (currentLrmNo == 4) {
      dropDownPopulator("#route_rte_nm_field", candidate_fields);
      dropDownPopulator("#bdfo_field", candidate_fields);
      dropDownPopulator("#edfo_field", candidate_fields);

      let rte_nm_field = ~~await confirmFieldChoice("#btn-route_rte_nm_field", "#route_rte_nm_field");
      let bdfo_field = ~~await confirmFieldChoice("#btn-bdfo_field", "#bdfo_field");
      let edfo_field = ~~await confirmFieldChoice("#btn-edfo_field", "#edfo_field");

      lrm_indices = [rte_nm_field, bdfo_field, edfo_field];
      lrm_indices0 = [rte_nm_field, bdfo_field];
      lrm_indices1 = [rte_nm_field, edfo_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }
  }

  // other_indices = all_fields.filter(x => !lrm_indices.includes(x));
  other_indices = all_fields; // returning all input fields
  field_indices = [[lrm_indices0, lrm_indices1], rte_nm_lrm_indices, other_indices];

  return field_indices;
}


/**
 * 
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} coordinateArr 
 * @param {*} lrm_indices 
 * @returns a url for the LRS query
 */
function buildUrl(currentLrmNo, coordinateArr, lrm_indices) {
  let url = '';

  let index0 = (typeof lrm_indices !== 'undefined') ? lrm_indices[0] : 0;
  let index1 = (typeof lrm_indices !== 'undefined') ? lrm_indices[1] : 1;
  let index2 = (typeof lrm_indices !== 'undefined') ? lrm_indices[2] : 2;

  if (currentLrmNo == 1) {
    //console.log(measureRanges.latitude.min);
    lat = coordinateArr[index0] || -90;
    lon = coordinateArr[index1] || 0;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (currentLrmNo == 2) {
    routeName = coordinateArr[index0];
    refMarker = coordinateArr[index1];
    displacement = coordinateArr[index2];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (currentLrmNo == 3) {
    controlSecNum = coordinateArr[index0];
    milePointMeasure = coordinateArr[index1];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (currentLrmNo == 4) {
    routeName = coordinateArr[index0];
    dfo = coordinateArr[index1];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}


/**
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} refinedData 
 */
async function resultsShowExport(calcGeomType, refinedData) {
  // refinedData is similar to lrsQueryObj.data for all rows in result

  setProjectGeometry(refinedData); // FIXME add results caching

  if (calcGeomType == "Point") {
    // show TABULAR results
    // this sets prev/next event handlers to cycle through refinedData and use readOutPointResults to fill in table and plot on map
    paginatedResultsSequence(refinedData, readOutPointResults);
    // this fill in table using object values from refinedData, and then showThisPointResultOnMap using graphics
    paginationUpdater("#result-pagination", refinedData);
    fillInPointHtmlTable(refinedData[0]);

    var geojson = jsonFromLrsApiToPointGeoJson(refinedData); // this creates a geoJSON feature collection of points
    showThisPointResultOnMap(refinedData[0]);  // this plots a point graphic using esri graphics

    // export data
    tabularPointsConvertExport(refinedData);
  }

  if (calcGeomType == "Route") {
    // show TABULAR results
    // this sets prev/next event handlers to cycle through refinedData and use readOutRouteResults to fill in table and plot on map
    paginatedResultsSequence(refinedData, readOutRouteResults);
    // this fill in table using object values from refinedData, and then showThisRouteResultOnMap using geoJSON
    paginationUpdater("#result-pagination", refinedData);
    fillInRouteHtmlTable(refinedData[0]);

    let projObj = objectifyRouteProject(refinedData[0]); // this objectifies the drawing data
    let results = await queryRoadwayServiceByLine(projObj);
    let aProjectFeatureCollection = jsonFromAgoApiToRouteGeoJson(results, projObj); // this creates a geoJSON feature collection of routes

    localRouteGeoJSONToMap([aProjectFeatureCollection]); // this plots a line GeoJSONLayer on the map

    // export data
    tabularRoutesConvertExport(refinedData);
  }

}

/**
 * 
 * @param {*} calcGeomType is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 * @param {*} unfilteredArr is an array with two elements, each of which is an array
 * @param {*} rte_nm is a user-provided Route Name
 * @returns an object with values for each LRM conversion data point
 *  if there is no data, each data point should be null
 */
async function matchOutputOnRteNm(calcGeomType, currentLrmNo, inputMethod, unfilteredArr, rte_nm) {
  if (GLOBALSETTINGS.PrintIterations == 1) { console.log(unfilteredArr); }
  let matchError = 0;
  let preBEGIN = `BEGIN_`;
  let preEND = `END_`;

  let results0 = unfilteredArr[0];
  let results1 = unfilteredArr[1];

  let notmatch0 = lrsDummy;
  let notmatchbegin = Object.keys(lrsDummy).reduce((a, c) => (a[`${preBEGIN}${c}`] = lrsDummy[c], a), {});
  Object.keys(notmatchbegin).forEach((i) => notmatchbegin[i] = null);
  let notmatchend = Object.keys(lrsDummy).reduce((a, c) => (a[`${preEND}${c}`] = lrsDummy[c], a), {});
  Object.keys(notmatchend).forEach((i) => notmatchend[i] = null);


  let notmatch1 = { ...notmatchbegin, ...notmatchend }; //test //FIXME this needs the correct field names

  // get right rte_nm
  if (currentLrmNo == 1 || currentLrmNo == 3) {
    rte_nm = await getRightRteNm(calcGeomType, currentLrmNo, inputMethod, unfilteredArr);
  }


  // match output
  let output0 = {};
  let output1 = {};
  let match = {};

  let index0 = results0.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  output0 = results0[index0];

  if (calcGeomType == "Point") {
    matchError = index0; // if index0 is -1 it will set matchError to that value

    if (matchError >= 0) {
      match = { ...output0 };
    }

    else {
      match = notmatch0;
    }
  }


  if (calcGeomType == "Route") {
    matchError = index0; // if index0 is -1 it will set matchError to that value

    if (matchError >= 0) {

      let index1 = results1.findIndex(function (item, i) {
        return item.RTE_DEFN_LN_NM === rte_nm;
      });

      matchError = index1; // if index1 is -1 it will set matchError to that value
      output1 = results1[index1];

      if (matchError >= 0) {
        bdfo = output0['RTE_DFO'];
        edfo = output1['RTE_DFO'];

        // check min and max DFOs and transpose if necessary

        let begin = {};
        let end = {};

        if (bdfo > edfo) {
          begin = Object.keys(output1).reduce((a, c) => (a[`${preBEGIN}${c}`] = output1[c], a), {});
          end = Object.keys(output0).reduce((a, c) => (a[`${preEND}${c}`] = output0[c], a), {});
        } else {
          begin = Object.keys(output0).reduce((a, c) => (a[`${preBEGIN}${c}`] = output0[c], a), {});
          end = Object.keys(output1).reduce((a, c) => (a[`${preEND}${c}`] = output1[c], a), {});
        }

        match = { ...begin, ...end };
      }

      else {
        match = notmatch1;
      }
    }

    else {
      match = notmatch1;
    }

  }

  return (match);
}


/**
 * 
 * @param {*} unfilteredArr 
 * @returns 
 */
function noMatchOutputOnRteNm(unfilteredArr) {
  let results0 = unfilteredArr[0];
  let output0 = results0[0];
  console.log(output0);
  let nomatch = { ...output0 };
  return (nomatch);
}


/**
 * 
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 * @param {*} unfilteredArr an array containing results from 1 or 2 queries
 * @returns a route name
 */
async function getRightRteNm(calcGeomType, currentLrmNo, inputMethod, unfilteredArr) {
  let results0 = unfilteredArr[0];
  let results1 = unfilteredArr[1];

  if (currentLrmNo == 1) {
    let candidateRteNms = '';
    let RTENMs0 = [];
    let RTENMs1 = [];

    if (inputMethod == "html") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }

      // this only presents the selector if multiple candidate matches occur
      if (candidateRteNms.length > 1) {
        $("#kbRouteInputRouteName_optional").show();
        dropDownPopulator("#candidateRTENMs", candidateRteNms); // need to dynamically create selector
        rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs", "#candidateRTENMs");
        rte_nm = candidateRteNms[rte_nm_Index];
      } else {
        rte_nm = candidateRteNms[0];
      }

    }

    if (inputMethod == "table") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }
      rte_nm = candidateRteNms[0]; // this is picking the first available candidate route name
    }

  }

  if (currentLrmNo == 3) {
    let candidateRteNms = '';
    let RTENMs0 = [];
    let RTENMs1 = [];

    if (inputMethod == "html") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }
      rte_nm = candidateRteNms[0]; // this is picking the first available candidate route name
    }

    if (inputMethod == "table") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }
      rte_nm = candidateRteNms[0]; // this is picking the first available candidate route name
    }

  }

  return rte_nm;
}


function getRightRouteName_Pre(inputMethod, rtenmformat, rte_nm_lrm_indices, currentRow) {
  if (inputMethod == "html") {
    if (rtenmformat == "AAdddd") {
      user_input_rte_nm = fixThisVerySpecificTextFormat(currentRow[rte_nm_lrm_indices]);
    } else {
      user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? currentRow[rte_nm_lrm_indices] : '';
    }
  } else if (inputMethod == "table") {
    user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? currentRow[rte_nm_lrm_indices] : '';
  }

  return user_input_rte_nm;
}