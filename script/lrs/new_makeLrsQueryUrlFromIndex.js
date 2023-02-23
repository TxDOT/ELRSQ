function new_makeLrsQueryUrlFromIndex(method, vector, lrm_indices, format_rte_nm) {
  let routeName = '';
  let url = '';

  if (format_rte_nm == 1) {
    routeName = fixThisVerySpecificTextFormat(vector[lrm_indices[0]]);
  } else {
    routeName = vector[lrm_indices[0]];
  }

  if (method == 1) {
    let lat = vector[lrm_indices[0]];
    let lon = vector[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (method == 2) {

    let refMarker = vector[lrm_indices[1]];
    let displacement = vector[lrm_indices[2]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (method == 3) {
    let controlSecNum = vector[lrm_indices[0]];
    let milePointMeasure = vector[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (method == 4) {

    let dfo = vector[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}
