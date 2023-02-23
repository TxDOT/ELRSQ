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
