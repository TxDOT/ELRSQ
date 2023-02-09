function handleMapClick(evt) {
  console.log("you clicked");
  var foo = document.querySelectorAll("#mapcursor-justified.active");
  console.log(foo)
  if (foo[0]) {
    coordinateQuery(evt.mapPoint.latitude, evt.mapPoint.longitude);
  }

  }

