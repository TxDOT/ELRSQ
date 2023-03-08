async function lrsSingleQuery(CURRENTLRMNO, inputMethod) {
  let headerRowPresent = 0;
  let constrainToRouteName = (CALCGEOMTYPE == "Route") ? 1 : 0;
  let rtenmformat = "AAdddd_dash_KG";
  let rte_nm_lrm_indices = [];

  let field_indices = setIndicesByLrmAndGeom(CURRENTLRMNO);
  rte_nm_lrm_indices = field_indices[1];
  let currentFieldOrder = field_indices[2];

  let coordinateArr = [];

  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
    let coordinateArr0 = [];
    for (let i = 0; i < currentFieldOrder.length; i++) {
      let value = $('#' + currentFieldOrder[i]).val();
      if ((CURRENTLRMNO == 2 || CURRENTLRMNO == 4) && rtenmformat == "AAdddd" && i == 0) {
        value = fixThisVerySpecificTextFormat(value);
      }
      coordinateArr0.push(value);
    }
    coordinateArr.push(coordinateArr0);
  }

  queryLrsByArray(inputMethod, coordinateArr, headerRowPresent, field_indices, constrainToRouteName, rtenmformat);
}


async function lrsBulkQuery(CURRENTLRMNO, fileContents, rtenmformat) {
  let headerRowPresent = 1;
  let constrainToRouteName = (CALCGEOMTYPE == "Route") ? 1 : 0;
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = [];
  let other_indices = [];

  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  let field_indices = await setTableFieldsByMethod(CURRENTLRMNO, parsedInputCSV);
  //console.log(field_indices);
  lrm_indices0 = field_indices[0][0];
  lrm_indices1 = field_indices[0][1];
  rte_nm_lrm_indices = field_indices[1];
  other_indices = field_indices[2];

  if (typeof rte_nm_lrm_indices !== 'undefined' && rtenmformat == "AAdddd") { //FIXME is this supposed to be and or or???
    for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
      parsedInputCSV[rowToQuery][rte_nm_lrm_indices] = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    }
  }

  queryLrsByArray(inputMethod, parsedInputCSV, headerRowPresent, field_indices, constrainToRouteName, rtenmformat);
}


async function queryLrsByArray(inputMethod, arrayToQuery, headerRowPresent, field_indices, constrainToRouteName, rtenmformat) {
  console.log(constrainToRouteName + ", " + rtenmformat);
  resetGraphics();
  resetCurrentPagination();

  if (USEMAP == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();
  $("#bulk-convert-progress-bar").show();

  lrm_indices0 = field_indices[0][0];
  lrm_indices1 = field_indices[0][1];
  rte_nm_lrm_indices = field_indices[1];
  let currentFieldOrder = field_indices[2];

  // make array for output
  let refinedData = [];

  // process rows
  for (let rowToQuery = headerRowPresent; rowToQuery < arrayToQuery.length; rowToQuery++) {
    console.log("processing row " + rowToQuery + " of " + (arrayToQuery.length - headerRowPresent));
    let currentRow = arrayToQuery[rowToQuery];
    let url0 = '';
    let url1 = '';

    // build url
    if (inputMethod == "html") {
      url0 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices0);
      console.log(url0);
      if (CALCGEOMTYPE == "Route") { url1 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices1); console.log(url1); }
    } else if (inputMethod == "table") {
      url0 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices0);
      console.log(url0);
      if (CALCGEOMTYPE == "Route") { url1 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices1); console.log(url1); }
    }
    // end build url

    // perform query
    let results0 = await queryService(url0);
    let results1 = '';
    if (CALCGEOMTYPE == "Route") { results1 = await queryService(url1); }
    console.log("returned " + results0.length + " results for row: " + rowToQuery);
    // end perform query

    // get row header data
    let otherAttributesKey = (inputMethod == "table") ? other_indices.map(i => arrayToQuery[0][i]) : ["Feature"];
    let otherAttributesValue = (inputMethod == "table") ? other_indices.map(i => currentRow[i]) : ['feature'];
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
      let unfilteredArr = (CALCGEOMTYPE == "Point") ? [results0, results0] : [results0, results1];
      let resultsObj = await matchOutputOnRteNm(inputMethod, CURRENTLRMNO, unfilteredArr, user_input_rte_nm);
      // end get right route
      // assemble data

      /**
        let fullRowData = resultsObj;
        if (typeof otherAttributesObj !== 'undefined' && otherAttributesObj !== '') {
          fullRowData = { ...otherAttributesObj, ...fullRowData };
        }
      */
      let fullRowData = { ...otherAttributesObj, ...resultsObj };
      refinedData.push(fullRowData);

    } else {
      // process multiple returns
      for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
        console.log("processing result: " + (aRowResult + 1) + " of " + (results0.length));
        let aRowResultObj = results0[aRowResult];

        // Object.assign(aRowResultObj, { Feature: rowhead }); 
        // refinedData.push(aRowResultObj);
        refinedData.push({ ...otherAttributesObj, ...aRowResultObj });
      }
    }
    // end return single geom filtered on route name, or return multiple results

    updateProgressBar(rowToQuery, (arrayToQuery.length - headerRowPresent));

  }
  // end process rows

  console.log(refinedData);

  resultsShowExport(refinedData, inputMethod);

  YellowToGreen();
}


