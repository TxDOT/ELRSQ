/**
 *
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} coordinateArr
 * @param {*} lrm_indices
 * @returns a url for the LRS query
 */
function buildUrl(currentLrmNo, coordinateArr, lrm_indices) {
  let url = '';

  let index0 = (typeof lrm_indices !== 'undefined') ? lrm_indices[0] : 0;
  let index1 = (typeof lrm_indices !== 'undefined') ? lrm_indices[1] : 1;
  let index2 = (typeof lrm_indices !== 'undefined') ? lrm_indices[2] : 2;

  if (currentLrmNo == 1) {
    //console.log(measureRanges.latitude.min);
    lat = coordinateArr[index0] || -90;
    lon = coordinateArr[index1] || 0;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (currentLrmNo == 2) {
    routeName = coordinateArr[index0];
    refMarker = coordinateArr[index1] || 0;
    displacement = coordinateArr[index2] || 0;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (currentLrmNo == 3) {
    controlSecNum = coordinateArr[index0];
    milePointMeasure = coordinateArr[index1] || 0;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (currentLrmNo == 4) {
    routeName = coordinateArr[index0];
    dfo = coordinateArr[index1] || 0;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}
