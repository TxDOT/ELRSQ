
// function which takes method to query lrs service for a single point
async function lrsQuery(method, useMap, ...id_coord) {
  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  url = makeLrsQueryUrlFromHtml(method, id_coord);

  const results = await queryService(url);
  showResults(results);
  tabularPointsConvertExport(results);

  if (useMap == 1) {
    showPointResultsOnMap(results);
  }

  YellowToGreen();

}


// function which uses mouse click lat/lon to query lrs service for a single point
async function cursorQuery(lat, lon) {
  resetGraphics();
  resetCurrentPagination();

  let useMap = 1;

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  //go to cursor location, regardless of api results
  addPointGraphic(lat, lon);
  view.goTo({
    center: [parseFloat(lon), parseFloat(lat)],
    zoom: 17,
  });

  const url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;

  const results = await queryService(url);
  showResults(results);
  tabularPointsConvertExport(results);

  if (useMap == 1) {
    showPointResultsOnMap(results);
  }

  YellowToGreen();

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






// bulk conversion functions

function thenConvertCSVByMethod(fileContents) {
  console.log("thenConvertCSVByMethod");

  //set method parameter depending on tab
  if (currentLRM == `referencemarker-tab`) {
    method = 2;
    csvinToResultsArray(fileContents, method, 1, 2, 3); // need to determine template
  } else if (currentLRM == `controlsection-tab`) {
    method = 3;
    csvinToResultsArray(fileContents, method, 1, 2); // need to determine template
  } else if (currentLRM == `distancefromorigin-tab`) {
    method = 4;
    csvinToResultsArray(fileContents, method, 1, 2); // need to determine template
  } else {
    method = 1;
    csvinToResultsArray(fileContents, method, 2, 1);
  }
}


async function csvinToCsvout(text, method, ...index_coord) {
  let array = Papa.parse(text, { "skipEmptyLines": true }).data;
  let outputArray = [];

  GreenToYellow();

  ////const titleKeys = Object.keys(outputArray[0][0])
  let titleKeys = lrsApiFields;
  titleKeys.unshift("Feature");
  let refinedData = []
  refinedData.push(titleKeys)

  // skipping 0 header row
  for (let i = 1; i < array.length; i++) {
    console.log(i);

    url = makeLrsQueryUrlFromIndex(method, array[i], index_coord)
    results = await queryService(url);
    breakMultipleResults(outputArray, refinedData, array, i, results)
  }

  tabularPointsConvertExport(refinedData);

  YellowToGreen();

};



// if result has multiple rows, write each row individually
function breakMultipleResults(output1, output2, array, line, results) {
  rowhead = (array[line])[0];


  for (let i = 0; i < results.length; i = i + 1) {
    output1.push(results[i]);
    out_row = Object.values(results[i]);
    out_row.unshift(rowhead);
    output2.push(out_row);
  }

}

// function which takes method to query lrs service for a single point
async function lrsDualQuery(method, useMap, ...id_coord) {
  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  let routeQueryOutput = [];

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

  let B_url = makeLrsQueryUrlFromHtml(method, b_coord);
  let E_url = makeLrsQueryUrlFromHtml(method, e_coord);

  const B_results = await queryService(B_url);
  const E_results = await queryService(E_url);

  await Rte_Dfo_Assembler(routeQueryOutput, method, B_results, E_results, rte_nm);

  showRouteResults(routeQueryOutput);

  //TODO tabular export

  YellowToGreen();

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
