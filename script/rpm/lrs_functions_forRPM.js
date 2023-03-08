async function lrsSingleRouteQuery_RPM(CURRENTLRMNO, inputMethod) {
    let headerRowPresent = 0;
    let constrainToRouteName = (CALCGEOMTYPE == "Route") ? 1 : 0;
    let rtenmformat = "AAdddd_dash_KG";
    let rte_nm_lrm_indices = [];
  
    // read in data
    // read user-entered input fields
    // requires CURRENTLRMNO, rtenmformat
    // set fields
    let field_indices = setIndicesByLrmAndGeom(CURRENTLRMNO);
    rte_nm_lrm_indices = field_indices[1];
    let currentFieldOrder = field_indices[2];
    // end set fields
  
    // pre-process data
    // retrieve data from input fields
    // putting in a loop for option of processing sequential entries
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
  
    // end pre-process data
    // outputs coordinateArr, an array of user-entered values
    // end read user-entered input fields
    // end read in data
  
    queryLrsByArray_forRPM(inputMethod, coordinateArr, headerRowPresent, field_indices, constrainToRouteName, rtenmformat);
  }


  async function queryLrsByArray_forRPM(inputMethod, arrayToQuery, headerRowPresent, field_indices, constrainToRouteName, rtenmformat) {
    resetGraphics();
    resetCurrentPagination();
  
    if (USEMAP == 1) {
      clearResultsFromMap();
    }
  
    GreenToYellow();
  
    lrm_indices0 = field_indices[0][0];
    lrm_indices1 = field_indices[0][1];
    rte_nm_lrm_indices = field_indices[1];
    let currentFieldOrder = field_indices[2];
  
    // make array for output
    let refinedData = [];
    let RteDfoArr = [];
  
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
        if (CALCGEOMTYPE == "Route") { url1 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices1); }
      } else if (inputMethod == "table") {
        url0 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices0);
        console.log(url0);
        if (CALCGEOMTYPE == "Route") { url1 = buildUrl(CURRENTLRMNO, currentRow, lrm_indices1); }
      }
      // end build url
  
      // perform query
      let results0 = await queryService(url0);
      let results1 = '';
      if (CALCGEOMTYPE == "Route") { results1 = await queryService(url1); }
      console.log("returned " + results0.length + " results for row: " + rowToQuery);
      // end perform query
  
      // get row header data
      let rowhead = (inputMethod == "table") ? other_indices.map(i => currentRow[i]) : ['feature'];
  
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
        let resultsArr = await matchOutputOnRteNm_forRPM(inputMethod, CURRENTLRMNO, unfilteredArr, user_input_rte_nm, RteDfoArr);
        // end get right route
        // assemble data
        let fullRowData = resultsArr;
        if (typeof rowhead !== 'undefined' && rowhead !== '') {
          fullRowData = rowhead.concat(resultsArr);
        }
  
        refinedData.push(fullRowData);
      } else {
        // process multiple returns
        for (let aRowResult = 0; aRowResult < results0.length; aRowResult++) {
          console.log("processing result: " + (aRowResult + 1) + " of " + (results0.length));
          let aRowResultObj = results0[aRowResult]; // but this is an object
  
          // Object.assign(aRowResultObj, { Feature: rowhead }); 
          refinedData.push(aRowResultObj);
        }
      }
      // end return single geom filtered on route name, or return multiple results
    }
    // end process rows
    // set column heads
    let customhead = (inputMethod == "table") ? other_indices.map(i => arrayToQuery[0][i]) : ["Feature"];
    let standardhead = (CALCGEOMTYPE == "Point") ? lrsApiFields : lrsApiFields.map(i => 'BEGIN_' + i).concat(lrsApiFields.map(i => 'END_' + i));
    let colhead = customhead.concat(standardhead);
  
    // prepend column heads
    if (CALCGEOMTYPE == "Route") {
      refinedData.unshift(colhead); // ON for route // OFF for point // needs a fix
    }
  
  
    // show results
    $(outputFieldIDs.RTE_DEFN_LN_NM).html(RteDfoArr[0]);
    $(outputFieldIDs.BDFO).html(RteDfoArr[1]);
    $(outputFieldIDs.EDFO).html(RteDfoArr[2]);
  
    YellowToGreen();
  }

  
  //get right route
