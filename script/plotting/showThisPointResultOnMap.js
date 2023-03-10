function showThisPointResultOnMap(result) {
  //go through each result and add on map
  require(["esri/Graphic"], (Graphic) => {

    let point = {
      type: "point",
      latitude: parseFloat(result.LAT),
      longitude: parseFloat(result.LON)
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


    // clear previous graphics here
    resetGraphics();

    graphics.push(pointGraphic);
    view.graphics.add(pointGraphic);

    //zoom to this graphic
    view.goTo({
      target: graphics,
      zoom: 17
    });

  });

}
