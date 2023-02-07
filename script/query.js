async function controlSectionQuery() {
    //clear existing point
    view.graphics.removeAll();
  
  
    const loading = document.getElementById("loading");
    loading.classList.remove("hide");
    const controlSecNumElem = document.getElementById("control-section-number");
    const milePointMeasureElem = document.getElementById("mile-point-measure");
    const controlSecNum = controlSecNumElem.value || controlSecNumElem.defaultValue;
    const milePointMeasure = milePointMeasureElem.value || milePointMeasureElem.defaultValue;
  
    const url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
    const results = await queryService(url);
    showResults(results);
    showResultsOnMap(results);
  
   loading.classList.add("hide");
  }
  
  async function dfoQuery() {
    //clear existing point
    view.graphics.removeAll();
  
    const loading = document.getElementById("loading");
    loading.classList.remove("hide");
    const routeNameElem = document.getElementById("route-name");
    const dfoElem = document.getElementById("dfo");
    const routeName = routeNameElem.value || routeNameElem.defaultValue;
    const dfo = dfoElem.value || dfoElem.defaultValue;  
  
    const url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
    const results = await queryService(url);
    showResults(results);
    showResultsOnMap(results);
  
   loading.classList.add("hide");
  }
  
  async function refMarkerQuery() {
    //clear existing point
    view.graphics.removeAll();
  
    const loading = document.getElementById("loading");
    loading.classList.remove("hide");
    const routeNameElem = document.getElementById("route-name");
    const refMarkerElem = document.getElementById("reference-marker");
    const displacementElem = document.getElementById("displacement");
    const routeName = routeNameElem.value || routeNameElem.defaultValue;
    const refMarker = refMarkerElem.value || refMarkerElem.defaultValue;
    const displacement = displacementElem.value || displacementElem.defaultValue;  
  
    const url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
    const results = await queryService(url);
    showResults(results);
    showResultsOnMap(results);
  
   loading.classList.add("hide");
  
  } 
  
  async function coordinateQuery(_lat, _lon) {
    const loading = document.getElementById("loading");
    loading.classList.remove("hide");
  
    let lat, lon;
  
    if (_lat && _lon) {
      lat = _lat;
      lon = _lon;
  
    } else {
  
      const latElem = document.getElementById("lat");
      const lonElem = document.getElementById("lon");
      
       lat = latElem.value || latElem.defaultValue;
       lon = lonElem.value || lonElem.defaultValue;
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
          outline : {
            color: [255, 255, 0],
            width: 3
          }
        };
        
        let pointGraphic = new Graphic({
          geometry: point,
          symbol: symbol
        });
        
        view.graphics.add(pointGraphic);
  
        loading.classList.add("hide");
    });
  }
  
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
  
  