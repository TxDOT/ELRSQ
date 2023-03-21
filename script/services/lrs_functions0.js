/**
 *
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 *
 * adds values to coordinateArr
 * starts queryLrsByArray
 */
async function lrsSingleQuery(convertSessionParams) {
  let formEntryParams = new Object();
  formEntryParams.headerRowPresent = 0;
  formEntryParams.constrainToRouteName = (convertSessionParams.calcGeomType == "Route") ? 1 : 0;
  formEntryParams.rtenmformat = "AAdddd_dash_KG";

  let coordinateArr = [];

  let field_indicesObj = setIndicesByLrmAndGeom(convertSessionParams);
  let currentFieldOrder = field_indicesObj.currentFieldOrder;

  for (let rowToQuery = 0; rowToQuery < 1; rowToQuery++) {
    let coordinateArr0 = [];
    for (let i = 0; i < currentFieldOrder.length; i++) {
      let value = $('#' + currentFieldOrder[i]).val();
      if ((convertSessionParams.currentLrmNo == 2 || convertSessionParams.currentLrmNo == 4) && formEntryParams.rtenmformat == "AAdddd" && i == 0) {
        value = fixThisVerySpecificTextFormat(value);
      }
      coordinateArr0.push(value);
    }
    coordinateArr.push(coordinateArr0);
  }

  queryLrsByArray(convertSessionParams, formEntryParams, coordinateArr, field_indicesObj);
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
async function lrsBulkQuery(convertSessionParams, fileContents, rtenmformat) {
  let formEntryParams = new Object();
  formEntryParams.headerRowPresent = 1;
  formEntryParams.constrainToRouteName = (convertSessionParams.calcGeomType == "Route") ? 1 : 1; // changing this so bulk points are constrained as well
  formEntryParams.rtenmformat = rtenmformat;

  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": 'greedy' }).data;

  let field_indicesObj = await setTableFieldsByMethod(convertSessionParams, parsedInputCSV);
  let rte_nm_lrm_indices = field_indicesObj.rte_nm_lrm_indices;

  if (typeof rte_nm_lrm_indices !== 'undefined' && rtenmformat == "AAdddd") {
    for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) {
      parsedInputCSV[rowToQuery][rte_nm_lrm_indices] = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    }
  }

  queryLrsByArray(convertSessionParams, formEntryParams, parsedInputCSV, field_indicesObj);
}


/**
 *
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @returns an array with field indices and names
 */
