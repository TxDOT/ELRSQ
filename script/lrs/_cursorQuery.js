// function which uses mouse click lat/lon to query lrs service for a single point
async function cursorQuery(lat, lon) {
  resetGraphics();
  resetCurrentPagination();

  let USEMAP = 1;

  if (USEMAP == 1) {
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
  readOutPointResults(results);
  tabularPointsConvertExport(results);

  if (USEMAP == 1) {
    showPointResultsOnMap(results); 
  }

  YellowToGreen();

}