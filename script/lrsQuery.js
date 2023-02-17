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
  console.log(method);
  console.log(id_coord[0]);
  console.log(id_coord[1]);
  console.log(id_coord[2]);

  if (method == 1) {
    const latElem = document.getElementById(id_coord[0]);
    const lonElem = document.getElementById(id_coord[1]);
    lat = latElem.value || latElem.defaultValue;
    lon = lonElem.value || lonElem.defaultValue;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (method == 2) {
    const routeNameElem = document.getElementById(id_coord[0]);
    const refMarkerElem = document.getElementById(id_coord[1]);
    const displacementElem = document.getElementById(id_coord[2]);
    const routeName = routeNameElem.value || routeNameElem.defaultValue;
    const refMarker = refMarkerElem.value || refMarkerElem.defaultValue;
    const displacement = displacementElem.value || displacementElem.defaultValue;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (method == 3) {
    const controlSecNumElem = document.getElementById(id_coord[0]);
    const milePointMeasureElem = document.getElementById(id_coord[1]);
    const controlSecNum = controlSecNumElem.value || controlSecNumElem.defaultValue;
    const milePointMeasure = milePointMeasureElem.value || milePointMeasureElem.defaultValue;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (method == 4) {
    const routeNameElem = document.getElementById(id_coord[0]);
    const dfoElem = document.getElementById(id_coord[1]);
    const routeName = routeNameElem.value || routeNameElem.defaultValue;
    const dfo = dfoElem.value || dfoElem.defaultValue;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}




// function which uses mouse click lat/lon to query lrs service for a single point
async function coordinateQuery(_lat, _lon) {
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

