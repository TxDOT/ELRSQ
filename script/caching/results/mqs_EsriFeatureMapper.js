// creates point graphic at lat/lon of each result

function showPointResultsOnMap(results) {
  //go through each result and add on map

  require(["esri/Graphic"], (Graphic) => {

    // clear previous graphics here
    resetGraphics();

    results.forEach(_result => {

      let point = {
        type: "point",
        latitude: parseFloat(_result.LAT),
        longitude: parseFloat(_result.LON)
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



      graphics.push(pointGraphic)
      view.graphics.add(pointGraphic);
    })

    //zoom to all graphics
    view.goTo({
      target: graphics,
      zoom: 17
    })

  });

}


function showFullPointResultsOnMap(results) {
  //go through each result and add on map

  require(["esri/Graphic"], (Graphic) => {

    // clear previous graphics here
    resetGraphics();

    results.forEach(_result => {

      let point = {
        type: "point",
        latitude: parseFloat(_result.LAT),
        longitude: parseFloat(_result.LON)
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



      graphics.push(pointGraphic)
      view.graphics.add(pointGraphic);
    })

    //zoom to all graphics
    view.goTo({
      target: graphics,
      zoom: 9
    })

  });

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


function clearResultsFromMap() {

  graphics = [];
  view.graphics.removeAll();

  view.goTo({
    center: [-99.90, 31.96], // Longitude, latitude of Texas
    zoom: 6, // Zoom level
  })
}


function returnToPoint() {

  if (onegraphic.length > 0) {
    //zoom to all graphics
    view.goTo({
      target: onegraphic,
      zoom: 17
    })
  }
}

function showAllPoints() {
  showFullPointResultsOnMap(GLOBALPROJECTDATA.ProjectGeometry);
}