function setIndicesByLrmAndGeom(convertSessionParams) {
  let lrm_indices = [];
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = [];
  let currentFieldOrder = [];

  if (convertSessionParams.calcGeomType == "Point") {

    if (convertSessionParams.currentLrmNo == 1) {
      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['kbInputLatitude', 'kbInputLongitude'];
    }

    else if (convertSessionParams.currentLrmNo == 2) {
      lrm_indices = lrm_indices0 = [0, 1, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName', 'kbInputReferenceMarker', 'kbInputDisplacement'];
    }

    else if (convertSessionParams.currentLrmNo == 3) {
      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['kbInputControlSection', 'kbInputMilepointMeasure'];
    }

    else if (convertSessionParams.currentLrmNo == 4) {
      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName', 'kbInputDistanceFromOrigin'];
    }
  }

  else if (convertSessionParams.calcGeomType == "Route") {

    if (convertSessionParams.currentLrmNo == 1) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      rte_nm_lrm_indices = [4]; // optional
      currentFieldOrder = ['kbInputBeginLatitude', 'kbInputBeginLongitude', 'kbInputEndLatitude', 'kbInputEndLongitude'];
    }

    else if (convertSessionParams.currentLrmNo == 2) {
      lrm_indices0 = [0, 1, 2];
      lrm_indices1 = [0, 3, 4];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName_2', 'kbInputBeginReferenceMarker', 'kbInputBeginDisplacement', 'kbInputEndReferenceMarker', 'kbInputEndDisplacement'];
    }

    else if (convertSessionParams.currentLrmNo == 3) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [0, 2];
      rte_nm_lrm_indices = [3]; // optional
      currentFieldOrder = ['kbInputBeginControlSection', 'kbInputBeginMilepointMeasure', 'kbInputEndMilepointMeasure'];
    }

    else if (convertSessionParams.currentLrmNo == 4) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [0, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName_2', 'kbInputBeginDistanceFromOrigin', 'kbInputEndDistanceFromOrigin'];
    }
  }

  let field_indicesObj = new Object();
  field_indicesObj.lrm_indices0 = lrm_indices0;
  field_indicesObj.lrm_indices1 = lrm_indices1;
  field_indicesObj.rte_nm_lrm_indices = rte_nm_lrm_indices;
  field_indicesObj.currentFieldOrder = currentFieldOrder;
  field_indicesObj.other_indices = [];

  return field_indicesObj;
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
    refMarker = coordinateArr[index1] || 0;
    displacement = coordinateArr[index2] || 0;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (currentLrmNo == 3) {
    controlSecNum = coordinateArr[index0];
    milePointMeasure = coordinateArr[index1] || 0;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (currentLrmNo == 4) {
    routeName = coordinateArr[index0];
    dfo = coordinateArr[index1] || 0;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}


function getRightRouteName_Pre(inputMethod, rtenmformat, rte_nm_lrm_indices, currentRow) {

  let user_input_rte_nm = '';
  
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


/**
 *
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 * @param {*} unfilteredArr an array containing results from 1 or 2 queries
 * @returns a route name
 */

async function getRightRteNm(convertSessionParams, unfilteredArr) {
  let rte_nm = '';
  
  let results0 = unfilteredArr[0];
  let results1 = unfilteredArr[1];

  if (convertSessionParams.currentLrmNo == 1) {
    let candidateRteNms = '';
    let RTENMs0 = [];
    let RTENMs1 = [];

    if (convertSessionParams.inputMethod == "html") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (convertSessionParams.calcGeomType == "Route") {
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

    if (convertSessionParams.inputMethod == "table") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (convertSessionParams.calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }
      rte_nm = candidateRteNms[0]; // this is picking the first available candidate route name
    }

  }

  if (convertSessionParams.currentLrmNo == 3) {
    let candidateRteNms = '';
    let RTENMs0 = [];
    let RTENMs1 = [];

    if (convertSessionParams.inputMethod == "html") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (convertSessionParams.calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }
      rte_nm = candidateRteNms[0]; // this is picking the first available candidate route name
    }

    if (convertSessionParams.inputMethod == "table") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (convertSessionParams.calcGeomType == "Route") {
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

async function matchOutputOnRteNm(convertSessionParams, unfilteredArr, rte_nm) {
  if (GLOBALSETTINGS.PrintIterations == 1) { console.log(unfilteredArr); }
  let matchError = 0;
  let preBEGIN = `BEGIN_`;
  let preEND = `END_`;

  let results0 = unfilteredArr[0];
  let results1 = unfilteredArr[1];


  if (results0[0].RTE_DEFN_LN_NM == null) { matchError = -1; };

  let notmatch0 = lrsDummy2;
  let notmatchbegin = Object.keys(lrsDummy2).reduce((a, c) => (a[`${preBEGIN}${c}`] = lrsDummy2[c], a), {});
  Object.keys(notmatchbegin).forEach((i) => notmatchbegin[i] = null);
  let notmatchend = Object.keys(lrsDummy2).reduce((a, c) => (a[`${preEND}${c}`] = lrsDummy2[c], a), {});
  Object.keys(notmatchend).forEach((i) => notmatchend[i] = null);

  let notmatch1 = { ...notmatchbegin, ...notmatchend };

  // get right rte_nm
  if (convertSessionParams.currentLrmNo == 1 || convertSessionParams.currentLrmNo == 3) {
    rte_nm = await getRightRteNm(convertSessionParams, unfilteredArr);
  }

  // match output
  let output0 = {};
  let output1 = {};
  let match = {};

  let index0 = results0.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  output0 = results0[index0];


  if (convertSessionParams.calcGeomType == "Point") {
    if (matchError >= 0) {
      matchError = index0;
    } // if index0 is -1 it will set matchError to that value

    if (matchError >= 0) {

      match = { ...output0 };
    }

    else {
      match = notmatch0;
    }
  }


  if (convertSessionParams.calcGeomType == "Route") {
    if (matchError >= 0) {
      matchError = index0;
    } // if index0 is -1 it will set matchError to that value
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



  let matchObj = {};
  matchObj.match = match;
  matchObj.matcherror = matchError;

  return (matchObj);
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


function filterMultipleReturns(convertSessionParams, unfilteredArr) {
  if (GLOBALSETTINGS.PrintIterations == 1) { console.log(unfilteredArr); }
  let matchError = 0;
  let results0 = unfilteredArr[0];
  if (results0[0].RTE_DEFN_LN_NM == null) { matchError = -1; };

  let rteid_Arr = _.map(results0, _.property('ROUTEID'));
  let rdbd_Arr = _.map(results0, _.property('RTE_PRFX_TYPE_DSCR')); //FIXME switch to correct fieldname
  let kg_Arr = rdbd_Arr.map(x => (x == 'Single Roadbed'));

  let rteid_rdbd_match_Arr = _.zip(rteid_Arr, rdbd_Arr, kg_Arr);

  let justKGs_Arr = [];
  for (let i = 0; i < rteid_rdbd_match_Arr.length; i = i + 1) {
    if (rteid_rdbd_match_Arr[i][2]) {
      justKGs_Arr.push(rteid_rdbd_match_Arr[i][0]);
    }
  }

  const { ROUTEIDs, RTE_PRFX_TYPE_DSCRs } = { ROUTEIDs: justKGs_Arr, RTE_PRFX_TYPE_DSCRs: ['Single Roadbed'] };

  const filteredresults0 = results0.filter(({ ROUTEID, RTE_PRFX_TYPE_DSCR }) => (
    !(ROUTEIDs.includes(ROUTEID)) || RTE_PRFX_TYPE_DSCRs.includes(RTE_PRFX_TYPE_DSCR)
  ));


  let matchObj = {};
  matchObj.filteredresults = filteredresults0;
  matchObj.matcherror = matchError;

  console.log(matchObj);
  return (matchObj);
}





