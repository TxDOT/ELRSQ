

// determine pagination and fill in HTML table results
//TODO move point on map
function showResults(results, navIndex) {
  allResults = results; // this is changing the value of a global variable
  resultCount = allResults.length; // use this somewhere
  const index = navIndex ? navIndex - 1 : 0;
  currentResult = allResults[index];

  //insert pagination
  insertPagination(currentPagination, resultCount);

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


//insert pagination
function insertPagination(currentPagination, resultCount) {
  console.log(currentPagination + " of " + resultCount);
  const btn_prev_inactive = `<li class="page-item disabled"><span class="page-link" tabindex="-1" aria-disabled="true">Previous</span></li>`;
  const btn_next_inactive = `<li class="page-item disabled"><span class="page-link" tabindex="-1" aria-disabled="true">Next</span></li>`;

  const btn_prev_active = `<li class="page-item"><span id="pagn_prev" class="page-link">Previous</span></li>`;
  const btn_next_active = `<li class="page-item"><span id="pagn_next" class="page-link">Next</span></li>`;

  const pgnStart = `<nav aria-label="..."><ul class="pagination justify-content-center">`
  const pgnEnd = `</ul></nav>`
  const pgnCurrentOpen = `<li class="page-item active" aria-current="page"><span class="page-link">`
  const pgnCurrentClose = `</span></li>`
  const pgnCurrentIndicator = `${currentPagination} of ${resultCount}`
  var pgnCurrent = `<li class="page-item active" aria-current="page"><span class="page-link">` + "No data" + `</span></li>`
  var navTitle = pgnStart + pgnCurrent + pgnEnd

  if (resultCount > 1) {
    if (currentPagination == 1) {
      pgnCurrent = btn_prev_inactive + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_active
    } else if (currentPagination + 0 == resultCount) {
      pgnCurrent = btn_prev_active + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_inactive
    } else {
      pgnCurrent = btn_prev_active + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_active
    }
  } else if (resultCount == 1) {
    pgnCurrent = pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose
  } else {
    pgnCurrent = pgnCurrentOpen + "No data" + pgnCurrentClose
  }

  navTitle = pgnStart + pgnCurrent + pgnEnd

  //insert pagination
  $("#result-pagination").html(navTitle);
  $("#pagn_prev").on('click', function () { navResults('prev'); }); //TODO move point on map
  $("#pagn_next").on('click', function () { navResults('next'); });

}


function clearResults() {

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


//clear pagination
function clearPagination() {
  $("#result-pagination").html('');
}


//navResults called by pagination buttons in showResults function
//TODO move point on map
function navResults(direction) {
  direction == 'next' ? currentPagination++ : currentPagination--;

  if (currentPagination > 0 && currentPagination <= resultCount) {
    showResults(allResults, currentPagination)
  }
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