function setIndicesByLrmAndGeom(CURRENTLRMNO) {
  let field_indices = [];
  let lrm_indices = [];
  let lrm_indices0 = [];
  let lrm_indices1 = [];

  if (CALCGEOMTYPE == "Point") {

    if (CURRENTLRMNO == 1) {

      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['kbInputLatitude', 'kbInputLongitude'];
    }

    else if (CURRENTLRMNO == 2) {

      lrm_indices = lrm_indices0 = [0, 1, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName', 'kbInputReferenceMarker', 'kbInputDisplacement'];
    }

    else if (CURRENTLRMNO == 3) {

      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['kbInputControlSection', 'kbInputMilepointMeasure'];
    }

    else if (CURRENTLRMNO == 4) {

      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName', 'kbInputDistanceFromOrigin'];
    }
  }

  else if (CALCGEOMTYPE == "Route") {

    if (CURRENTLRMNO == 1) {

      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      rte_nm_lrm_indices = [4]; // optional
      currentFieldOrder = ['kbInputBeginLatitude', 'kbInputBeginLongitude', 'kbInputEndLatitude', 'kbInputEndLongitude'];
    }

    else if (CURRENTLRMNO == 2) {

      lrm_indices0 = [0, 1, 2];
      lrm_indices1 = [0, 3, 4];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName_2', 'kbInputBeginReferenceMarker', 'kbInputBeginDisplacement', 'kbInputEndReferenceMarker', 'kbInputEndDisplacement'];
    }

    else if (CURRENTLRMNO == 3) {

      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      rte_nm_lrm_indices = [4]; // optional
      currentFieldOrder = ['kbInputBeginControlSection', 'kbInputBeginMilepointMeasure', 'kbInputEndControlSection', 'kbInputEndMilepointMeasure'];
    }

    else if (CURRENTLRMNO == 4) {

      lrm_indices0 = [0, 1];
      lrm_indices1 = [0, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName_2', 'kbInputBeginDistanceFromOrigin', 'kbInputEndDistanceFromOrigin'];
    }
  }


  field_indices = [[lrm_indices0, lrm_indices1], rte_nm_lrm_indices, currentFieldOrder];

  return field_indices;
}


async function setTableFieldsByMethod(CURRENTLRMNO, parsedInputCSV) {
  let field_indices = [];
  // let lrm_indices = [];
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = []; //test
  let candidate_fields = parsedInputCSV[0];
  all_fields = [...Array(candidate_fields.length).keys()];

  if (CALCGEOMTYPE == "Point") {

    if (CURRENTLRMNO == 1) {
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

    else if (CURRENTLRMNO == 2) {
      dropDownPopulator("#point_rte_nm_field", candidate_fields);
      dropDownPopulator("#referencemarker_field", candidate_fields);
      dropDownPopulator("#displacement_field", candidate_fields);

      let rte_nm_field = ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field");
      let referencemarker_field = ~~await confirmFieldChoice("#btn-referencemarker_field", "#referencemarker_field");
      let displacement_field = ~~await confirmFieldChoice("#btn-displacement_field", "#displacement_field");

      lrm_indices = lrm_indices0 = [rte_nm_field, referencemarker_field, displacement_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (CURRENTLRMNO == 3) {
      dropDownPopulator("#controlsection_field", candidate_fields);
      dropDownPopulator("#milepointmarker_field", candidate_fields);
      dropDownPopulator("#point_rte_nm_field", candidate_fields);

      let controlsection_field = ~~await confirmFieldChoice("#btn-controlsection_field", "#controlsection_field");
      let milepointmarker_field = ~~await confirmFieldChoice("#btn-milepointmarker_field", "#milepointmarker_field");
      let rte_nm_option = 0;  //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field") : '';

      lrm_indices = lrm_indices0 = [controlsection_field, milepointmarker_field, rte_nm_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (CURRENTLRMNO == 4) {
      dropDownPopulator("#point_rte_nm_field", candidate_fields);
      dropDownPopulator("#dfo_field", candidate_fields);

      let rte_nm_field = ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field");
      let dfo_field = ~~await confirmFieldChoice("#btn-dfo_field", "#dfo_field");

      lrm_indices = lrm_indices0 = [rte_nm_field, dfo_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }
  }

  else if (CALCGEOMTYPE == "Route") {

    if (CURRENTLRMNO == 1) {
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

    else if (CURRENTLRMNO == 2) {
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

    else if (CURRENTLRMNO == 3) {
      dropDownPopulator("#bcontrolsection_field", candidate_fields);
      dropDownPopulator("#bmilepointmarker_field", candidate_fields);
      dropDownPopulator("#econtrolsection_field", candidate_fields);
      dropDownPopulator("#emilepointmarker_field", candidate_fields);
      dropDownPopulator("#rte_nm_field", candidate_fields);

      let bcontrolsection_field = ~~await confirmFieldChoice("#btn-bcontrolsection_field", "#bcontrolsection_field");
      let bmilepointmarker_field = ~~await confirmFieldChoice("#btn-bmilepointmarker_field", "#bmilepointmarker_field");
      let econtrolsection_field = ~~await confirmFieldChoice("#btn-econtrolsection_field", "#econtrolsection_field");
      let emilepointmarker_field = ~~await confirmFieldChoice("#btn-emilepointmarker_field", "#emilepointmarker_field");
      let rte_nm_option = 0;  //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field") : '';

      lrm_indices = [bcontrolsection_field, bmilepointmarker_field, econtrolsection_field, emilepointmarker_field, rte_nm_field];
      lrm_indices0 = [bcontrolsection_field, bmilepointmarker_field];
      lrm_indices1 = [econtrolsection_field, emilepointmarker_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (CURRENTLRMNO == 4) {
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

  other_indices = all_fields.filter(x => !lrm_indices.includes(x));

  field_indices = [[lrm_indices0, lrm_indices1], rte_nm_lrm_indices, other_indices];

  return field_indices;
}


function buildUrl(CURRENTLRMNO, coordinateArr, lrm_indices) {
  let url = '';

  let index0 = (typeof lrm_indices !== 'undefined') ? lrm_indices[0] : 0;
  let index1 = (typeof lrm_indices !== 'undefined') ? lrm_indices[1] : 1;
  let index2 = (typeof lrm_indices !== 'undefined') ? lrm_indices[2] : 2;

  if (CURRENTLRMNO == 1) {
    lat = coordinateArr[index0];
    lon = coordinateArr[index1];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (CURRENTLRMNO == 2) {
    routeName = coordinateArr[index0];
    refMarker = coordinateArr[index1];
    displacement = coordinateArr[index2];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (CURRENTLRMNO == 3) {
    controlSecNum = coordinateArr[index0];
    milePointMeasure = coordinateArr[index1];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (CURRENTLRMNO == 4) {
    routeName = coordinateArr[index0];
    dfo = coordinateArr[index1];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}


function resultsShowExport(refinedData, inputMethod) {
  console.log(resultsShowExport);
  setProjectGeometry(refinedData);
  console.log(refinedData);

  // show TABULAR results
  if (inputMethod == "html") {
    paginatedResultsSequence(refinedData);

    if (CALCGEOMTYPE == "Point") {
      readOutPointResults(refinedData);
    } else if (CALCGEOMTYPE == "Route") {
      //showRouteResults(refinedData);
      readOutRouteResults(refinedData);
    }

  }

  else if (inputMethod == "table") {
    paginatedResultsSequence(refinedData);

    if (CALCGEOMTYPE == "Point") {
      readOutPointResults(refinedData);
      //showBulkPointResults(refinedData);
    } else if (CALCGEOMTYPE == "Route") {
      //showBulkRouteResults(refinedData);
      readOutRouteResults(refinedData);
    }

  }


  // export data
  if (CALCGEOMTYPE == "Point") {
    tabularPointsConvertExport(refinedData);
  } else if (CALCGEOMTYPE == "Route") {
    tabularRoutesConvertExport(refinedData);
  }


  //FIXME turning off plotting by default
  /**
    // plot to map
    if (USEMAP == 1) {
      // showPointResultsOnMap(refinedData); //turning off showing all points
  
      if (CALCGEOMTYPE == "Point") {
        // showPointResultsOnMap(refinedData); //turning off showing all points
  
      } else if (CALCGEOMTYPE == "Route") {
        //showLineResultsOnMap(refinedData);
      }
    }
  */


}


async function matchOutputOnRteNm(inputMethod, method, unfilteredArr, rte_nm) {
  console.log(unfilteredArr);
  let results0 = unfilteredArr[0];
  let results1 = unfilteredArr[1];

  // get right route
  if (method == 1 || method == 3) {
    let candidateRteNms = '';
    let RTENMs0 = [];
    let RTENMs1 = [];

    if (inputMethod == "html") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (CALCGEOMTYPE == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }
      dropDownPopulator("#candidateRTENMs", candidateRteNms); // need to dynamically create selector
      rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs", "#candidateRTENMs");
      rte_nm = candidateRteNms[rte_nm_Index];
    }

  }
  // end get right route

  // match output
  let output0 = {};
  let output1 = {};
  //let match = [];
  let match = {};

  let index0 = results0.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  output0 = results0[index0];
  console.log(output0);

  if (CALCGEOMTYPE == "Route") {
    let index1 = results1.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });

    output1 = results1[index1];
    console.log(output1);
    bdfo = output0['RTE_DFO'];
    edfo = output1['RTE_DFO'];

    /**
      RteDfoArr = [];
      RteDfoArr.push(rte_nm);
      RteDfoArr.push(Math.min(bdfo, edfo));
      RteDfoArr.push(Math.max(bdfo, edfo));
      console.log(RteDfoArr);
    */

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
  }

  else {
    match = { ...output0 };
    // match = (Object.values(output0));
  }

  return (match);
}


function noMatchOutputOnRteNm(unfilteredArr) {
  let results0 = unfilteredArr[0];
  let output0 = results0[0];
  console.log(output0);
  //let nomatch = (Object.values(output0));
  let nomatch = { ...output0 };
  return (nomatch);
}
