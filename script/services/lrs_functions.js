async function lrsSingleQuery(calcGeomType, currentLrmNo, inputMethod) {
  let headerRowPresent = 0;
  let constrainToRouteName = (calcGeomType == "Route") ? 1 : 0;
  let rtenmformat = "AAdddd_dash_KG";
  let rte_nm_lrm_indices = [];

  let field_indices = setIndicesByLrmAndGeom(calcGeomType, currentLrmNo);
  rte_nm_lrm_indices = field_indices[1];
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


async function lrsBulkQuery(calcGeomType, currentLrmNo, inputMethod, fileContents, rtenmformat) {
  let headerRowPresent = 1;
  let constrainToRouteName = (calcGeomType == "Route") ? 1 : 0;
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = [];
  let other_indices = [];

  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  let field_indices = await setTableFieldsByMethod(calcGeomType, currentLrmNo, parsedInputCSV);
  lrm_indices0 = field_indices[0][0];
  lrm_indices1 = field_indices[0][1];
  rte_nm_lrm_indices = field_indices[1];
  other_indices = field_indices[2];

  if (typeof rte_nm_lrm_indices !== 'undefined' && rtenmformat == "AAdddd") {
    for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
      parsedInputCSV[rowToQuery][rte_nm_lrm_indices] = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    }
  }

  queryLrsByArray(calcGeomType, currentLrmNo, inputMethod, parsedInputCSV, headerRowPresent, field_indices, constrainToRouteName, rtenmformat);
}


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

  lrm_indices0 = field_indices[0][0];
  lrm_indices1 = field_indices[0][1];
  rte_nm_lrm_indices = field_indices[1];
  let currentFieldOrder = field_indices[2]; // FIXME other_indices is never redefined

  // make array for output
  let lrsQueryObjsArr = [];
  let refinedData = [];

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

    let refinedRowData = [];
    let currentRow = arrayToQuery[rowToQuery];
    let url0 = '';
    let url1 = '';

    // build url
    url0 = buildUrl(currentLrmNo, currentRow, lrm_indices0);
    lrsQueryObj.url[0] = url0;
    if (GLOBALSETTINGS.PrintUrls == 1) { console.log(url0); }
    if (calcGeomType == "Route") {
      url1 = buildUrl(currentLrmNo, currentRow, lrm_indices1);
      lrsQueryObj.url[1] = url1;
      if (GLOBALSETTINGS.PrintUrls == 1) { console.log(url1); }
    }
    // end build url

    // perform query
    let results0 = await queryService(url0);
    lrsQueryObj.results[0] = results0;
    let results1 = '';
    if (calcGeomType == "Route") {
      results1 = await queryService(url1);
      lrsQueryObj.results[1] = results1;
    }
    if (GLOBALSETTINGS.PrintIterations == 1) { console.log("returned " + results0.length + " results for row: " + rowToQuery); }
    // end perform query

    let featureDescription = $("#description").val() || 'feature';
    let featureColor = $("#color").val() || "#14375a";
    let featureWidth = $("#width").val() || "1";

    // get row header data
    let otherAttributesKey = (inputMethod == "table") ? other_indices.map(i => arrayToQuery[0][i]) : ["Feature", "Color", "Width"];
    let otherAttributesValue = (inputMethod == "table") ? other_indices.map(i => currentRow[i]) : [featureDescription, featureColor, featureWidth];
    let otherAttributesObj = {};

    otherAttributesKey.forEach((otherAttributesKey, i) => otherAttributesObj[otherAttributesKey] = otherAttributesValue[i]);

    // return single geom filtered on route name, or return multiple results
    if (constrainToRouteName == 1) {
      // get right route
      if (inputMethod == "html") {
        if (rtenmformat == "AAdddd") {
          user_input_rte_nm = fixThisVerySpecificTextFormat(currentRow[rte_nm_lrm_indices]);
        } else {
          user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? currentRow[rte_nm_lrm_indices] : '';
        }
      } else if (inputMethod == "table") {
        user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? currentRow[rte_nm_lrm_indices] : '';
      }
      let unfilteredArr = (calcGeomType == "Point") ? [results0, results0] : [results0, results1];
      let resultsObj = await matchOutputOnRteNm(calcGeomType, currentLrmNo, inputMethod, unfilteredArr, user_input_rte_nm);
      // end get right route
      // assemble data

      console.log("resultsObj");
      console.log(resultsObj);

      refinedRowData.push({ ...otherAttributesObj, ...resultsObj });
      refinedData.push({ ...otherAttributesObj, ...resultsObj });

    } else {
      // process multiple returns
      for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
        if (GLOBALSETTINGS.PrintIterations == 1) { console.log("processing result: " + (aRowResult + 1) + " of " + (results0.length)); }
        let aRowResultObj = results0[aRowResult];

        refinedRowData.push({ ...otherAttributesObj, ...aRowResultObj });
        refinedData.push({ ...otherAttributesObj, ...aRowResultObj });
      }
    }
    // end return single geom filtered on route name, or return multiple results


    console.log("refinedRowData");
    console.log(refinedRowData);

    lrsQueryObj.data = refinedRowData;

    if (calcGeomType == "Point") {
      try {
        let pointGeoJson = jsonFromLrsApiToPointGeoJson(refinedRowData);
        lrsQueryObj.geojson = pointGeoJson;
      } catch { }
    }

    if (calcGeomType == "Route") {
      try {
        let projObj = objectifyRouteProject(refinedRowData[0]); // this objectifies the drawing data
        let results = await queryRoadwayServiceByLine(projObj);
        let aProjectFeatureCollection = jsonFromAgoApiToRouteGeoJson(results, projObj); // this creates a geoJSON feature collection of routes
        lrsQueryObj.geojson = aProjectFeatureCollection;
      } catch { }
    }

    lrsQueryObjsArr.push(lrsQueryObj);


    updateProgressBar(rowToQuery, (arrayToQuery.length - headerRowPresent));
    console.log("lrsQueryObj");
    console.log(lrsQueryObj);
  }
  // end process rows for loop
  console.log("process rows for loop complete");
  console.log("lrsQueryObjsArr");
  console.log(lrsQueryObjsArr);

  if (GLOBALSETTINGS.PrintIterations == 1) { console.log(refinedData); }

  console.log("refinedData");
  console.log(refinedData);
  resultsShowExport(calcGeomType, refinedData);

  YellowToGreen();
}


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


