function handleMapClick(evt) {
  var oncursortab = document.querySelectorAll("#mapcursor-justified.active");
  if (oncursortab[0]) {
    coordinateQuery(evt.mapPoint.latitude, evt.mapPoint.longitude);
  }
}