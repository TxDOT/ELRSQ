
// function which takes method to query lrs service for a single point
async function lrsQuery(method, useMap, ...id_coord) {
  resetGraphics();
  resetCurrentPos();

  let useLoadIndicator = 1;

  if (useMap == 1) {
    clearResultsFromMap();
  }

  if (useLoadIndicator == 1) {
    GreenToYellow();
  }

  url = makeLrsQueryUrlFromHtml(method, id_coord);

  const results = await queryService(url);
  showResults(results);
  specialResults(results);

  if (useMap == 1) {
    showResultsOnMap(results);
  }

  if (useLoadIndicator == 1) {
    YellowToGreen();
  }
}


function makeLrsQueryUrlFromHtml(method, id_coord) {

  if (method == 1) {
    let lat = $('#' + id_coord[0]).val();
    let lon = $('#' + id_coord[1]).val();
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (method == 2) {
    let routeName = $('#' + id_coord[0]).val();
    let refMarker = $('#' + id_coord[1]).val();
    let displacement = $('#' + id_coord[2]).val();
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (method == 3) {
    let controlSecNum = $('#' + id_coord[0]).val();
    let milePointMeasure = $('#' + id_coord[1]).val();
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (method == 4) {
    let routeName = $('#' + id_coord[0]).val();
    let dfo = $('#' + id_coord[1]).val();
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}


function makeLrsQueryUrlFromIndex(method, vector, index_coord) {
  console.log(vector);

  if (method == 1) {
    const lat = vector[index_coord[0]];
    const lon = vector[index_coord[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (method == 2) {
    const routeName = vector[index_coord[0]];
    const refMarker = vector[index_coord[1]];
    const displacement = vector[index_coord[2]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (method == 3) {
    const controlSecNum = vector[index_coord[0]];
    const milePointMeasure = vector[index_coord[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (method == 4) {
    const routeName = vector[index_coord[0]];
    const dfo = vector[index_coord[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}


// function which uses mouse click lat/lon to query lrs service for a single point
async function coordinateQuery(_lat, _lon) {
  resetGraphics();
  resetCurrentPos();

  let useLoadIndicator = 1;

  if (useLoadIndicator == 1) {
    GreenToYellow();
  }

  let lat, lon;

  if (_lat && _lon) {
    lat = _lat;
    lon = _lon;
  }

  //clear existing point
  clearResultsFromMap();
  view.goTo({
    center: [parseFloat(lon), parseFloat(lat)],
    zoom: 17,
  });

  const url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;

  const results = await queryService(url);

  showResults(results)
  showResultsOnMap(results);

  addPointGraphic(lat, lon);

  if (useLoadIndicator == 1) {
    YellowToGreen();
  }

}

function addPointGraphic(lat, lon) {
  require(["esri/Graphic"], (Graphic) => {
    let point = {
      type: "point",
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    };

    let symbol = {
      type: "simple-marker",
      color: [226, 119, 40],
      size: "12px",
      outline: {
        color: [255, 255, 0],
        width: 3
      }
    };

    let pointGraphic = new Graphic({
      geometry: point,
      symbol: symbol
    });

    view.graphics.add(pointGraphic);
  });
}


// bulk conversion functions

function thenConvertCSVByMethod(fileContents) {
  console.log("thenConvertCSVByMethod");

  //set method parameter depending on tab
  if (currentLRM == `referencemarker-tab`) {
    method = 2;
    csvinToCsvout(fileContents, method, 1, 2, 3); // need to determine template
  } else if (currentLRM == `controlsection-tab`) {
    method = 3;
    csvinToCsvout(fileContents, method, 1, 2); // need to determine template
  } else if (currentLRM == `distancefromorigin-tab`) {
    method = 4;
    csvinToCsvout(fileContents, method, 1, 2); // need to determine template
  } else {
    method = 1;
    csvinToCsvout(fileContents, method, 2, 1);
  }
}


async function csvinToCsvout(text, method, ...index_coord) {
  let array = Papa.parse(text, { "skipEmptyLines": true }).data;
  let outputArray = [];
  let useLoadIndicator = 1;

  if (useLoadIndicator == 1) {
    GreenToYellow();
    console.log("busy");
  }

  ////const titleKeys = Object.keys(outputArray[0][0])
  const titleKeys = ["LAT", "LON", "GID", "RTE_DEFN_LN_NM", "RTE_DFO", "ROUTEID", "ROUTENUMBER", "RTE_PRFX_TYPE_DSCR", "RDBD_TYPE_DSCR", "RMRKR_PNT_NBR", "RMRKR_DISPLACEMENT", "CTRL_SECT_LN_NBR", "CTRL_SECT_MPT", "MSG", "distance"]
  titleKeys.unshift("Feature");
  let refinedData = []
  refinedData.push(titleKeys)

  // skipping 0 header row
  for (let i = 1; i < array.length; i++) {
    console.log(i);
    results = await queryByLine(array, i, method, ...index_coord);
    breakMultipleResults(outputArray, refinedData, array, i, results)
  }

  bulkExport(refinedData);

  if (useLoadIndicator == 1) {
    YellowToGreen();
  }

};


// TODO All: needs the functionality to export geoJSON and KML as well
function bulkExport(refinedData) {
  makeDownloadLink(Papa.unparse(refinedData));
  // TODO export to geoJSON
  // TODO export to KML
}

async function queryByLine(array, line, method, ...index_coord) {
  console.log("queryByLine");
  currentLine = array[line];

  url = makeLrsQueryUrlFromIndex(method, currentLine, index_coord)
  console.log(url);
  const results = await queryService(url);
  return results;
}


// if result has multiple rows, write each row individually
function breakMultipleResults(output1, output2, array, line, results) {
  rowhead = (array[line])[0];

  results.forEach(_result => {
    output1.push(_result);
    out_row = Object.values(_result);
    out_row.unshift(rowhead);
    output2.push(out_row);
  });
}

// function which takes method to query lrs service for a single point
async function lrsDualQuery(method, useMap, ...id_coord) {
  currentPos = 1;
  console.log(method);
  console.log(id_coord);

  let routeQueryOutput = [];


  if (useMap == 1) {
    clearResultsFromMap();
  }

  if (method == 1) {
    b_coord = id_coord.slice(0, 2);
    e_coord = id_coord.slice(2, 4);
    rte_nm = '';
  }

  else if (method == 2) {
    b_coord = [id_coord[0], id_coord[1], id_coord[2]];
    e_coord = [id_coord[0], id_coord[3], id_coord[4]];
    rte_nm = $("#" + id_coord[0]).val();
    routeQueryOutput.push(rte_nm);
  }

  else if (method == 3) {
    b_coord = id_coord.slice(0, 2);
    e_coord = id_coord.slice(2, 4);
    rte_nm = '';
  }

  else if (method == 4) {
    b_coord = [id_coord[0], id_coord[1]];
    e_coord = [id_coord[0], id_coord[2]];
    rte_nm = $("#" + id_coord[0]).val();
    routeQueryOutput.push(rte_nm);
  }

  B_url = makeLrsQueryUrlFromHtml(method, b_coord);
  E_url = makeLrsQueryUrlFromHtml(method, e_coord);

  const B_results = await queryService(B_url);
  const E_results = await queryService(E_url);

  console.log("success");
  console.log(B_results);
  console.log(E_results);

  await Rte_Dfo_Assembler(routeQueryOutput, method, B_results, E_results, rte_nm);

  showRouteResults(routeQueryOutput);

  /*
  if (useMap == 1) {
      showResultsOnMap(results);
  }*/

}


// description
async function Rte_Dfo_Assembler(routeQueryOutput, method, B_results, E_results, rte_nm) {
  if (method == 2 || method == 4) {

    let b_index = B_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm
    });

    let bdfo = B_results[b_index]['RTE_DFO'];

    let e_index = E_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm
    });

    let edfo = E_results[e_index]['RTE_DFO'];

    routeQueryOutput.push(bdfo);
    routeQueryOutput.push(edfo);

  } else if (method == 1 || method == 3) {

    let B_RTENMs = B_results.map(a => a.RTE_DEFN_LN_NM);
    let E_RTENMs = E_results.map(a => a.RTE_DEFN_LN_NM);
    let BE_RTENMs = B_RTENMs.filter(x => E_RTENMs.includes(x));

    for (var i = 0; i < BE_RTENMs.length; i++) {
      var optn = BE_RTENMs[i];
      var el = document.createElement("option");
      el.textContent = optn;
      el.value = optn;

      if (method == 1) {
        $("#candidateRTENMs").append(el);
      } else if (method == 3) {
        $("#candidateRTENMs_2").append(el);
      }

    }

    if (method == 1) {
      rte_nm = await confirmRTENM();
    } else if (method == 3) {
      rte_nm = await confirmRTENM_2();
    }

    routeQueryOutput.push(rte_nm);

    let b_index = B_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm
    });

    let bdfo = B_results[b_index]['RTE_DFO'];

    let e_index = E_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm
    });

    let edfo = E_results[e_index]['RTE_DFO'];

    // check min and max DFOs and transpose if necessary
    routeQueryOutput.push(Math.min(bdfo, edfo));
    routeQueryOutput.push(Math.max(bdfo, edfo));

  }
}



// https://wesbos.com/javascript/12-advanced-flow-control/72-async-await-prompt-ui

async function confirmRTENM() {
  result = (await
    new Promise(async function (resolve) {

      $("#btn-candidateRTENMs").on("click", function (e) {
        //e.preventDefault();
        resolve(document.querySelector("#candidateRTENMs").value);
      });
    })
  );

  return result;
}

async function confirmRTENM_2() {
  result = (await
    new Promise(async function (resolve) {

      $("#btn-candidateRTENMs_2").on("click", function (e) {
        //e.preventDefault();
        resolve(document.querySelector("#candidateRTENMs_2").value);
      });
    })
  );

  return result;
}