function buildUrl(currentLrmNo, coordinateArr, lrm_indices) {
  let url = '';

  let index0 = (typeof lrm_indices !== 'undefined') ? lrm_indices[0] : 0;
  let index1 = (typeof lrm_indices !== 'undefined') ? lrm_indices[1] : 1;
  let index2 = (typeof lrm_indices !== 'undefined') ? lrm_indices[2] : 2;

  if (currentLrmNo == 1) {
    lat = coordinateArr[index0];
    lon = coordinateArr[index1];
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


function resultsShowExport(calcGeomType, refinedData) {
  // refinedData is similar to lrsQueryObj.data for all rows in result

  setProjectGeometry(refinedData); // FIXME add results caching // this sets GLOBALPROJECTDATA.ProjectGeometry equal to refinedData

  if (calcGeomType == "Point") {
    // show TABULAR results
    // this sets prev/next event handlers to cycle through refinedData and use readOutPointResults to fill in table and plot on map
    paginatedResultsSequence(refinedData, readOutPointResults);
    // this fill in table using object values from refinedData, and then showThisPointResultOnMap using graphics
    readOutPointResults(refinedData);

    // export data
    tabularPointsConvertExport(refinedData);
  }

  if (calcGeomType == "Route") {
    // show TABULAR results
    // this sets prev/next event handlers to cycle through refinedData and use readOutRouteResults to fill in table and plot on map
    paginatedResultsSequence(refinedData, readOutRouteResults);
    // this fill in table using object values from refinedData, and then showThisRouteResultOnMap using geoJSON
    readOutRouteResults(refinedData);

    // export data
    tabularRoutesConvertExport(refinedData);
  }

}


async function matchOutputOnRteNm(calcGeomType, currentLrmNo, inputMethod, unfilteredArr, rte_nm) {
  if (GLOBALSETTINGS.PrintIterations == 1) { console.log(unfilteredArr); }
  let matchError = 0;
  let results0 = unfilteredArr[0];
  let results1 = unfilteredArr[1];
  let notmatch0 = { ...results0 };
  let notmatch1 = { ...results0, ...results1 };

  // get right route
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
      dropDownPopulator("#candidateRTENMs", candidateRteNms); // need to dynamically create selector
      rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs", "#candidateRTENMs");
      rte_nm = candidateRteNms[rte_nm_Index];
    }

  } else if (currentLrmNo == 3) {
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

  }
  // end get right route

  // match output
  let output0 = {};
  let output1 = {};
  let match = {};

  let index0 = results0.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  matchError = index0; // if index0 is -1 it will set matchError to that value
  output0 = results0[index0];

  // console.log(output0);

  if (calcGeomType == "Route" && matchError >= 0) {
    let index1 = results1.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });

    matchError = index1; // if index1 is -1 it will set matchError to that value
    output1 = results1[index1];
    // console.log(output1);

    if (matchError >= 0) {
      bdfo = output0['RTE_DFO'];
      edfo = output1['RTE_DFO'];

      // check min and max DFOs and transpose if necessary
      let preBEGIN = `BEGIN_`;
      let preEND = `END_`;
      let begin = {};
      let end = {};

      if (bdfo > edfo) {
        begin = Object.keys(output1).reduce((a, c) => (a[`${preBEGIN}${c}`] = output1[c], a), {});
        end = Object.keys(output0).reduce((a, c) => (a[`${preEND}${c}`] = output0[c], a), {});
        //match = (Object.values(output1)).concat(Object.values(output0));
      } else {
        begin = Object.keys(output0).reduce((a, c) => (a[`${preBEGIN}${c}`] = output0[c], a), {});
        end = Object.keys(output1).reduce((a, c) => (a[`${preEND}${c}`] = output1[c], a), {});
        //match = (Object.values(output0)).concat(Object.values(output1));
      }

      match = { ...begin, ...end };
    } else {
      match = notmatch1;
    }

  }

  else if (calcGeomType == "Point" && matchError >= 0) {
    match = { ...output0 };
    // match = (Object.values(output0));
  }

  else {
    match = notmatch0;
  }

  return (match);
}


function noMatchOutputOnRteNm(unfilteredArr) {
  let results0 = unfilteredArr[0];
  let output0 = results0[0];
  console.log(output0);
  let nomatch = { ...output0 };
  return (nomatch);
}