async function rteDfoAssembler(routeQueryOutput, inputMethod, method, B_results, E_results, rte_nm) {
    let b_output = {};
    let e_output = {};
    let transposed = 0;
    let RteDfoArr = [];
    let bdfo = '';
    let edfo = '';
  
    //get right route
  
    if (method == 1 || method == 3) {
  
      if (inputMethod == "html") {
        let B_RTENMs = B_results.map(a => a.RTE_DEFN_LN_NM);
        let E_RTENMs = E_results.map(a => a.RTE_DEFN_LN_NM);
        let BE_RTENMs = B_RTENMs.filter(x => E_RTENMs.includes(x));
  
        if (method == 1) { // FIXME need to dynamically create selector
          dropDownPopulator("#candidateRTENMs", BE_RTENMs);
          rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs", "#candidateRTENMs");
          rte_nm = BE_RTENMs[rte_nm_Index];
        } else if (method == 3) {
          dropDownPopulator("#candidateRTENMs_2", BE_RTENMs);
          rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs_2", "#candidateRTENMs_2");
          rte_nm = BE_RTENMs[rte_nm_Index];
        }
  
        routeQueryOutput.push(rte_nm);
  
      }
  
      else if (inputMethod == "table") {
  
      }
  
    }
    // end get right route
  
    let b_index = B_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });
  
    let e_index = E_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });
  
    b_output = B_results[b_index];
    e_output = E_results[e_index];
    bdfo = B_results[b_index]['RTE_DFO'];
    edfo = E_results[e_index]['RTE_DFO'];
  
    // check min and max DFOs and transpose if necessary
    if (bdfo > edfo) {
      transposed = 1;
    }
  
    routeQueryOutput.push(Math.min(bdfo, edfo));
    routeQueryOutput.push(Math.max(bdfo, edfo));
  
  
    let matchOutputOnCommonRteNmOutput = [];
  
    if (transposed == 0) {
      matchOutputOnCommonRteNmOutput = (Object.values(b_output)).concat(Object.values(e_output));
    } else {
      matchOutputOnCommonRteNmOutput = (Object.values(e_output)).concat(Object.values(b_output));
    }
  
    /**
      try {
        matchOutputOnCommonRteNmOutput = (Object.values(b_output)).concat(Object.values(e_output));
      } catch (err) {
        matchOutputOnCommonRteNmOutput = lrsApiFields.concat(lrsApiFields);
      }
    */
  
  
    //return (matchOutputOnCommonRteNmOutput); //TODO change to a return function
  }


  async function setTableFieldsByMethod(CURRENTLRMNO, parsedInputCSV) {
    let field_indices = [];
    let lrm_indices = [];
    let lrm_indices0 = [];
    let lrm_indices1 = [];
    let candidate_fields = parsedInputCSV[0];
    all_fields = [...Array(candidate_fields.length).keys()];
  
    if (CALCGEOMTYPE == "Point") {
  
      if (CURRENTLRMNO == 1) {
        dropDownPopulator("#lat_field", candidate_fields);
        dropDownPopulator("#lon_field", candidate_fields);
        dropDownPopulator("#rte_nm_field", candidate_fields);
  
        let lat_field = ~~await confirmFieldChoice("#btn-lat_field", "#lat_field");
        let lon_field = ~~await confirmFieldChoice("#btn-lon_field", "#lon_field");
        let rte_nm_option = 0;  //TODO make this optional
        rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field") : '';
  
        lrm_indices = lrm_indices0 = [lat_field, lon_field, rte_nm_field];
        rte_nm_lrm_indices = [rte_nm_field];
      }
  
      else if (CURRENTLRMNO == 2) {
        dropDownPopulator("#rte_nm_field", candidate_fields);
        dropDownPopulator("#rm_field", candidate_fields);
        dropDownPopulator("#d_field", candidate_fields);
  
        let rte_nm_field = ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field");
        let rm_field = ~~await confirmFieldChoice("#btn-rm_field", "#rm_field");
        let d_field = ~~await confirmFieldChoice("#btn-d_field", "#d_field");
  
        lrm_indices = lrm_indices0 = [rte_nm_field, rm_field, d_field];
        rte_nm_lrm_indices = [rte_nm_field];
      }
  
      else if (CURRENTLRMNO == 3) {
        dropDownPopulator("#cs_field", candidate_fields);
        dropDownPopulator("#mpm_field", candidate_fields);
        dropDownPopulator("#rte_nm_field", candidate_fields);
  
        let cs_field = ~~await confirmFieldChoice("#btn-bs_field", "#cs_field");
        let mpm_field = ~~await confirmFieldChoice("#btn-mpm_field", "#mpm_field");
        let rte_nm_option = 0;  //TODO make this optional
        rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field") : '';
  
        lrm_indices = lrm_indices0 = [cs_field, mpm_field, rte_nm_field];
        rte_nm_lrm_indices = [rte_nm_field];
      }
  
      else if (CURRENTLRMNO == 4) {
        dropDownPopulator("#rte_nm_field", candidate_fields);
        dropDownPopulator("#dfo_field", candidate_fields);
  
        let rte_nm_field = ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field");
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
        rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field") : '';
  
        lrm_indices = [blat_field, blon_field, elat_field, elon_field, rte_nm_field];
        lrm_indices0 = [blat_field, blon_field];
        lrm_indices1 = [elat_field, elon_field];
        rte_nm_lrm_indices = [rte_nm_field];
      }
  
      else if (CURRENTLRMNO == 2) {
        dropDownPopulator("#rte_nm_field", candidate_fields);
        dropDownPopulator("#brm_field", candidate_fields);
        dropDownPopulator("#bd_field", candidate_fields);
        dropDownPopulator("#erm_field", candidate_fields);
        dropDownPopulator("#ed_field", candidate_fields);
  
        let rte_nm_field = ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field");
        let brm_field = ~~await confirmFieldChoice("#btn-brm_field", "#brm_field");
        let bd_field = ~~await confirmFieldChoice("#btn-bd_field", "#bd_field");
        let erm_field = ~~await confirmFieldChoice("#btn-erm_field", "#erm_field");
        let ed_field = ~~await confirmFieldChoice("#btn-ed_field", "#ed_field");
  
        lrm_indices = [rte_nm_field, brm_field, bd_field, erm_field, ed_field];
        lrm_indices0 = [rte_nm_field, brm_field, bd_field];
        lrm_indices1 = [rte_nm_field, erm_field, ed_field];
        rte_nm_lrm_indices = [rte_nm_field];
      }
  
      else if (CURRENTLRMNO == 3) {
        dropDownPopulator("#bcs_field", candidate_fields);
        dropDownPopulator("#bmpm_field", candidate_fields);
        dropDownPopulator("#ecs_field", candidate_fields);
        dropDownPopulator("#empm_field", candidate_fields);
        dropDownPopulator("#rte_nm_field", candidate_fields);
  
        let bcs_field = ~~await confirmFieldChoice("#btn-bcs_field", "#bcs_field");
        let bmpm_field = ~~await confirmFieldChoice("#btn-bmpm_field", "#bmpm_field");
        let ecs_field = ~~await confirmFieldChoice("#btn-ecs_field", "#ecs_field");
        let empm_field = ~~await confirmFieldChoice("#btn-empm_field", "#empm_field");
        let rte_nm_option = 0;  //TODO make this optional
        rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field") : '';
  
        lrm_indices = [bcs_field, bmpm_field, ecs_field, empm_field, rte_nm_field];
        lrm_indices0 = [bcs_field, bmpm_field];
        lrm_indices1 = [ecs_field, empm_field];
        rte_nm_lrm_indices = [rte_nm_field];
      }
  
      else if (CURRENTLRMNO == 4) {
        dropDownPopulator("#rte_nm_field", candidate_fields);
        dropDownPopulator("#bdfo_field", candidate_fields);
        dropDownPopulator("#edfo_field", candidate_fields);
  
        let rte_nm_field = ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field");
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

  
  function setIndicesByLrmAndGeom(CURRENTLRMNO) {
    let field_indices = [];
    let lrm_indices = [];
    let lrm_indices0 = [];
    let lrm_indices1 = [];
  
    if (CALCGEOMTYPE == "Point") {
  
      if (CURRENTLRMNO == 1) {
  
        lrm_indices = lrm_indices0 = [0, 1];
        rte_nm_lrm_indices = [2]; // optional
        currentFieldOrder = ['inputLatitude', 'inputLongitude'];
      }
  
      else if (CURRENTLRMNO == 2) {
  
        lrm_indices = lrm_indices0 = [0, 1, 2];
        rte_nm_lrm_indices = [0];
        currentFieldOrder = ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement'];
      }
  
      else if (CURRENTLRMNO == 3) {
  
        lrm_indices = lrm_indices0 = [0, 1];
        rte_nm_lrm_indices = [2]; // optional
        currentFieldOrder = ['inputControlSection', 'inputMilepointMeasure'];
      }
  
      else if (CURRENTLRMNO == 4) {
  
        lrm_indices = lrm_indices0 = [0, 1];
        rte_nm_lrm_indices = [0];
        currentFieldOrder = ['inputRouteName_4', 'inputDistanceFromOrigin'];
      }
    }
  
    else if (CALCGEOMTYPE == "Route") {
  
      if (CURRENTLRMNO == 1) {
  
        lrm_indices0 = [0, 1];
        lrm_indices1 = [2, 3];
        rte_nm_lrm_indices = [4]; // optional
        currentFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];
      }
  
      else if (CURRENTLRMNO == 2) {
  
        lrm_indices0 = [0, 1, 2];
        lrm_indices1 = [0, 3, 4];
        rte_nm_lrm_indices = [0];
        currentFieldOrder = ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'];
      }
  
      else if (CURRENTLRMNO == 3) {
  
        lrm_indices0 = [0, 1];
        lrm_indices1 = [2, 3];
        rte_nm_lrm_indices = [4]; // optional
        currentFieldOrder = ['inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure'];
      }
  
      else if (CURRENTLRMNO == 4) {
  
        lrm_indices0 = [0, 1];
        lrm_indices1 = [0, 2];
        rte_nm_lrm_indices = [0];
        currentFieldOrder = ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'];
      }
    }
  
  
    field_indices = [[lrm_indices0, lrm_indices1], rte_nm_lrm_indices, currentFieldOrder];
  
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

  
  async function matchOutputOnRteNm_forRPM(inputMethod, method, unfilteredArr, rte_nm, RteDfoArr) {
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
    let match = [];
  
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
  
      RteDfoArr.push(rte_nm);
      RteDfoArr.push(Math.min(bdfo, edfo));
      RteDfoArr.push(Math.max(bdfo, edfo));
      console.log(RteDfoArr);
  
      // check min and max DFOs and transpose if necessary
      if (bdfo > edfo) {
        match = (Object.values(output1)).concat(Object.values(output0));
      } else {
        match = (Object.values(output0)).concat(Object.values(output1));
      }
  
    }
  
    else {
      match = (Object.values(output0));
    }
  
    return (match);
  }
  
  
  function noMatchOutputOnRteNm(unfilteredArr) {
    let results0 = unfilteredArr[0];
    let output0 = results0[0];
    console.log(output0);
    let nomatch = (Object.values(output0));
    return (nomatch);
  }


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
  
