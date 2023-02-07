async function lrsQuery(method) {
    console.log(method);
    //clear existing point
    view.graphics.removeAll();
  
    //const loading = document.getElementById("loading");
    //loading.classList.remove("hide");

    if (method == 1){
        const latElem = document.getElementById("inputLat");
        const lonElem = document.getElementById("inputLon");
        lat = latElem.value || latElem.defaultValue;
        lon = lonElem.value || lonElem.defaultValue;
        url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
    }

    else if (method == 2){
        const routeNameElem = document.getElementById("inputRouteName_2");
        const refMarkerElem = document.getElementById("inputReferenceMarker");
        const displacementElem = document.getElementById("inputDisplacement");
        const routeName = routeNameElem.value || routeNameElem.defaultValue;
        const refMarker = refMarkerElem.value || refMarkerElem.defaultValue;
        const displacement = displacementElem.value || displacementElem.defaultValue;  
        url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
    }

    else if (method == 3){
        const controlSecNumElem = document.getElementById("inputControlSec");
        const milePointMeasureElem = document.getElementById("inputMilepointMeasure");
        const controlSecNum = controlSecNumElem.value || controlSecNumElem.defaultValue;
        const milePointMeasure = milePointMeasureElem.value || milePointMeasureElem.defaultValue;
        url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
    }

    else if (method == 4){
        const routeNameElem = document.getElementById("inputRouteName_4");
        const dfoElem = document.getElementById("inputDFO");
        const routeName = routeNameElem.value || routeNameElem.defaultValue;
        const dfo = dfoElem.value || dfoElem.defaultValue;  
        url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
    }

    const results = await queryService(url);
    showResults(results);
    showResultsOnMap(results);
  
   //loading.classList.add("hide");
  }


  


  
  async function coordinateQuery(_lat, _lon) {
    const loading = document.getElementById("loading");
    loading.classList.remove("hide");
  
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
  
  