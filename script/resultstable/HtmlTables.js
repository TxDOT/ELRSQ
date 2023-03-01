// TODO add functions for bulk and routes

function fillInHtmlTable(currentResult) {
  // fill in HTML results
  $(outputFieldIDs.ROUTEID).html(currentResult['ROUTEID']);
  $(outputFieldIDs.RTE_DEFN_LN_NM).html(currentResult['RTE_DEFN_LN_NM']);
  $(outputFieldIDs.RDBD_TYPE_DSCR).html(currentResult['RDBD_TYPE_DSCR']);
  $(outputFieldIDs.RTE_DFO).html(currentResult['RTE_DFO']);

  $(outputFieldIDs.CTRL_SECT_LN_NBR).html(currentResult['CTRL_SECT_LN_NBR']);
  $(outputFieldIDs.CTRL_SECT_MPT).html(currentResult['CTRL_SECT_MPT']);

  $(outputFieldIDs.RMRKR_PNT_NBR).html(currentResult['RMRKR_PNT_NBR']);
  $(outputFieldIDs.RMRKR_DISPLACEMENT).html(currentResult['RMRKR_DISPLACEMENT']);

  $(outputFieldIDs.LAT).html(currentResult['LAT']);
  $(outputFieldIDs.LON).html(currentResult['LON']);
}


function clearResults() {
  //TODO find way to use different selector child/class


  //clear pagination
  clearPagination();

  // fill in HTML results
  $(outputFieldIDs.ROUTEID).html('');
  $(outputFieldIDs.RTE_DEFN_LN_NM).html('');
  $(outputFieldIDs.RDBD_TYPE_DSCR).html('');
  $(outputFieldIDs.RTE_DFO).html('');

  $(outputFieldIDs.CTRL_SECT_LN_NBR).html('');
  $(outputFieldIDs.CTRL_SECT_MPT).html('');

  $(outputFieldIDs.RMRKR_PNT_NBR).html('');
  $(outputFieldIDs.RMRKR_DISPLACEMENT).html('');

  $(outputFieldIDs.LAT).html('');
  $(outputFieldIDs.LON).html('');

  $(outputFieldIDs.BDFO).html('');
  $(outputFieldIDs.EDFO).html('');
}






function copyCoordinates() {
  let lat = $(outputFieldIDs.LAT).html();
  let lon = $(outputFieldIDs.LON).html();
  navigator.clipboard.writeText(`${lat}, ${lon}`);
}

function copyFieldLocation() {
  let routeName = $(outputFieldIDs.RTE_DEFN_LN_NM).html();
  let refMarker = $(outputFieldIDs.RMRKR_PNT_NBR).html();
  let displacement = $(outputFieldIDs.RMRKR_DISPLACEMENT).html();
  navigator.clipboard.writeText(`RouteID: ${routeName}, ReferenceMarker: ${refMarker}, Displacement: ${displacement}`);
}

function copyControlSection() {
  let controlSecNum = $(outputFieldIDs.CTRL_SECT_LN_NBR).html();
  let milePointMeasure = $(outputFieldIDs.CTRL_SECT_MPT).html();
  navigator.clipboard.writeText(`ControlSectionNumber: ${controlSecNum}, MilePointMeasure: ${milePointMeasure}`);
}

function copyRouteDFO() {
  let routeName = $(outputFieldIDs.RTE_DEFN_LN_NM).html();
  let dfo = $(outputFieldIDs.RTE_DFO).html();
  navigator.clipboard.writeText(`RouteID: ${routeName}, DistanceFromOrigin: ${dfo}`);
}


// fill in HTML table results
function showRouteResults(routeQueryOutput) {

  // fill in HTML results
  $(outputFieldIDs.RTE_DEFN_LN_NM).html(routeQueryOutput[0]);
  $(outputFieldIDs.BDFO).html(routeQueryOutput[1]);
  $(outputFieldIDs.EDFO).html(routeQueryOutput[2]);
}


// <!--makeTableFromArray(dataArray)
// accepts multi-dimensional array and returns a string for an HTML table with a header record (Example: [["ID","NAME","AGE"],["1", "Michael",43], ["2", "Jessica",40]])-->


//HTML Table accepts a multi-dimensional array.  First set in the array should contain field names.  Example: [["ID","NAME","AGE"],["1", "Michael",43], ["2", "Jessica",40]]
//---------------------------------------
function makeTableFromArray(dataArray) {

  var result = "<table>";
  for (var i = 0; i < dataArray.length; i++) {
    result += "<tr>";
    for (var j = 0; j < dataArray[i].length; j++) {
      if (i == 0) {
        result += "<th>" + dataArray[i][j] + "</th>";
      }
      else {
        result += "<td>" + dataArray[i][j] + "</td>";
      }
    }
    result += "</tr>";
  }
  result += "</table > ";

  return result;
}
//---------------------------------------