function handleMapClick(evt) {
  var oncursortab = document.querySelectorAll("#mapcursor-tabpane.active");
  if (oncursortab[0]) {
    coordinateQuery(evt.mapPoint.latitude, evt.mapPoint.longitude);
  }
}