
// function which takes method to query lrs service for a single point
async function lrsQuery(method, useMap, ...id_coord) {
  graphics = []; //this is an experiment
  currentPos = 1;
  //let useMap = 1;
  let useLoadIndicator = 1;
  console.log(method);
  console.log(id_coord);


  if (useMap == 1) {
    //clear existing point
    view.graphics.removeAll(); //add this back in later -- need to separate out map functions from calculator functions
  }

  if (useLoadIndicator == 1) {
    /*const loading = document.getElementById("loading");
    loading.classList.remove("hide");*/
    GreenToYellow();
  }

  url = makeLrsQueryUrlFromHtml(method, id_coord);

  const results = await queryService(url);
  showResults(results);
  specialResults(results);

  if (useMap == 1) {
    showResultsOnMap(results);  //add this back in later -- need to separate out map functions from calculator functions
  }

  if (useLoadIndicator == 1) {
    /*loading.classList.add("hide");*/
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


// function which uses mouse click lat/lon to query lrs service for a single point
async function coordinateQuery(_lat, _lon) {
  graphics = []; //this is an experiment
  //const loading = document.getElementById("loading");
  //loading.classList.remove("hide");

  currentPos = 1;
  let lat, lon;

  if (_lat && _lon) {
    lat = _lat;
    lon = _lon;
  }

  //clear existing point
  view.graphics.removeAll();
  view.goTo({
    center: [parseFloat(lon), parseFloat(lat)],
    zoom: 17,
  });

  const url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;

  const results = await queryService(url);

  showResults(results)
  showResultsOnMap(results);

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

    //loading.classList.add("hide");
  });
}

// calls API
async function queryService(url) {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

  return response.json(); // parses JSON response into native JavaScript objects
}



//TODO move clear graphics into its own function
// function which takes method to query lrs service for a single point
async function lrsDualQuery(method, useMap, ...id_coord) {
  currentPos = 1;
  console.log(method);
  console.log(id_coord);

  let routeQueryOutput = [];


  if (useMap == 1) {
    //clear existing point
    view.graphics.removeAll();
  }

  if (method == 1) {
    b_coord = id_coord.slice(0, 2);
    e_coord = id_coord.slice(2, 4);
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

  if (method == 1) {
    // TODO make array of common route names and pass to selector
  }

  else if (method == 2) {

    let b_index = B_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm
    });

    let bdfo = B_results[b_index]['RTE_DFO'];
    routeQueryOutput.push(bdfo);

    let e_index = E_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm
    });

    let edfo = E_results[e_index]['RTE_DFO'];
    routeQueryOutput.push(edfo);

  }

  else if (method == 3) {
    // TODO make array of common control sections and pass to selector
  }

  else if (method == 4) {

    let b_index = B_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm
    });

    let bdfo = B_results[b_index]['RTE_DFO'];
    routeQueryOutput.push(bdfo);

    let e_index = E_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm
    });

    let edfo = E_results[e_index]['RTE_DFO'];
    routeQueryOutput.push(edfo);
  }


  console.log(routeQueryOutput);

  showRouteResults(routeQueryOutput);

  /*
  if (useMap == 1) {
      showResultsOnMap(results);
  }*/

}



